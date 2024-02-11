import { StyleSheet,  View } from 'react-native'
import React from 'react'
import {Text, Card, Image} from '@rneui/themed'
import { getRelativeTime } from '../core/utility'
import NewsFooter from './newsFooter'

export default function NewsCard({item,navigation}) {
    const formattedDate = getRelativeTime(item.published_date)

  return (
    <Card 
        containerStyle={styles.container} 
        wrapperStyle={styles.containerWrap}
        onStartShouldSetResponder = {()=>true}
        onResponderRelease={() => navigation.navigate('NewsDetail',{id:item.id})}
    >
        <View style={{flex:1}}>
            <Text 
                bold 
                style={styles.header}
                numberOfLines={5}
                ellipsizeMode='tail'
            >
                {item.title}
            </Text>
            <NewsFooter rights={item.rights} date={formattedDate}/>
        </View>
        <Image source={{uri:item.media}} style={styles.img}/>
    </Card>
  )
}

const styles = StyleSheet.create({
    container:{
        borderRadius:20,
    },
    containerWrap:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    header:{
        flex:1,
        textAlignVertical:"center",
        fontSize:20,
    },
    img:{
        width:100,
        height:100,
        borderRadius:20,
        resizeMode:"cover",
    },
})