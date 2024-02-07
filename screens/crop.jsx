import { View, StyleSheet, ScrollView ,TouchableOpacity, Animated, Dimensions, FlatList} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import HomeUI from '../components/homeUI'
import { Card, Text, Icon, useTheme, ButtonGroup, Tab, TabView, makeStyles, useThemeMode } from '@rneui/themed'
import { camelToCapital } from '../utility'
import {CropDetail, NPK, Scheduler} from '../components/cropElements'
import TimelineItem from '../components/timelineItem'

export default function Crop({route}) {
  const {name,area,stage,img} = route.params
  const styles = useStyles()
  const {height : windowHeight} = Dimensions.get("window")
  const [cropData, setCropData] = useState()
  // const [index, setIndex] = useState(0);

  useEffect(()=>{
    setCropData({
      ...{name,area,stage},
      grown:'pot',
      npk:[20,10,5],
      ph:'6.5',
      phStatus:'optimal',
      schedule:[
        { title: 'Watering', description: 'Additional Description', time: '2024-02-06T12:30:45.678Z' },
        { title: 'Watering', description: 'Additional Description', time: '2024-02-06T12:30:45.678Z' },
        { title: 'Fertilizer', description: 'Additional Description', time: '2024-02-06T12:30:45.678Z' },
        { title: 'Watering', description: 'Additional Description', time: '2024-02-06T12:30:45.678Z' },
        { title: 'Watering', description: 'Additional Description', time: '2024-02-08T12:30:45.678Z' },
        { title: 'Watering', description: 'Additional Description', time: '2024-02-08T12:30:45.678Z' },
        { title: 'Fertilizer', description: 'Additional Description', time: '2024-08-02T12:30:45.678Z' },
        { title: 'Watering', description: 'Additional Description', time: '2024-08-02T12:30:45.678Z' },
        { title: 'Watering', description: 'Additional Description', time: '2024-08-02T12:30:45.678Z' },
        { title: 'Watering', description: 'Additional Description', time: '2024-02-06T12:30:45.678Z' },
        // Add more events as needed
      ],
    })
    
  },[])


  return (
    cropData &&
    <HomeUI heading={name} img={img} >

      <Card containerStyle={styles.card1}>
        <View style={styles.cropDetailContainer}>      
        {['area','stage','grown'].map(ele => <CropDetail  key={ele} value={camelToCapital(cropData[ele])} sub={camelToCapital(ele)} /> )}
        </View>
        <View style={[styles.cropDetailContainer,{marginTop:25}]}>
          <CropDetail value={cropData.ph} sub={'pH'} />
          <CropDetail value={camelToCapital(cropData.phStatus)} sub={'pH Status'} />
        </View>

        <NPK style={{marginTop:35}} data={cropData.npk}/>
      </Card>


      <Card containerStyle={[styles.timelineCardContainer,{height: windowHeight-130}]}>

        {/* <Tab value={index} onChange={(e) => setIndex(e)} indicatorStyle={{height: 3}}>
          <Tab.Item title={'Schedule'} />
          <Tab.Item title={'History'}  />
        </Tab>
    
        <TabView 
          value={index} 
          onChange={setIndex} 
          containerStyle={{marginTop:15,minHeight:450}}
        >
        <TabView.Item style={{ width: '100%',marginLeft:15,minHeight:"100%"}}>
            <Timeline data={cropData.schedule}/> 
          </TabView.Item>
          <TabView.Item style={{ width: '100%',height:"100%",marginLeft:15}}>
            <Timeline data={cropData.history}/>
          </TabView.Item>
        </TabView> */}
        
        {/* <Scheduler cropData={cropData} widthOffset={30*2}/> */}
        <Scheduler cropData={cropData}/>
        
      </Card>

    </HomeUI>
  )
}

const useStyles = makeStyles(theme => ({
  card1:{
    borderRadius:12,
  },
  cropDetailContainer:{ 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent:"space-around",
  },
  timelineCardContainer:{
    borderRadius:12,
    marginBottom:15,
    paddingBottom:115, //no idea why
    overflow:"hidden",
  },
}))


