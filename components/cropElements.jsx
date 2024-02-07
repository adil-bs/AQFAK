import { Animated, View, useWindowDimensions,TouchableOpacity, ScrollView, Dimensions,FlatList } from 'react-native'
import React, { useEffect , useState, useRef} from 'react'
import { Icon, Text, makeStyles, useThemeMode } from '@rneui/themed'
import Timeline from './timelineItem'
import TimelineItem from './timelineItem'

const cropDetailIconProps = {
    Area:{name:"terrain"},
    pH:{name:"thermometer",type:'material-community'},
    Optimal:{name:"shield-check",type:'material-community'},
    Sowing:{name:"seedling",type:"font-awesome-5"},
    Balcony:{name:'balcony',type:'material-community'},
    Pot:{name:'pot',type:'material-community'},
}
const npk = [
    {name:'Nitrogen',light:'#00A9A5',dark:'#008080',},
    {name:'Phosphorous',light:'#FFD700',dark:'#FFD100',},
    {name:'Potassium',light:'#8FCC5D',dark:'#556B2F',}
]
const getNpkRatio = (values) => {
    const maxValue = Math.max(...values);
    return values.map(value => value / maxValue);
}

export function CropDetail({value,sub,style}) {
    const styles = useStyles()
    return(
        <View style={style}>
            <Icon style={styles.cropDetailIcon} {...cropDetailIconProps[cropDetailIconProps.hasOwnProperty(sub)? sub:value]}/>
            <Text bold style={{fontSize:20}}>{value}</Text>
            <Text style={{color:'gray',fontSize:16}}>{sub}</Text>
        </View>
    )
}

export function NPK({data,style}) {
    const {mode} = useThemeMode()
    const styles = useStyles()
    const npkAnimation = new Animated.Value(0)
    const npkRatio = getNpkRatio(data)

    useEffect(()=>{      
        Animated.timing(npkAnimation, {
            toValue: 1,
            duration: 2000, 
            useNativeDriver: false, 
        }).start()
    },[])

  return (
    <View style={style}>
        <Text h4>NPK Required : {data.join('-')}</Text>

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
          
    </View>
  )
}

// export function Scheduler({cropData,widthOffset=0}) {
//     const [index, setIndex] = useState(0);
//     const scrollViewRef = useRef(null);
//     const scrollX = useRef(new Animated.Value(0)).current;
//     const { width: screenWidth } = Dimensions.get('window');
  
//     useEffect(()=>{
//         const nearestIndex = (scrollValue) => Math.round(scrollValue / (screenWidth-widthOffset)) 
//         const listener = scrollX.addListener(a => {
//             // console.log(nearestIndex(a.value),'nearest', index, ' index',index !== nearestIndex(a.value));
    
//             if (index !== nearestIndex(a.value)) {
//                 setIndex(nearestIndex(a.value))
//             }
//         })
//         return () => {
//             scrollX.removeListener(listener);
//         };
//     },[scrollX, index])
//     // console.log(index,' index');

//     const handleTabPress = (tabIndex) => {
//         scrollViewRef.current.scrollTo({ x: tabIndex * scrollViewWidth });
//     };
//     const scrollViewWidth = screenWidth-widthOffset; 
//     const tabIndicatorWidth = scrollViewWidth / 2; 
//     const indicatorPosition = scrollX.interpolate({
//       inputRange: [0, scrollViewWidth],
//       outputRange: [0, tabIndicatorWidth],
//       extrapolate: 'clamp'
//     });

//     const indicatorBgColor= i => {
//         const startInterpolate = (index>i) ? i+1 : i
//         const outputRange = (index>i) ? ['#ADD8E640', '#ADD8E600'] : ['#ADD8E600', '#ADD8E640']
//         return scrollX.interpolate({
//             inputRange: [(startInterpolate-1)*scrollViewWidth, startInterpolate*scrollViewWidth],
//             outputRange,
//             extrapolate:"clamp"
//         })
//     }
  
//     return (
//       <View style={{ flex: 1 }}>
//         {/* Tab Component */}
//         <View style={{ flexDirection: 'row',justifyContent:"center",flex:1, alignItems: 'center', height: 50,marginBottom:20 }}>
//           <TabItem wrapperStyle={{borderTopLeftRadius:10}} title="Schedule" onPress={() => handleTabPress(0)} isActive={index === 0} 
//             indicatorBgColor={indicatorBgColor(0)}
//            />
//           <TabItem wrapperStyle={{borderTopRightRadius:10}} title="History" onPress={() => handleTabPress(1)} isActive={index === 1} 
//             indicatorBgColor={indicatorBgColor(1)}
//           />
//           <Animated.View
//             style={{
//               position: 'absolute',
//               height: 3,
//               width: tabIndicatorWidth,
//               backgroundColor: 'blue',
//               bottom: 0,
//               left: indicatorPosition
//             }}
//           />
//         </View>
  
//         {/* Content */}
//         <ScrollView
//           ref={scrollViewRef}
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//             { useNativeDriver: false }
//           )}
//           scrollEventThrottle={16}
//         >
//           <View style={{ width: scrollViewWidth }}>
//             <Timeline data={cropData.schedule} />
//           </View>
//           <View style={{ width: scrollViewWidth }}>
//             <Timeline data={cropData.history} />
//           </View>
//         </ScrollView>
//       </View>
//     );
//   };
  
//   const TabItem = ({ title, onPress, isActive,wrapperStyle ,indicatorBgColor }) => {
//     const {mode} = useThemeMode()
//     const textHighlight = mode === 'dark' ? '#ADD8E6' :"blue"
//     return (
//       <TouchableOpacity onPress={onPress} style={{flex:1}}>
//         <Animated.View style={[{ backgroundColor: indicatorBgColor, padding: 10 },wrapperStyle]}>
//           <Text style={[{ fontSize: 16, fontWeight: 'bold',textAlign:"center" }, isActive ? {color: textHighlight} : {}]}>{title}</Text>
//         </Animated.View>
//       </TouchableOpacity>
//     );
//   };

export function Scheduler({cropData}) {
  const scheduleRef = useRef()
  const [schedule, setSchedule] = useState(true);
  const [currentSchedule, setCurrentSchedule] = useState()
  const opacity = useState(new Animated.Value(1))[0]
  
  useEffect(()=>{
    setCurrentSchedule(() => {
      const currentSchedule = cropData?.schedule.findIndex(event => new Date() <= new Date(event.time))
      console.log(currentSchedule);
      scheduleRef.current?.scrollToIndex({currentSchedule})
      return currentSchedule
    })

  },[])

  function changeSchedule( ) {
    Animated.sequence([
      Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
    setSchedule(!schedule)
  }
  return(
    <View>
      <Animated.View style={{opacity}}>
            <Text h3 h3Style={{marginLeft:25,marginBottom:15}}>{schedule ? 'Schedule' : 'History'}</Text>
          </Animated.View>
  
          <FlatList
            ref={scheduleRef}
            data={cropData.schedule}
            renderItem={({item,index}) => <TimelineItem key={index} event={item} index={index} data={cropData.schedule}/>}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
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
  
  
  