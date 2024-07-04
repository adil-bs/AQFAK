import React,{ useRef } from 'react'
import { Animated, Dimensions, FlatList, ImageBackground, StyleSheet, View, } from 'react-native'
import { getRelativeTime } from '../core/utility'
import {Text, Icon, useTheme, Image } from '@rneui/themed'
import NewsFooter from './newsFooter'

const margin = 15
const windowWidth = Dimensions.get("screen").width-margin*2

const NewsPage = ({ item, style,navigation }) => {
  const formattedDate = getRelativeTime(item.published_date)
  return (
    <Animated.View  style={style} >
    <Image
      source={{ uri: item.media }}
      alt='jin'
      style={styles.img}
      onPress={() => navigation.navigate('NewsDetail',{id:item.id})}
    >
      <View style={styles.newsSection}>
        <Text 
          numberOfLines={4}
          ellipsizeMode='tail' 
          style={[styles.newsText,{fontSize:30}]}
        >{item.title}</Text>
        
        <Text 
          numberOfLines={4}
          ellipsizeMode='tail' 
          style={[styles.newsText,{fontSize:16}]}
        >{item.description}</Text>
        
        <NewsFooter rights={item.rights} date={formattedDate} textStyle={styles.newsText}/>

      </View>
    </Image>
    </Animated.View>
  )
}
  
export default function NewsTrending({data,navigation}) {
  const {theme} = useTheme()
  const scrollX = useRef(new Animated.Value(0)).current

  return (
    <View style={styles.container}>

      <View >
        <FlatList
          data={data}
          renderItem={({ item, index }) => {
            const opacity = scrollX.interpolate({
              inputRange: [windowWidth * index, windowWidth * (index + 1)],
              outputRange: [1, 0],
            });
            return <NewsPage item={item} style={{opacity}} navigation={navigation}/>
          }}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={300}          
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: {x: scrollX} } }],
            {useNativeDriver:false}
          )}
        />
      </View>

      <View style={styles.dotContainer}>
        {data.map((_, i) => {
          const width = scrollX.interpolate({
            inputRange: [windowWidth * (i - 1), windowWidth * i, windowWidth * (i + 1)],
            outputRange: [10, 30, 10],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View 
              key={i} 
              style={[styles.normalDot,{width,backgroundColor:theme.colors.primary,}]}
            />
          );
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:margin,
  },
  img: {
    flex:1,
    height:400,
    width:windowWidth,
    resizeMode:"cover", //exp
    padding:20,
    borderRadius: 10, 
    overflow: 'hidden',
  },
  newsSection:{
    flex:1,
    justifyContent:"flex-end",
  },
  newsText:{
    color: 'white', 
    fontWeight: 'bold', 
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: -1 },
    textShadowRadius: 4,
  },
  footerContainer:{
    flexDirection:"row",
    alignItems:"center"
  },
  dotContainer: {
    margin:12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  normalDot: {
    height: 10,
    width: 10,
    borderRadius: 10,
    marginHorizontal: 4,
  },
})