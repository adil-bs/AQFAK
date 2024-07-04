import { useState,useEffect,useReducer, createContext } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon,useTheme } from '@rneui/themed'
import { NewsContext } from './utility';
import Home from '../screens/home';
import News from '../screens/news';
import NewsDetail from '../screens/newsDetail';
import ColorMode from '../components/colorMode';
import Profile from '../screens/profile';
import Weather from '../screens/weather';
import Crop from '../screens/crop';
import ExpertHome from '../screens/expertHome';
import ExpertAddSchedule from '../screens/expertAddSchedule';
import Login from '../screens/login';
import Register1 from '../screens/register1';
import CropEdits from '../screens/cropEdits';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';

export const AuthContext = createContext()

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()


export function LoginStack() {

  return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='login'>{(props)=> <Login {...props}/> }</Stack.Screen>
            <Stack.Screen name="register1">{(props)=> <Register1 {...props}/> }</Stack.Screen>
            <Stack.Screen name="register2">{(props)=> <CropEdits {...props}/> }</Stack.Screen>
        </Stack.Navigator>        
  );
}

function HomeStack() {
  return(
    <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
      <Stack.Screen name='HomeIndex' component={Home} />
      <Stack.Screen name='Crop' component={Crop} />
      <Stack.Screen name="CropEdits">{(props)=> <CropEdits {...props}/> }</Stack.Screen>
    </Stack.Navigator>
  )
}

