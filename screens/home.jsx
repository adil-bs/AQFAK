import React, { useEffect, useState } from 'react';
import {  View, ScrollView, Dimensions} from "react-native";
import { CropList} from '../components/cropList';
import { Divider, Icon, Text, makeStyles } from '@rneui/themed';
import HomeUI from '../components/homeUI';
import { BACKEND } from '../core/var'
import { TouchableOpacity } from 'react-native-gesture-handler';


const useStyles = makeStyles(theme => ({
  more:{
    marginVertical:30,
    padding:30,
  },
  centralize:{
    justifyContent:"center",
    alignItems:"center",
  },
}))

export default function Home({navigation}) {
  const styles = useStyles()
  const [data, setData] = useState()

  useEffect(()=>{
    fetch(BACKEND+'auth/getuser_crops/',{
      method:"GET" ,headers: {'Content-Type': 'application/json',},
    })
      .then(res => res.json())
      .then(data => {
        console.log('data',data);
        setData(data)
      })
      .catch(err => console.error('err : ',err))    
  },[])

  return(
    data&&
    <HomeUI heading={'Crops'} sub={'Pick the crop for more details'} >

      <View>
        {data.map((ele,i) => <CropList key={i} navigation={navigation} {...ele}/>)}
      </View>

      <View style={styles.more}>
        <Divider width={2}/>
        <View style={styles.centralize} >
          
          <Text style={{textAlign:"center",marginTop:30,color:"gray"}} h4>
            Add more crops
          </Text>
          <Icon 
            Component={TouchableOpacity} 
            name="add-circle" 
            size={70} 
            type={"ionicon"} 
            color={'gray'}
          />
        </View>
      </View>

    </HomeUI>
  )
}
