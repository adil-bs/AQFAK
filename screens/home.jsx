import React from 'react';
import {  View, ScrollView, Dimensions} from "react-native";
import { CropList} from '../components/cropList';
import { Divider, Icon, Text, makeStyles } from '@rneui/themed';
import HomeUI from '../components/homeUI';


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

  const data = [
    {id:1,name:"Rice",area:"148 ac",stage:"sowing",condition:"critical",img:"https://th.bing.com/th/id/OIP.bSBXls_YudJwhQ9Mp8wmKwHaFa?w=650&h=475&rs=1&pid=ImgDetMain"},
    {id:2,name:"Tomato",area:"148 ac",stage:"sowing",condition:"critical"},
    {id:3,name:"Wheat",area:"148 ac",stage:"sowing",condition:"critical"},
    {id:4,name:"Barley",area:"148 ac",stage:"sowing",condition:"critical"},
  ]
  return(
    <HomeUI heading={'Crops'} sub={'Pick the crop for more details'} >

      <View>
        {data.map((ele,i) => <CropList key={i} navigation={navigation} {...ele}/>)}
      </View>

      <View style={styles.more}>
        <Divider width={2}/>
        <View style={styles.centralize} >
          <Text style={{textAlign:"center",marginTop:30,color:"gray"}} h4>Add more crops</Text>
          <Icon name="add-circle" size={70} type={"ionicon"} color={'gray'}/>
        </View>
      </View>

    </HomeUI>
  )
}