function NewsStack() {
  const data = {
    "status": "ok",
    "total_hits": 6969,
    "page": 1,
    "total_pages": 70,
    "page_size": 100,
    "articles": [
      {
      "title": "Is Elon Musk Changing His Name? New Post On 'X' Sparks Rumour",
      "author": "Anjali Thakur",
      "authors": [
        "Anjali Thakur",
      ],
      "published_date": "2023-09-26 05:05:11",
      "published_date_precision": "full",
      "updated_date": null,
      "updated_date_precision": null,
      "link": "https://www.ndtv.com/world-news/is-elon-musk-changing-his-name-new-post-on-x-sparks-rumour-4424012#pfrom=home-ndtv_featured",
      "domain_url": "ndtv.com",
      "full_domain_url": "ndtv.com",
      "name_source": "NDTV",
      "is_headline": false,
      "paid_content": false,
      "parent_url": "https://www.ndtv.com",
      "country": "IN",
      "rights": "ndtv.com",
      "rank": 920,
      "media": "https://wallpapers.com/images/hd/high-resolution-tiger-robot-apk693i37494vkwp.jpg",
         "language": "en",
      "description": "His post has since received more than 3 million views with a flurry of comments on X.",
      "content": "Billionaire Elon Musk, the founder and owner of Tesla, X.com, SpaceX, Neuralink and The Boring Company's recent post on 'X' is going viral. He wrote on X, \"Nobody-that's my name\". His post has since received more than 3 million views with a flurry of comments on X.\n\n See the post here: Nobody—that's my name — Elon Musk (@elonmusk) September 26, 2023 While some users asked Mr Musk if he was \"okay\", others started a meme fest. A user wrote, \"You good bro?\" Another user commented, \"Hi Nobody.\" \"When Elon makes a post, millions of phones ding around the world and people rush to respond and get his attention,\" the third user wrote. \"Tomorrow is another day,\" the fourth user wrote. \"Everybody - that's my name,\" the fifth user commented. Meanwhile, earlier, billionaire Elon Musk stated that he is buying the iPhone 15 and many of us would agree with his reason. Mr Musk said, \"The beauty of iPhone pictures & video is incredible.\" Elon Musk is ranked as the world's richest person by Forbes and Bloomberg Billionaires Index, with a total net worth of $236 billion. Unlike other billionaires and usual investment stories, Mr Musk undertook some risky investment options which ultimately made him the richest private citizen on the planet since 2021. Mr Musk's ownership share in electric vehicle manufacturer Tesla and his holdings in SpaceX and the Boring Company are responsible for his startling increase in fortune. However, Tesla has been the main source of his wealth, with the company's stock rising by more than 1,100 per cent in the last five years as investors rewarded it for its rise in vehicle sales.",
      "word_count": 275,
      "is_opinion": false,
      "twitter_account": "@ndtv",
      "all_links": [
        "https://www.jiosaavn.com/featured/new-music-this-week/Ns2UZo9qDvI",
        "https://www.ndtvgames.com/#pfrom=ndtv-globalnav",
        "https://www.gadgets360.com/mobiles/phone-finder",
        "https://mpcg.ndtv.in",
        "https://twitter.com/elonmusk/status/1706510175144649057?ref_src=twsrc%5Etfw",
        "https://ndtv.in/videos/live/channel/ndtvindia",
        "https://hotdeals360.com/beauty/best-glycolic-acid-toners-for-blemish-free-glowing-skin-4394322",
        "https://hotdeals360.com/beauty/best-glitter-lip-glosses-that-are-trending-in-the-world-of-beauty-4398727",
        "https://rajasthan.ndtv.in",
        "https://www.whatsapp.com/channel/0029Va4lixw7z4kcvZI9JM12",
        "https://twitter.com/ndtv",
        "https://www.instagram.com/ndtv/",
        "https://www.facebook.com/ndtv",
        "https://www.gadgets360.com/#pfrom=ndtv-globalnav",
        "https://rajasthan.ndtv.in/livetv-ndtvrajasthan",
        "https://www.jiosaavn.com",
        "https://www.whosthat360.com/finance/anushka-rathod-avoid-this-common-mistake-when-investing-in-mutual-funds-4408067",
        "https://www.gadgets360.com/internet/news/flipkart-big-billion-days-sale-2023-instant-bank-discount-details-teased-offers-deals-4417000",
        "https://ndtv.in/#pfrom=ndtv-globalnav",
        "https://mpcg.ndtv.in/livetv-ndtvmpcg",
        "https://www.gadgets360.com/internet/features/amazon-great-indian-festival-sale-date-october-10-leak-deals-discounts-offers-4420830"
      ],
      "all_domain_links": [
        "instagram.com",
        "whatsapp.com",
        "twitter.com",
        "gadgets360.com",
        "hotdeals360.com",
        "whosthat360.com",
        "ndtvgames.com",
        "jiosaavn.com",
        "ndtv.in",
        "facebook.com"
      ],
      "nlp": {
        "theme": "Business",
        "summary": "Elon Musk is the founder and owner of Tesla, X.com, SpaceX, Neuralink and The Boring Company. He wrote on X, \"Nobody-that's my name\". His post has since received more than 3 million views. He is ranked as the world's richest person with a net worth of $236 billion.",
        "sentiment": {
          "title": 0,
          "content": 0
        },
        "ner_PER": [
          {
            "entity_name": "Elon Musk",
            "count": 4
          },
          {
            "entity_name": "Musk",
            "count": 4
          },
          {
            "entity_name": "Elon",
            "count": 1
          }
        ],
        "ner_ORG": [
          {
            "entity_name": "Tesla",
            "count": 3
          },
          {
            "entity_name": "SpaceX",
            "count": 2
          },
          {
            "entity_name": "X.com",
            "count": 1
          },
          {
            "entity_name": "Neuralink",
            "count": 1
          },
          {
            "entity_name": "The Boring Company",
            "count": 1
          },
          {
            "entity_name": "Forbes",
            "count": 1
          },
          {
            "entity_name": "Boring Company",
            "count": 1
          }
        ],
        "ner_MISC": [
          {
            "entity_name": "iPhone 15",
            "count": 1
          },
          {
            "entity_name": "iPhone",
            "count": 1
          },
          {
            "entity_name": "Bloomberg Billionaires Index",
            "count": 1
          }
        ],
        "ner_LOC": []
      },
      "id": "c63576c21d9da5d27e13424f023d4ef8",
      "score": 23.87998
    },
    {
      "title": "Is Elon Musk Changing His Name? New Post On 'X' Sparks Rumour",
      "author": "Anjali Thakur",
      "authors": [
        "Anjali Thakur"
      ],
      "published_date": "2023-09-26 05:05:11",
      "published_date_precision": "full",
      "updated_date": null,
      "updated_date_precision": null,
      "link": "https://www.ndtv.com/world-news/is-elon-musk-changing-his-name-new-post-on-x-sparks-rumour-4424012#pfrom=home-ndtv_featured",
      "domain_url": "ndtv.com",
      "full_domain_url": "ndtv.com",
      "name_source": "NDTV",
      "is_headline": false,
      "paid_content": false,
      "parent_url": "https://www.ndtv.com",
      "country": "IN",
      "rights": "ndtv.com",
      "rank": 920,
      "media": "data:image/jpeg;base64,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",
      "language": "en",
      "description": "His post has since received more than 3 million views with a flurry of comments on X.",
      "content": "Billionaire Elon Musk, the founder and owner of Tesla, X.com, SpaceX, Neuralink and The Boring Company's recent post on 'X' is going viral. He wrote on X, \"Nobody-that's my name\". His post has since received more than 3 million views with a flurry of comments on X. See the post here: Nobody—that's my name — Elon Musk (@elonmusk) September 26, 2023 While some users asked Mr Musk if he was \"okay\", others started a meme fest. A user wrote, \"You good bro?\" Another user commented, \"Hi Nobody.\" \"When Elon makes a post, millions of phones ding around the world and people rush to respond and get his attention,\" the third user wrote. \"Tomorrow is another day,\" the fourth user wrote. \"Everybody - that's my name,\" the fifth user commented. Meanwhile, earlier, billionaire Elon Musk stated that he is buying the iPhone 15 and many of us would agree with his reason. Mr Musk said, \"The beauty of iPhone pictures & video is incredible.\" Elon Musk is ranked as the world's richest person by Forbes and Bloomberg Billionaires Index, with a total net worth of $236 billion. Unlike other billionaires and usual investment stories, Mr Musk undertook some risky investment options which ultimately made him the richest private citizen on the planet since 2021. Mr Musk's ownership share in electric vehicle manufacturer Tesla and his holdings in SpaceX and the Boring Company are responsible for his startling increase in fortune. However, Tesla has been the main source of his wealth, with the company's stock rising by more than 1,100 per cent in the last five years as investors rewarded it for its rise in vehicle sales.",
      "word_count": 275,
      "is_opinion": false,
      "twitter_account": "@ndtv",
      "all_links": [
        "https://www.jiosaavn.com/featured/new-music-this-week/Ns2UZo9qDvI",
        "https://www.ndtvgames.com/#pfrom=ndtv-globalnav",
        "https://www.gadgets360.com/mobiles/phone-finder",
        "https://mpcg.ndtv.in",
        "https://twitter.com/elonmusk/status/1706510175144649057?ref_src=twsrc%5Etfw",
        "https://ndtv.in/videos/live/channel/ndtvindia",
        "https://hotdeals360.com/beauty/best-glycolic-acid-toners-for-blemish-free-glowing-skin-4394322",
        "https://hotdeals360.com/beauty/best-glitter-lip-glosses-that-are-trending-in-the-world-of-beauty-4398727",
        "https://rajasthan.ndtv.in",
        "https://www.whatsapp.com/channel/0029Va4lixw7z4kcvZI9JM12",
        "https://twitter.com/ndtv",
        "https://www.instagram.com/ndtv/",
        "https://www.facebook.com/ndtv",
        "https://www.gadgets360.com/#pfrom=ndtv-globalnav",
        "https://rajasthan.ndtv.in/livetv-ndtvrajasthan",
        "https://www.jiosaavn.com",
        "https://www.whosthat360.com/finance/anushka-rathod-avoid-this-common-mistake-when-investing-in-mutual-funds-4408067",
        "https://www.gadgets360.com/internet/news/flipkart-big-billion-days-sale-2023-instant-bank-discount-details-teased-offers-deals-4417000",
        "https://ndtv.in/#pfrom=ndtv-globalnav",
        "https://mpcg.ndtv.in/livetv-ndtvmpcg",
        "https://www.gadgets360.com/internet/features/amazon-great-indian-festival-sale-date-october-10-leak-deals-discounts-offers-4420830"
      ],
      "all_domain_links": [
        "instagram.com",
        "whatsapp.com",
        "twitter.com",
        "gadgets360.com",
        "hotdeals360.com",
        "whosthat360.com",
        "ndtvgames.com",
        "jiosaavn.com",
        "ndtv.in",
        "facebook.com"
      ],
      "nlp": {
        "theme": "Business",
        "summary": "Elon Musk is the founder and owner of Tesla, X.com, SpaceX, Neuralink and The Boring Company. He wrote on X, \"Nobody-that's my name\". His post has since received more than 3 million views. He is ranked as the world's richest person with a net worth of $236 billion.",
        "sentiment": {
          "title": 0,
          "content": 0
        },
        "ner_PER": [
          {
            "entity_name": "Elon Musk",
            "count": 4
          },
          {
            "entity_name": "Musk",
            "count": 4
          },
          {
            "entity_name": "Elon",
            "count": 1
          }
        ],
        "ner_ORG": [
          {
            "entity_name": "Tesla",
            "count": 3
          },
          {
            "entity_name": "SpaceX",
            "count": 2
          },
          {
            "entity_name": "X.com",
            "count": 1
          },
          {
            "entity_name": "Neuralink",
            "count": 1
          },
          {
            "entity_name": "The Boring Company",
            "count": 1
          },
          {
            "entity_name": "Forbes",
            "count": 1
          },
          {
            "entity_name": "Boring Company",
            "count": 1
          }
        ],
        "ner_MISC": [
          {
            "entity_name": "iPhone 15",
            "count": 1
          },
          {
            "entity_name": "iPhone",
            "count": 1
          },
          {
            "entity_name": "Bloomberg Billionaires Index",
            "count": 1
          }
        ],
        "ner_LOC": []
      },
      "id": "c63576c21d9da5d27e13424f023d4ff8",
      "score": 23.87998
    },
    {
      "title": "Is Elon Musk Changing His Name? New Post On 'X' Sparks Rumour",
      "author": "Anjali Thakur",
      "authors": [
        "Anjali Thakur"
      ],
      "published_date": "2023-09-26 05:05:11",
      "published_date_precision": "full",
      "updated_date": null,
      "updated_date_precision": null,
      "link": "https://www.ndtv.com/world-news/is-elon-musk-changing-his-name-new-post-on-x-sparks-rumour-4424012#pfrom=home-ndtv_featured",
      "domain_url": "ndtv.com",
      "full_domain_url": "ndtv.com",
      "name_source": "NDTV",
      "is_headline": false,
      "paid_content": false,
      "parent_url": "https://www.ndtv.com",
      "country": "IN",
      "rights": "ndtv.com",
      "rank": 920,
      "media": "https://c.ndtvimg.com/2023-09/4dau661g_elon-musk-reuters_625x300_13_September_23.jpg",
      "language": "en",
      "description": "His post has since received more than 3 million views with a flurry of comments on X.",
      "content": "Billionaire Elon Musk, the founder and owner of Tesla, X.com, SpaceX, Neuralink and The Boring Company's recent post on 'X' is going viral. He wrote on X, \"Nobody-that's my name\". His post has since received more than 3 million views with a flurry of comments on X. See the post here: Nobody—that's my name — Elon Musk (@elonmusk) September 26, 2023 While some users asked Mr Musk if he was \"okay\", others started a meme fest. A user wrote, \"You good bro?\" Another user commented, \"Hi Nobody.\" \"When Elon makes a post, millions of phones ding around the world and people rush to respond and get his attention,\" the third user wrote. \"Tomorrow is another day,\" the fourth user wrote. \"Everybody - that's my name,\" the fifth user commented. Meanwhile, earlier, billionaire Elon Musk stated that he is buying the iPhone 15 and many of us would agree with his reason. Mr Musk said, \"The beauty of iPhone pictures & video is incredible.\" Elon Musk is ranked as the world's richest person by Forbes and Bloomberg Billionaires Index, with a total net worth of $236 billion. Unlike other billionaires and usual investment stories, Mr Musk undertook some risky investment options which ultimately made him the richest private citizen on the planet since 2021. Mr Musk's ownership share in electric vehicle manufacturer Tesla and his holdings in SpaceX and the Boring Company are responsible for his startling increase in fortune. However, Tesla has been the main source of his wealth, with the company's stock rising by more than 1,100 per cent in the last five years as investors rewarded it for its rise in vehicle sales.",
      "word_count": 275,
      "is_opinion": false,
      "twitter_account": "@ndtv",
      "all_links": [
        "https://www.jiosaavn.com/featured/new-music-this-week/Ns2UZo9qDvI",
        "https://www.ndtvgames.com/#pfrom=ndtv-globalnav",
        "https://www.gadgets360.com/mobiles/phone-finder",
        "https://mpcg.ndtv.in",
        "https://twitter.com/elonmusk/status/1706510175144649057?ref_src=twsrc%5Etfw",
        "https://ndtv.in/videos/live/channel/ndtvindia",
        "https://hotdeals360.com/beauty/best-glycolic-acid-toners-for-blemish-free-glowing-skin-4394322",
        "https://hotdeals360.com/beauty/best-glitter-lip-glosses-that-are-trending-in-the-world-of-beauty-4398727",
        "https://rajasthan.ndtv.in",
        "https://www.whatsapp.com/channel/0029Va4lixw7z4kcvZI9JM12",
        "https://twitter.com/ndtv",
        "https://www.instagram.com/ndtv/",
        "https://www.facebook.com/ndtv",
        "https://www.gadgets360.com/#pfrom=ndtv-globalnav",
        "https://rajasthan.ndtv.in/livetv-ndtvrajasthan",
        "https://www.jiosaavn.com",
        "https://www.whosthat360.com/finance/anushka-rathod-avoid-this-common-mistake-when-investing-in-mutual-funds-4408067",
        "https://www.gadgets360.com/internet/news/flipkart-big-billion-days-sale-2023-instant-bank-discount-details-teased-offers-deals-4417000",
        "https://ndtv.in/#pfrom=ndtv-globalnav",
        "https://mpcg.ndtv.in/livetv-ndtvmpcg",
        "https://www.gadgets360.com/internet/features/amazon-great-indian-festival-sale-date-october-10-leak-deals-discounts-offers-4420830"
      ],
      "all_domain_links": [
        "instagram.com",
        "whatsapp.com",
        "twitter.com",
        "gadgets360.com",
        "hotdeals360.com",
        "whosthat360.com",
        "ndtvgames.com",
        "jiosaavn.com",
        "ndtv.in",
        "facebook.com"
      ],
      "nlp": {
        "theme": "Business",
        "summary": "Elon Musk is the founder and owner of Tesla, X.com, SpaceX, Neuralink and The Boring Company. He wrote on X, \"Nobody-that's my name\". His post has since received more than 3 million views. He is ranked as the world's richest person with a net worth of $236 billion.",
        "sentiment": {
          "title": 0,
          "content": 0
        },
        "ner_PER": [
          {
            "entity_name": "Elon Musk",
            "count": 4
          },
          {
            "entity_name": "Musk",
            "count": 4
          },
          {
            "entity_name": "Elon",
            "count": 1
          }
        ],
        "ner_ORG": [
          {
            "entity_name": "Tesla",
            "count": 3
          },
          {
            "entity_name": "SpaceX",
            "count": 2
          },
          {
            "entity_name": "X.com",
            "count": 1
          },
          {
            "entity_name": "Neuralink",
            "count": 1
          },
          {
            "entity_name": "The Boring Company",
            "count": 1
          },
          {
            "entity_name": "Forbes",
            "count": 1
          },
          {
            "entity_name": "Boring Company",
            "count": 1
          }
        ],
        "ner_MISC": [
          {
            "entity_name": "iPhone 15",
            "count": 1
          },
          {
            "entity_name": "iPhone",
            "count": 1
          },
          {
            "entity_name": "Bloomberg Billionaires Index",
            "count": 1
          }
        ],
        "ner_LOC": []
      },
      "id": "c63576c21e9da5d27e13424f023d4ef8",
      "score": 23.87998
    },
    {
      "title": "Is Elon Musk Changing His Name? New Post On 'X' Sparks Rumour",
      "author": "Anjali Thakur",
      "authors": [
        "Anjali Thakur"
      ],
      "published_date": "2023-09-26 05:05:11",
      "published_date_precision": "full",
      "updated_date": null,
      "updated_date_precision": null,
      "link": "https://www.ndtv.com/world-news/is-elon-musk-changing-his-name-new-post-on-x-sparks-rumour-4424012#pfrom=home-ndtv_featured",
      "domain_url": "ndtv.com",
      "full_domain_url": "ndtv.com",
      "name_source": "NDTV",
      "is_headline": false,
      "paid_content": false,
      "parent_url": "https://www.ndtv.com",
      "country": "IN",
      "rights": "ndtv.com",
      "rank": 920,
      "media": "https://c.ndtvimg.com/2023-09/4dau661g_elon-musk-reuters_625x300_13_September_23.jpg",
      "language": "en",
      "description": "His post has since received more than 3 million views with a flurry of comments on X.",
      "content": "Billionaire Elon Musk, the founder and owner of Tesla, X.com, SpaceX, Neuralink and The Boring Company's recent post on 'X' is going viral. He wrote on X, \"Nobody-that's my name\". His post has since received more than 3 million views with a flurry of comments on X. See the post here: Nobody—that's my name — Elon Musk (@elonmusk) September 26, 2023 While some users asked Mr Musk if he was \"okay\", others started a meme fest. A user wrote, \"You good bro?\" Another user commented, \"Hi Nobody.\" \"When Elon makes a post, millions of phones ding around the world and people rush to respond and get his attention,\" the third user wrote. \"Tomorrow is another day,\" the fourth user wrote. \"Everybody - that's my name,\" the fifth user commented. Meanwhile, earlier, billionaire Elon Musk stated that he is buying the iPhone 15 and many of us would agree with his reason. Mr Musk said, \"The beauty of iPhone pictures & video is incredible.\" Elon Musk is ranked as the world's richest person by Forbes and Bloomberg Billionaires Index, with a total net worth of $236 billion. Unlike other billionaires and usual investment stories, Mr Musk undertook some risky investment options which ultimately made him the richest private citizen on the planet since 2021. Mr Musk's ownership share in electric vehicle manufacturer Tesla and his holdings in SpaceX and the Boring Company are responsible for his startling increase in fortune. However, Tesla has been the main source of his wealth, with the company's stock rising by more than 1,100 per cent in the last five years as investors rewarded it for its rise in vehicle sales.",
      "word_count": 275,
      "is_opinion": false,
      "twitter_account": "@ndtv",
      "all_links": [
        "https://www.jiosaavn.com/featured/new-music-this-week/Ns2UZo9qDvI",
        "https://www.ndtvgames.com/#pfrom=ndtv-globalnav",
        "https://www.gadgets360.com/mobiles/phone-finder",
        "https://mpcg.ndtv.in",
        "https://twitter.com/elonmusk/status/1706510175144649057?ref_src=twsrc%5Etfw",
        "https://ndtv.in/videos/live/channel/ndtvindia",
        "https://hotdeals360.com/beauty/best-glycolic-acid-toners-for-blemish-free-glowing-skin-4394322",
        "https://hotdeals360.com/beauty/best-glitter-lip-glosses-that-are-trending-in-the-world-of-beauty-4398727",
        "https://rajasthan.ndtv.in",
        "https://www.whatsapp.com/channel/0029Va4lixw7z4kcvZI9JM12",
        "https://twitter.com/ndtv",
        "https://www.instagram.com/ndtv/",
        "https://www.facebook.com/ndtv",
        "https://www.gadgets360.com/#pfrom=ndtv-globalnav",
        "https://rajasthan.ndtv.in/livetv-ndtvrajasthan",
        "https://www.jiosaavn.com",
        "https://www.whosthat360.com/finance/anushka-rathod-avoid-this-common-mistake-when-investing-in-mutual-funds-4408067",
        "https://www.gadgets360.com/internet/news/flipkart-big-billion-days-sale-2023-instant-bank-discount-details-teased-offers-deals-4417000",
        "https://ndtv.in/#pfrom=ndtv-globalnav",
        "https://mpcg.ndtv.in/livetv-ndtvmpcg",
        "https://www.gadgets360.com/internet/features/amazon-great-indian-festival-sale-date-october-10-leak-deals-discounts-offers-4420830"
      ],
      "all_domain_links": [
        "instagram.com",
        "whatsapp.com",
        "twitter.com",
        "gadgets360.com",
        "hotdeals360.com",
        "whosthat360.com",
        "ndtvgames.com",
        "jiosaavn.com",
        "ndtv.in",
        "facebook.com"
      ],
      "nlp": {
        "theme": "Business",
        "summary": "Elon Musk is the founder and owner of Tesla, X.com, SpaceX, Neuralink and The Boring Company. He wrote on X, \"Nobody-that's my name\". His post has since received more than 3 million views. He is ranked as the world's richest person with a net worth of $236 billion.",
        "sentiment": {
          "title": 0,
          "content": 0
        },
        "ner_PER": [
          {
            "entity_name": "Elon Musk",
            "count": 4
          },
          {
            "entity_name": "Musk",
            "count": 4
          },
          {
            "entity_name": "Elon",
            "count": 1
          }
        ],
        "ner_ORG": [
          {
            "entity_name": "Tesla",
            "count": 3
          },
          {
            "entity_name": "SpaceX",
            "count": 2
          },
          {
            "entity_name": "X.com",
            "count": 1
          },
          {
            "entity_name": "Neuralink",
            "count": 1
          },
          {
            "entity_name": "The Boring Company",
            "count": 1
          },
          {
            "entity_name": "Forbes",
            "count": 1
          },
          {
            "entity_name": "Boring Company",
            "count": 1
          }
        ],
        "ner_MISC": [
          {
            "entity_name": "iPhone 15",
            "count": 1
          },
          {
            "entity_name": "iPhone",
            "count": 1
          },
          {
            "entity_name": "Bloomberg Billionaires Index",
            "count": 1
          }
        ],
        "ner_LOC": []
      },
      "id": "c63576c21d9ea5d27e13424f023d4ef8",
      "score": 23.87998
    },
    ],
    "user_input": {}
  }
  return(
    <NewsContext.Provider value={data}>
    <Stack.Navigator 
      initialRouteName='NewsIndex' 
      screenOptions={{
        headerTitle:"News",
        headerRight : (props) => <ColorMode {...props} />,
      }}
    >
      <Stack.Screen name="NewsIndex" component={News} />
      <Stack.Screen name="NewsDetail" component={NewsDetail} />
    </Stack.Navigator>
    </NewsContext.Provider>

  )
}

