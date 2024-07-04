import React, { useState,useEffect } from 'react'
import {  TouchableOpacity, View } from 'react-native'
import {Text, Icon, ListItem, Card, Button, Tooltip, makeStyles, Image} from '@rneui/themed';
import { cropDetailIconProps } from './cropElements';

export function CropList (props)  {
    const {name,area,stage,img,ph,phStatus,condition,navigation} = props
    const styles = useStyles()
    const phaseIndicator = {preparation:"yellow",sowing:"#FFB300",irrigaton:"#F57C00",harvest:"red"}
    
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Crop',{name,area,stage,img})}>
    <Card 
        containerStyle={{borderRadius:12}} 
        wrapperStyle={{justifyContent:"space-between",flexDirection:"row"}}
    >
        <View style={{flex:1}}>
            <Text 
                style={{marginBottom:10}} 
                numberOfLines={2} 
                adjustsFontSizeToFit 
                h3
            >{name}</Text>
            <Text >{area}</Text>
            <View style={styles.inline}>
                <Icon {...cropDetailIconProps[stage]} size={15} color={phaseIndicator[stage.toLowerCase()]}  />
                <Text style={styles.gray}> {stage}</Text>        
            </View>    
        </View>

        <View style={styles.circle}>
            <View style={styles.innerCircle}>
                <Text style={[styles.phColor,{fontSize:25,}]} bold>{ph} </Text>
                <Text style={styles.phColor}>pH</Text>
            </View>
        </View>
         
    </Card>
    </TouchableOpacity>
  )
}

const useStyles = makeStyles((theme,props) => ({
    gray:{
        color:"gray",
    },
    inline:{
        alignItems:"center",
        flexDirection:"row",
        marginTop:4,
    },
    circle:{
        borderRadius:100,
        backgroundColor:"#2E7D32"+(theme.mode==='light'?'9A':''),
        height:90,
        width:90,
        padding:6,
    },
    innerCircle:{
        borderRadius:100,
        backgroundColor:theme.colors.cardUI,
        height:78,
        width:78,
        justifyContent:"center",
        alignItems:"center",
        rowGap:2,
    },
    phText:{
        fontSize:25,
    },
    phColor:{
        color:"green",
    },
}))