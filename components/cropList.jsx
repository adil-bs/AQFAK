import React, { useState,useEffect } from 'react'
import {  TouchableOpacity, View } from 'react-native'
import {Text, Icon, ListItem, Card, Button, Tooltip, makeStyles, Image} from '@rneui/themed';
import useImagePermission from './imagePermission';

export function CropList (props)  {
    const {name,area,stage,img,condition,navigation} = props
    const styles = useStyles()
    const {selectedImage, pickImage} = useImagePermission()
    const phaseIndicator = {preparation:"yellow",sowing:"#FFB300",irrigaton:"#F57C00",harvest:"red"}
    
  return (
    <Card 
        containerStyle={{borderRadius:12}} 
        wrapperStyle={{justifyContent:"space-between",flexDirection:"row"}}
        onStartShouldSetResponder = {()=>true}
        onResponderRelease={() => navigation.navigate('Crop',{name,area,stage,img})}
    >
        <View style={{flex:1}}>
            {/* <Text style={{marginBottom:10}} h3>{name}</Text> */}
            <Text 
                style={{marginBottom:10}} 
                numberOfLines={2} 
                adjustsFontSizeToFit 
                h3
            >{name}</Text>
            <Text >{area}</Text>
            <View style={styles.inline}>
                <Icon name="ellipse" size={12} type={"ionicon"} color={phaseIndicator[stage]}  />
                <Text style={styles.gray}> {stage}</Text>        
            </View>    
        </View>

        <View style={{width:90,marginLeft:10}}>
        {selectedImage ?
            <Image source={{ uri: selectedImage }} style={styles.image} />
        :
            <TouchableOpacity style={{position:"relative"}} onPress={pickImage}>   
                <View style={styles.addImagePlusSign}>
                    <Icon name="add-circle" color={'gray'} size={30} type={"ionicon"} />
                </View>    
                <Icon name="image" size={80} color={'gray'} type={"ionicon"} />
            </TouchableOpacity>
        }
        </View>
         
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
    gray:{
        color:"gray",
    },
    inline:{
        alignItems:"center",
        flexDirection:"row",
        marginTop:4,
    },
    addImagePlusSign:{
        position:"absolute",
        right:-10,
        zIndex:10,
        backgroundColor:theme.colors.cardUI,
        borderRadius:30,
    },
    image:{
        height:90,
        width:90,
        borderRadius:12,
    },
}))