export default function Navigators() {
  const {theme} = useTheme()
  const navTheme = {...DefaultTheme,colors:{...DefaultTheme.colors, ...theme.colors}} 
  // const [isLogged, setIsLogged] = useState(false)
  const [loggedState,dispatchLoggedState] = useReducer(
    (state,action) => {
      switch (action.type) {
        case 'userLogin' : 
          return( {loggedIn:true, isExpert:false} )
        case 'expertLogin' : 
          return( {loggedIn:true, isExpert:true} )
        case 'logout' :
          return( {...state,loggedIn:false} )
      }
    },
    {loggedIn:false, isExpert:false}
  )

  const [loading, setLoading] = useState(true);

useEffect(() => {
  AsyncStorage.getItem('AQFAK_USER')
    .then(val =>
      val &&
      fetch('https://aqfak-django-git-main-adil-bss-projects.vercel.app/auth/sign/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({ user_id: val })
      })
    )
    .then(res => res.json())
    .then(isUser => {
      // dispatchLoggedState({ type: 'userLogin' })
      if (isUser === 'true') {
        dispatchLoggedState({ type: 'userLogin' });
      } else if (isUser === 'false') {
        dispatchLoggedState({ type: 'logout' });
      }
    })
    .catch(err => console.log('err : ', err))
    .finally(() => setLoading(false));
}, []);
console.log(loggedState)

