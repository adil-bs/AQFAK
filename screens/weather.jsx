import React, { useEffect, useReducer, useState } from 'react';
import { View, Image, FlatList, TouchableOpacity, LayoutAnimation, ScrollView } from 'react-native';
import { Text,makeStyles, useThemeMode, Icon, Divider, ListItem, registerCustomIconType, Card } from '@rneui/themed';
import { camelToCapital, weatherCode, weatherUnits } from '../core/utility';
import { LineChart } from 'react-native-gifted-charts';
import { BACKEND } from '../core/var';

const reduceCurrentWeather = (state, action) =>{

    const getHourlyData = (stat,data) =>  {
        return data.map(ele => ({
            value : ele.values[stat],
            label : new Date(ele.time).toLocaleTimeString('en-US',{hour:'numeric',hour12:true,timeZone:'UTC'}),
        }))
    }

    switch (action.type) {
      case 'change_day':
        const currentWeatherDay = action.day.split('T')[0]
        const completeHourlyData = action.data.timelines.hourly.filter(ele => ele.time.startsWith(currentWeatherDay))
        return {
          day     : currentWeatherDay,
          stat    : 'temperature',
          summary : action.data.timelines.daily.find(ele => ele.time.startsWith(currentWeatherDay)).values,
          hourly  : completeHourlyData,
          hourlyGraphData  : getHourlyData('temperature',completeHourlyData)
        }
      case 'change_stat':
        return {
          ...state,
          stat : action.stat,
          hourlyGraphData : getHourlyData(action.stat,state.hourly)
        }

    }
}

export default function Weather ()  {
    const styles = useStyles()
    const [weatherData,setWeatherData] = useState()
    const [currentWeather, dispatchCurrentWeather] = useReducer(reduceCurrentWeather,{})
    const [expanded, setExpanded] = useState(false)
    const {mode} = useThemeMode()

    useEffect(()=> {
        fetch(BACKEND+'third/weather/',{
            method:"GET" ,headers: {'Content-Type': 'application/json',},
        })
            .then(res => res.json())
            .then(data => {
                setWeatherData(data)
                dispatchCurrentWeather({
                    type:"change_day",
                    day:new Date().toISOString().split('T')[0],
                    data:data,
                })        
            })
            .catch(err => console.error('err : ',err))   
    },[])

    const handleCurrentWeather = (day) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        dispatchCurrentWeather({type:"change_day",day:day,data:weatherData})
    }

    const chartTheme = {
        light : {
            color:"#B6FCA6",
            xAxisColor : "black",
            xAxisText : "black",
            rulesColor : "#e6e6e6",
        },
        dark : {
            color:"#124A05",
            xAxisColor : "#a6a6a6",
            xAxisText : "white",
            rulesColor : "#003300"
        }
    }

  return (
  weatherData && currentWeather.summary &&
  <ScrollView showsVerticalScrollIndicator={false}>
  <Card containerStyle={{borderRadius:10,marginBottom:12}}>

    <FlatList
        data={weatherData.timelines.daily}
        renderItem={({item}) => (
            <WeatherDays 
              data={item} 
              current = {item.time.startsWith(currentWeather.day)}
              onPress={()=>handleCurrentWeather(item.time)}
            /> 
        )}
        keyExtractor={item => item.time}
        ItemSeparatorComponent={<View style={{padding:5}} />}
        showsHorizontalScrollIndicator={false}
        horizontal
    />
    <Divider style={{height:1,backgroundColor:"gray",marginVertical:15}}/>

    <View style={styles.centralize}> 
        <Text h3 >
            {new Date(currentWeather.day).toLocaleDateString(undefined, {year:'numeric',month:'short',day:'numeric'})}
        </Text>
        <Text adjustsFontSizeToFit style={[styles.fontMdBold,{textAlign:"center"}]}>
            {weatherData.location.name}
        </Text>

        <View style={[{flexDirection:"row",marginVertical:30}]}>
            <Image source={weatherCode[currentWeather.summary.weatherCodeMax]?.img} style={{height:110,width:110}}/>
            <View style={[{marginLeft:15}]}>
                <Text h3 adjustsFontSizeToFit numberOfLines={1}>{weatherCode[currentWeather.summary.weatherCodeMax]?.name} </Text>
                <Text h4>{currentWeather.summary.temperatureAvg}°C</Text>
                <Text style={[styles.fontMdBold,{color:"gray"}]}>feels like {currentWeather.summary.temperatureApparentAvg}°C</Text>   
            </View>
        </View>    
    </View>      

    <View>
    <FlatList
        data={['temperature','precipitationProbability','windSpeed','humidity','uvIndex','visibility']}
        renderItem={({item}) => 
          <WeatherSpecs 
            spec={item} 
            data={currentWeather.summary}
            onPress ={() => dispatchCurrentWeather({type:"change_stat",stat:item})}
            current = {item === currentWeather.stat}
          />
        }
        keyExtractor={item => item}
        numColumns={3}
    />

    <ListItem.Accordion
        content={
          <ListItem.Content>
            <Text style={styles.fontMdBold}>{camelToCapital(currentWeather.stat)}</Text>
          </ListItem.Content>
        }
        isExpanded={expanded}
        onPress={() =>setExpanded(!expanded)}
        style={{marginTop:35,marginBottom:20,}}
    >
        <ScrollView style={{height:150}} nestedScrollEnabled showsVerticalScrollIndicator={false}>
        {Object.keys(weatherUnits).map(item => {
            function handleOnPress () {
                dispatchCurrentWeather({type:'change_stat',stat:item})
                setExpanded(!expanded)
            }
            return (
            <ListItem key={item} onPress={handleOnPress} Component={TouchableOpacity}>
                <ListItem.Subtitle>{camelToCapital(item)}</ListItem.Subtitle>
            </ListItem>    
        )})}
        </ScrollView>
    </ListItem.Accordion>

    <View style={{overflow:"hidden"}}>
        <LineChart
            areaChart
            data={currentWeather.hourlyGraphData}
            color={chartTheme[mode].color}
            dataPointsColor={chartTheme[mode].color}
            dataPointsRadius={3}
            noOfSections={5}
            yAxisThickness={0}
            yAxisTextStyle={{color: 'gray'}}
            yAxisLabelSuffix={weatherUnits[currentWeather.stat].unit}
            xAxisColor={chartTheme[mode].xAxisColor}
            xAxisLabelTextStyle={{color:chartTheme[mode].xAxisText}}
            rulesType="solid"
            rulesColor={chartTheme[mode].rulesColor}
            startFillColor='#00cc44'
            startOpacity={0.4}
            endOpacity={0.1}
            isAnimated
            animationDuration={2000}
            scrollAnimation
            pointerConfig={{
                radius: 5,
                pointerColor: 'gray',
                stripOverPointer:true,
                pointerStripHeight:160,
                pointerStripColor: 'gray',
                strokeDashArray:[2,2],
                pointerStripWidth: 2,
                pointerLabelWidth:100,
                shiftPointerLabelX:-40,
                activatePointersOnLongPress:true,
                activatePointersDelay:-500,
                pointerVanishDelay:3000,
                pointerLabelComponent: items => (
                    <View style={styles.centralize}>
                    <Text style={{fontSize:12,fontWeight:"bold"}}>{items[0].label}</Text>  
                    <View style={styles.pointerContainer}>
                        <Text style={styles.pointerText}>{items[0].value} {weatherUnits[currentWeather.stat].unit}</Text>
                    </View>
                    </View>
                ),
            }}
        />
    </View>

    </View>

    <FlatList 
        data={['sunrise','sunset','moonrise','moonset']}
        renderItem={({item}) =>
            <View style={{flex:1,marginRight:3,paddingVertical:10}}>
                <Text  style={{textAlign:"center"}}>{item}</Text>
                <Icon name={item.includes('moon')?'moon':item} size={25} type={"feather"} containerStyle={{marginVertical:10}} />
                <Text  style={{textAlign:"center"}}>{new Date(currentWeather.summary[item+'Time']).toLocaleTimeString('en-US',{hour:"numeric",minute:"numeric",hour12:true,timeZone:'UTC'})}</Text>
            </View>
        }
        numColumns={4}
        style={{marginVertical:20,}}
    />

    {/* <Image source={require('../assets/sponsers/TomorrowBlack.png')} style={styles.sponser}/> */}
  </Card>
  </ScrollView>
  )
}

