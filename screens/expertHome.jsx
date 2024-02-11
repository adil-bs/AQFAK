import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Divider, Icon,Text } from '@rneui/themed'
import { TouchableOpacity } from 'react-native'

export default function ExpertHome({navigation}) {
    const [schedules,setSchedules] = useState()

    useEffect(()=>{
        setSchedules([])
    },[])
  return (
    schedules &&
    <View style={{flex:1}}>
        <View></View>

        <View style={schedules.length!==0 ? styles.more : styles.centralize}>
            {schedules.length!==0 && <Divider width={2} />}

            <View >        
                <Text style={styles.moreText} h4>
                    {schedules.length!==0 ? 'Add more Schedules' : 'Your Entries Appear Here ' }
                </Text>
                <Icon
                    Component={TouchableOpacity} 
                    name="add-circle" 
                    size={70} 
                    type={"ionicon"} 
                    color={'gray'}
                    onPress={()=>{navigation.navigate('Add')}}
                />
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    more:{
        marginVertical:30,
        padding:30,
    },
    centralize:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    moreText:{
        textAlign:"center",
        marginBottom:20,
        marginTop:30,
        color:"gray",
    },
})