return loading ? (
  
  <ActivityIndicator /> // or any loading indicator
) : (
  <AuthContext.Provider value={{ dispatchLoggedState }}>
    <SafeAreaProvider>
    <NavigationContainer theme={navTheme}>

      {loggedState.loggedIn ?
        <Tab.Navigator screenOptions={ ({route}) =>({
          tabBarIcon: ({size,color}) => {
            const iconName = {Home:'home',Weather:'cloud',News:'newspaper',Profile:'person-circle',Add:'add-circle'}
            return <Icon name={iconName[route.name]} size={size} type="ionicon" color={color} />;
          },
          tabBarLabelStyle:{
            fontWeight:"bold",
            marginBottom:3,
          },
          headerRight : (props) => <ColorMode {...props} />,
        })}>
          {loggedState.isExpert ?
            <>
              <Tab.Screen name='Home' component={ExpertHome}/>
              <Tab.Screen name='Add' component={ExpertAddSchedule}/>
            </>
          :
            <>
              <Tab.Screen name='Home' component={HomeStack}/>
              {/* <Tab.Screen name='Weather' component={Weather}/> */}
              {/* <Tab.Screen name='News' component={NewsStack} options={{headerShown:false}}/> */}
              <Tab.Screen name='Profile' component={Profile}/>
            </>
          }

        </Tab.Navigator>
      :
        <LoginStack/>
      }

    </NavigationContainer>
    </SafeAreaProvider>
    </AuthContext.Provider> 
  );
}