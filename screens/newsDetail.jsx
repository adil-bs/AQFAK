import { ScrollView, StyleSheet, Image, View } from 'react-native'
import React , { useContext } from 'react'
import { NewsContext, getRelativeTime } from '../core/utility'
import {Text,useTheme, Icon } from '@rneui/themed'
import NewsFooter from '../components/newsFooter'

export default function NewsDetail({route,navigation}) {
    const {theme} = useTheme()
    const {articles} = useContext(NewsContext)
    const id = route.params.id
    const news = articles.find(article => article.id === id)

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text h3>{news.title}</Text>
        <Image source={{uri:news.media,height:300}} style={styles.img} />
        <NewsFooter 
            rights={news.rights} 
            date={getRelativeTime(news.published_date)} 
            containerStyle={{marginLeft:15,marginBottom:15}}
        />

        {news.updated_date && <Text style={{fontSize:12}}>Updated {getRelativeTime(news.updated_date)}</Text>}

        <Text style={{fontSize:12}}>
            by <Text bold>{news.authors.join(', ')}</Text>
        </Text>

        <View style={[styles.desc,{borderColor:theme.colors.primary}]}>
            <Text style={{fontStyle:"italic"}}>{news.description}</Text> 
        </View>

        <Text style={{marginBottom:20}}>{news.content}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
    },
    img:{
        borderRadius:20,
        marginTop:20,
    },
    desc:{
        marginVertical:15,
        paddingLeft:20,
        borderLeftWidth:5
    }
})