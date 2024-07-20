import { View, Text, Animated, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'

export default function FloatingLabel({label}) {
    const animatedTiming = useRef(new Animated.Value(0)).current;
    useEffect( () => {
      Animated.timing(animatedTiming, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    },[animatedTiming])
    const fontSize = animatedTiming.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 32], // Font size will animate from 16 to 32
    });

  return (
    <Animated.View style={styles.floatingLabelView}>
        <Animated.Text style={[styles.floatingLabelText,{
            transform: [{
                translateY:animatedTiming.interpolate({
                    inputRange: [0, 1],
                    outputRange: [17, -3], // Adjust these values as needed
                }),
            },],
            opacity:animatedTiming,
            backgroundColor:'transparent',
        },
        ]}>{label}</Animated.Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    floatingLabelView:{
      position:"relative",
      zIndex:1,
    },
    floatingLabelText:{
      position:"absolute",
      color:"gray",
      fontWeight:'bold',
      left:10,
    }
}) 