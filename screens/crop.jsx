import { View, StyleSheet, ScrollView ,TouchableOpacity, Animated, Dimensions, FlatList} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import HomeUI from '../components/homeUI'
import { Card, Text, Icon, useTheme, ButtonGroup, Tab, TabView, makeStyles, useThemeMode } from '@rneui/themed'
import { camelToCapital } from '../core/utility'
import {CropDetail, NPK, Scheduler} from '../components/cropElements'
import TimelineItem from '../components/timelineItem'
import { BACKEND } from '../core/var'

export default function Crop({route}) {
  const {name,area,stage,img} = route.params
  const styles = useStyles()
  const {height : windowHeight} = Dimensions.get("window")
  const [cropData, setCropData] = useState()
  // const [index, setIndex] = useState(0);

  useEffect(()=>{
    fetch(BACKEND+'auth/getcrop_schedule/?crop='+name,{
      method:"GET" ,headers: {'Content-Type': 'application/json',},
    })
      .then(res => res.json())
      .then(data => setCropData(data))
      .catch(err => console.error('err : ',err))    

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


      {cropData.schedule.length !== 0 &&
      <Card containerStyle={[styles.timelineCardContainer,{maxHeight: windowHeight-130,}]}>
        <Scheduler cropData={cropData}/>
        
      </Card>}

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
    // paddingBottom:115, //no idea why
    paddingTop:30,
    overflow:"hidden",
  },
}))


