import { Animated, View, useWindowDimensions,TouchableOpacity, ScrollView, Dimensions,FlatList, SectionList } from 'react-native'
import React, { useEffect , useState, useRef} from 'react'
import { Icon, Text, makeStyles, useTheme, useThemeMode } from '@rneui/themed'
import Timeline from './timelineItem'
import TimelineItem from './timelineItem'

export const cropDetailIconProps = {
    Area:{name:"terrain"},
    pH:{name:"thermometer",type:'material-community'},
    Optimal:{name:"shield-check",type:'material-community'},
    Sowing:{name:"seedling",type:"font-awesome-5"},
    Irrigation:{name:"sprinkler-variant",type:'material-community'},
    Harvest:{name:"agriculture",},
    Field:{name:"terrain"},
    Balcony:{name:'balcony',type:'material-community'},
    Pot:{name:'pot',type:'material-community'},
}
const npk = [
    {name:'Nitrogen',light:'#00A9A5',dark:'#008080',},
    {name:'Phosphorous',light:'#FFD700',dark:'#FFD100',},
    {name:'Potassium',light:'#8FCC5D',dark:'#556B2F',}
]
const getNpkRatio = (values) => {
    if (!values)
      return [0,0,0]
    const maxValue = Math.max(...values);
    return values.map(value => value / maxValue);
}

export function CropDetail({value,sub,style}) {
    const styles = useStyles()
    return(
        <View style={style}>
            <Icon style={styles.cropDetailIcon} {...cropDetailIconProps[cropDetailIconProps.hasOwnProperty(sub)? sub:value]}/>
            <Text bold style={{fontSize:20,alignItems:"center",justifyContent:"center"}} >{value || 'N/A'}</Text>
            <Text style={{color:'gray',fontSize:16}}>{sub}</Text>
        </View>
    )
}

export function NPK({data,style}) {
    // data = [7,8,9]
    const {mode} = useThemeMode()
    const styles = useStyles()
    const npkAnimation = new Animated.Value(0)
    const npkRatio = getNpkRatio(data)

    useEffect(()=>{      
        Animated.timing(npkAnimation, {
            toValue: 1,
            duration: 1000, 
            useNativeDriver: false, 
        }).start()
    },[])

    return (
    <View style={style}>
        {data ?
          <>
            <Text h4>NPK Readings : {data.join('-')}</Text>

            <View style={styles.npkExpandedView}>
                {npk.map((ele,i) =>{ 

                    return (
                    <View key={i} style={styles.npkExpandedViewElement}>
                        <Text style={{fontSize:16,flex:2}}>{ele.name}</Text>

                        <View style={[{flex:3},styles.npkExpandedViewElement]}>
                            <Animated.View style={[
                                styles.npkMeasureView,
                                {
                                    backgroundColor:ele[mode],
                                    width:npkAnimation.interpolate({ inputRange:[0,1], outputRange:[0,150*npkRatio[i]] }) 
                                }
                            ]}/>
                            <Text> {data[i] }%</Text>
                        </View>
                    </View>
                )})}   
            </View>
          </>
        : <Text 
            style={{margin:10, fontWeight:"bold",fontSize:20, color:'gray'}}
          >PH Readings are not available at the moment !</Text>}
          
    </View>
  )
}

export function Scheduler({cropData}) {
  const scheduleRef = useRef()
  const {theme} = useTheme()
  const TIMELINEITEM_HEIGHT=80

  const sectionData = [
    {title:'History',data:cropData.schedule.filter(({time})=> new Date() > new Date(time.toUpperCase())),key:0},
    {title:'Schedule',data:cropData.schedule.filter(({time})=> new Date() <= new Date(time.toUpperCase())),key:1},
  ]
  
  useEffect(()=>{
    const timer = setTimeout(() => {
      scheduleRef.current?.scrollToLocation({ sectionIndex: 1, itemIndex: 0, viewPosition: 0 });
    }, 1000);
  
    return () => clearTimeout(timer);
  },[])

  function onSectionScrollFailed(info) {
    console.log('scroll fail',info.index);
  }

  return(
    <View style={{}}>
          <SectionList 
            ref={scheduleRef}
            sections={sectionData}
            renderItem={({item,index,section}) => 
              <TimelineItem event={item} index={index} length={section.data.length}/>
            }
            renderSectionHeader={({section: {title,data}}) => 
              data.length > 0  && <Text style={{backgroundColor:theme.colors.cardUI,paddingBottom:5,paddingLeft:10}} h3>{title}</Text>
            }
            SectionSeparatorComponent={()=>
              <View style={{marginBottom:10,backgroundColor:"red",width:50}}/>
            }
            keyExtractor={(item, index) => item + index}
            nestedScrollEnabled
            stickySectionHeadersEnabled
            showsVerticalScrollIndicator={false}
            onScrollToIndexFailed={onSectionScrollFailed}
            getItemLayout={(data, index) => ({ length: TIMELINEITEM_HEIGHT, offset: TIMELINEITEM_HEIGHT * index, index})}
          />
    </View>
  )
}


const useStyles = makeStyles(theme => ({  
    cropDetailIcon:{
        alignSelf:"flex-start",
        marginVertical:7
    },
    npkExpandedView:{
      marginVertical:10,
      rowGap:10,
    },
    npkExpandedViewElement:{
      flexDirection:"row",
      alignItems:"center",
    },
    npkMeasureView:{
      height:9,
      borderRadius:20,
      borderColor:theme.mode==='dark'?'gray':'black',
      borderWidth:1,
      elevation:4,
      opacity:0.8,
    },
}))
  
  
  