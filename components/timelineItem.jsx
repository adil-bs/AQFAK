import {View,StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Icon, useTheme, Text } from '@rneui/themed';
import { getRelativeTime } from '../core/utility';

export default function TimelineItem ({event, index, length}) {
  const { theme } = useTheme()
  return(
    <View key={index} style={styles.timelineItem}>
            {index !== length-1 && <View style={styles.line} />}
            <View style={[styles.circle,{borderColor:theme.colors.primary,}]}>
              <Icon name="circle" type="font-awesome" color={theme.colors.primary} size={16} />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.activity}>{event.activity}</Text>
                {event.description && <Text>{event.description}</Text>}
                <Text style={styles.time}>{getRelativeTime( new Date(event.time.toUpperCase() ) )}</Text>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    timelineContainer: {
      flex: 1,
      padding: 10,
      flexDirection: 'column',
    },
    timelineItem: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
    },
    line: {
      height: '100%',
      width: 2,
      backgroundColor: 'gray',
      position: 'absolute',
      top:"50%",
      left: 7,
      zIndex: -1,
    },
    circle: {
      backgroundColor: 'white',
      borderRadius: 8,
      borderWidth: 2,
      width: 16,
      height: 16,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },
    contentContainer: {
      flex: 1,
      marginLeft: 20,
      paddingVertical: 10,
    },
    activity: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    time: {
      color: 'gray',
    },
  });