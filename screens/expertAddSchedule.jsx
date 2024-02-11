import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Input, ListItem } from '@rneui/themed'


const grownType = ['Field','Pot','Balcony']
export default function ExpertAddSchedule() {
  const [expanded, setExpanded] = useState(false)
  const [selectedGrown,setSelectedGrown] = useState()

  function handleGrownTypeSelect(type) {
    setSelectedGrown(type)
  }

  return (
    <View style={{flex:1}}>
      <View style={styles.form}>
        <Input placeholder='Enter crop'/>

        <ListItem.Accordion 
          content={
            <ListItem.Title
              style={!selectedGrown ? {color:"gray"}:{}}
            >{selectedGrown || 'Select Grown Type'}</ListItem.Title>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
          style={styles.select}
        >
          {grownType.map(ele =>
            <ListItem 
              key={ele}
              Component={TouchableOpacity} 
              onPress={() => handleGrownTypeSelect(ele)}
              bottomDivider
              containerStyle={selectedGrown===ele ? styles.selectedItem :{}}
            >
              <ListItem.Title >{ele}</ListItem.Title>
            </ListItem> 
          )}
        </ListItem.Accordion>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form:{
    flex:1,
    margin:20,
    justifyContent:"center",
  },
  select:{
    borderBottomWidth:2,
    borderBottomColor:"gray",
  },
  selectedItem:{
    backgroundColor:"#C4E0ED",
    borderRadius:10,
  },
})