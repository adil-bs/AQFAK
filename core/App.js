import {ThemeProvider,createTheme,Skeleton,} from '@rneui/themed'
import Navigators from './navigators'
import { Animated, StyleSheet, useColorScheme } from 'react-native'
import { useEffect, useRef } from 'react';
import FloatingLabel from '../components/floatingLabel';

const App = () => {

  const mode = useColorScheme()
  const theme = createTheme({
    lightColors:{
      primary:"#4DB6AC",
      secondary:"#4BBF19",
      background:"#ECF2F1",
      text:"#000000",
      cardUI:"white",
    },
    darkColors:{
      primary:"#32D95C",
      secondary:"#4BBF19",
      background:"black",
      text:"#FFFFFF",
      cardUI:"#011516",
      card:"#082422",
    },
    mode:'light' ,
    // mode:mode ,
    components:{
      Text: (props , theme) => ({
        style:{
          color : theme.colors.text,
          fontWeight : props.bold ? "bold" : "300",
        },
      }),
      Image:(props) => ({
        PlaceholderContent : 
          <Skeleton 
            animation='wave' 
            skeletonStyle={{borderRadius:15}} 
            height={props.height || props.style.height || 'auto'}
            width={props.width || props.style.width || 'auto'}
          />,
        transition:"true",
      }),
      Card:(_,theme) => ({
        containerStyle:{
          borderColor:theme.colors.divider,
          backgroundColor:theme.colors.cardUI,
        },
      }),
      Input:(props,theme) => ({
        // label:(props.placeholder && props.value) ? props.placeholder : '',
        // labelStyle:{marginBottom:-12,marginLeft:5}        
        label: props.floatingLabel 
        ? ((props.placeholder && props.value) ? <FloatingLabel label={props.placeholder} /> : '')
        : props.label,

        inputStyle:  {
          borderWidth:1,
          borderColor:'green',
          borderRadius:5,
          backgroundColor:theme.mode === "light" ?'#edffe3' : '#012605',
          paddingLeft:10,
        },

      })
    }
  })
  return (
    <ThemeProvider theme={theme}>   
      <Navigators/>
    </ThemeProvider>
  )
}


export default App