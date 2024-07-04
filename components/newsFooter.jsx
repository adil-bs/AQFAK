import { StyleSheet, View } from 'react-native'
import React from 'react'
import {Text, Icon } from '@rneui/themed'

export default function NewsFooter({rights,date,containerStyle,textStyle}) {
  return (
    <View style={[styles.footerContainer,containerStyle]} >
        <Text style={[styles.footer,textStyle]}>{rights}  </Text>
        <Icon name="ellipse" type={"ionicon"} size={6} color={textStyle?.color || "gray"}  />
        <Text style={[styles.footer,textStyle]}>  {date} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    footerContainer:{
        flexDirection:"row",
        alignItems:"center"
    },
    footer:{
        fontSize:10,
    },
})