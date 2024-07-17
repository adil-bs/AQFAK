import React, { useContext, useEffect, useState } from 'react';
import {  View, ScrollView, Dimensions} from "react-native";
import { CropList} from '../components/cropList';
import { Divider, Icon, Text, makeStyles } from '@rneui/themed';
import HomeUI from '../components/homeUI';
import { BACKEND } from '../core/var'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LoadingPage } from '../components/sadPaths';
import { AuthContext } from '../core/navigators';
import { fetchApiCall } from '../core/api';


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
  const {loggedState :{token}} = useContext(AuthContext)
  const styles = useStyles()
  const [data, setData] = useState()

  useEffect(()=>{
    // fetch(BACKEND+'auth/getuser_crops/',{
    //   method:"GET" ,headers: {'Content-Type': 'application/json',"Authorization" : token},
    // })
    //   .then(async (res) => {
    //     if (res.ok){
    //       return res.json()
    //     }else {
    //       console.log((await res.json()).detail);
    //       throw new Error('Error happened while getting crops')
    //     }
    //   })
      // .then(data => {
      //   setData(data)
      // })
      // .catch(err => console.error('err : ',err))    
    fetchApiCall('auth/getuser_crops/',{
      headers: {"Authorization" : token},
    })
      .then(data => {setData(data)})
      .catch(err => console.error('err : ',err))    
  },[])

  return(
    data?
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

    :
    <LoadingPage/>
  )
}
