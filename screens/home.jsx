import React, { useContext, useEffect, useState } from 'react';
import {  View, ScrollView, Dimensions, FlatList, RefreshControl} from "react-native";
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

export default function Home({navigation,route}) {
  const {shouldRefresh} = route.params || 'no refresh'
  const {loggedState :{token}} = useContext(AuthContext)
  const styles = useStyles()
  const [data, setData] = useState()
  const [refresh, setRefresh] = useState(false)
  console.log(shouldRefresh);

  const getCrops = () => {
    return fetchApiCall('auth/list_create_crop/',{
      headers: {"Authorization" : token},
    })
      .then(data => {setData(data)})
      .catch(err => console.error('err : ',err)) 
  }
  const getRefreshedCrops = () => {
    setRefresh(true)
    getCrops()
      .finally(()=>setRefresh(false))
  }
  useEffect(()=>{  
    getCrops()  
  },[shouldRefresh])

  return(
    data?
    <HomeUI heading={'Crops'} sub={'Pick the crop for more details'} refreshControl={
      <RefreshControl refreshing={refresh}  onRefresh={()=> getRefreshedCrops()} />
    }>

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
            onPress={() => navigation.navigate('cropEdits',{role:'edit'})}
          />
        </View>
      </View>

    </HomeUI>

    :
    <LoadingPage/>
  )
}