export function WeatherSpecs({spec,data,onPress,current}) {
    const styles = useStyles()
    const specText = camelToCapital(spec)
    return(
        <TouchableOpacity style={{flex:1}} onPress={onPress}>
        <View style={[styles.weatherSpec,current && styles.pressedWeatherSpec]}>
            <Text h4 style={{color:"#009900"}}>{data[spec + 'Avg']}{weatherUnits[spec].unit}</Text>
            <Text style={{textAlign:"center"}}>{specText}</Text>
        </View>    
        </TouchableOpacity>
    )
}

export function WeatherDays ({data,current,...props}) {
    const styles = useStyles()
    const day = new Date(data.time).toLocaleDateString('en-US', { weekday: 'short',day:'numeric' })
    return(
        <TouchableOpacity 
          activeOpacity={0.7}
          style={[styles.weatherDaysContainer,current && styles.pressedWeatherDays]} 
          {...props}
        >
        <View style={{alignItems:"center"}}>
            <Image source={weatherCode[data.values.weatherCodeMax].img} style={{height:30,width:30}}/>
            <Text style={styles.fontMdBold}>{day}</Text>
        </View>
        </TouchableOpacity>
    )
}


const useStyles= makeStyles((theme) => ({
    weatherSpec:{
        flex:1,
        paddingVertical:10,
        borderColor:theme.mode==='light'?"#ccffcc":"#004d00",
        borderWidth:1,
        margin:2,
        alignItems:"center",
    },
    pressedWeatherSpec :{
        backgroundColor: theme.mode === 'light'? "#ccffcc" :"#004d00"
    },
    centralize:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    pointerContainer:{
        backgroundColor:theme.mode === 'light' ? "#033E0D" :"#E6F8E9",
        borderRadius:20,
        paddingHorizontal:15,
        paddingVertical:8
    },
    pointerText:{
        fontWeight:"bold",
        color:theme.mode === 'light' ? "white" :"black",
        fontSize:13,
    },
    pressedWeatherDays :{
        borderBottomWidth:6,
        paddingBottom:4,
        backgroundColor:theme.mode==='light' ? "#ebf5ee" : "#003300"
    },
    weatherDaysContainer:{
        padding:10,
        borderColor:'gray',
        borderWidth:1,
        borderRadius:20,
    },
    fontMdBold:{
        fontSize:16,
        fontWeight:"bold",
    },
    sponser:{
        height:23,
        width:210,
        marginTop:20,
        marginBottom:-10,
    }
}))