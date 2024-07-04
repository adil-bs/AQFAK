import { View, ScrollView, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
import { Image, Text, makeStyles, useTheme } from '@rneui/themed'

export default function HomeUI({heading,sub,img,IconRight,children}) {
    const [widthOffset, setWidthOffset] = React.useState(0);
    const styles = useStyles()
    const {theme} = useTheme()

    React.useEffect(() => {
        const {width} = Dimensions.get('window');
        setWidthOffset(width * -0.52 );
    }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.bg,{left:widthOffset}]}>
            <View style={{flex:3}}/>
            
            <View style={{flex:1}}>
                <ImageBackground 
                    source={img ? { uri: img } : require('../assets/helper/transparent.png')}
                    resizeMode="cover" 
                    style={styles.image}
                >
                    <View style={[styles.bgDesc,{backgroundColor:theme.colors.secondary+(img ? '90' : '')},]}>
                        <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
                            <Text style={{color:"white"}} h3>{heading}</Text>
                            {IconRight }
                        </View>
                        <Text style={{color:"white",marginTop:10,fontSize:17}} bold>{sub}</Text>     
                    </View>    
                </ImageBackground>
            </View>
        </View>  

        <View style={{marginTop:110}}>
            {children}  
        </View>
    </ScrollView>  
  )
}

const useStyles = makeStyles(theme => ({
    bg:{
        height:800,
        width:800,
        borderRadius:1000,
        position:'absolute',
        top:-600,
        flexDirection:"column",
        overflow:"hidden"
    },
    bgDesc:{
        flex:1,
        width:'100%',
        justifyContent:"flex-end",
        paddingBottom:100,
        alignItems:"center",
    },
    image:{
        width: '100%',
        flex: 1,
    }
}))