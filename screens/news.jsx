import React,{ useContext } from 'react';
import { FlatList, StyleSheet, View } from "react-native";
import NewsTrending from '../components/newsTrending';
import NewsCard from '../components/newsCard';
import { NewsContext } from '../core/utility';

export default function News({navigation}) {   
  const {articles} = useContext(NewsContext)
  return (
    <View style={{flex:1}}>
      <FlatList
        data={articles}
        renderItem={({item}) => <NewsCard {...{item,navigation}}/>}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<NewsTrending data={articles} navigation={navigation}/>}
      />
    </View>
  );
}
const style = StyleSheet.create({})

