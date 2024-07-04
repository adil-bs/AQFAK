import { View, Text, StyleSheet, TouchableOpacity, TextInput,Image, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import IconButton from 'react-native-vector-icons/FontAwesome';
import { useState, useCallback } from "react";
import { List, ProgressBar, MD3Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { LinearGradient } from 'react-native-linear-gradient'

const Register1 = ({ route }) => {
    let { userData } = route.params;
    let [userInfo, setUserInfo] = useState({ ...userData });
    let [nn, setNn] = useState('');
    let [place, setPlace] = useState('');
    const navigation = useNavigation();


    const handleSubmit = useCallback(() => {

        setUserInfo({ ...userInfo, nickname: nn, place: place });
        navigation.navigate('register2', { userDeta: { ...userInfo, nickname: nn, place: place } });
    }, [userInfo, nn, place, navigation]);


    return (
        // <KeyboardAvoidingView behavior={Platform.OS==='ios' ? 'padding' :'height'} style={{flex:1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={{ width: '100%', gap: 10, alignItems: 'center', paddingTop: 5 }}>
                    <Text style={styles.head}>Welcome to Agri</Text>
                    <Text style={{ color: 'black', paddingLeft: 10, fontWeight: 'bold', fontSize: 20 }}>Create Account(1/3) {userInfo.name}</Text>
                    
                </View>

                <View style={styles.img}>
                    <Image
                        style={styles.img}
                        source={require('../assets/Designer.png')}
                    />

                    
                </View>

                <View style={{  alignItems: 'center', gap:30}} >
                    <Text style={styles.head}>First, let's get to know each other.</Text>
                    <View>
                        <Text style={styles.text}>Name</Text>
                        <TextInput style={styles.input} placeholder="Farmer name" onChangeText={text => setNn(text)}></TextInput>
                    </View>
                    <View>
                        <Text style={styles.text}>Place</Text>
                        <TextInput style={styles.input} placeholder="City,area " onChangeText={text => setPlace(text)}></TextInput>
                    </View>    
                    
                </View>

                <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                    <Text style={styles.text}>Continue</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
        // </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: "column",
        gap: 30,
        alignItems: 'center',
        paddingBottom: 70,
        backgroundColor: "white",
        // justifyContent: 'space-evenly',

    },
    head: {

        height: 30,
        fontSize: 20,
        // fontStyle: "italic",
        lineHeight: 30,
        textAlign: "center",
        color: "#000000",
        fontFamily: "serif",
        fontWeight: 'bold',
    },
    text: {
        color: "#000000",
        // fontFamily: "serif",
        fontWeight: 'bold',

    },
    img: {
        height: 230,
        width: '100%'
    },
    input: {
        padding: 5,
        width: 318,
        height: 55,
        borderRadius: 10,
        backgroundColor: 'rgba(242, 245, 240, 1)',
        color: "black",

    },
    cd: {
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        paddingTop: 2,
    },
    ci: {
        padding: 5,
        width: 170,
        height: 50,
        borderRadius: 10,
        backgroundColor: "darkgrey",
        color: "black",
    },
    submit: {
        
        alignItems: 'center',
        marginTop:30,
        justifyContent: 'center',
        width: 318,
        height: 55,
        borderRadius: 10,
        backgroundColor: '#80e51a',
       
    }, text: {
        color: "black"
    }
})

export default Register1;
















// return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <LinearGradient
//             colors={['#90EE90', '#009030']}
//             style={styles.container}
//         >
//             <View style={{ width: '100%', gap: 20 }}>
//                 <Text style={styles.head}>Welcome to Agri</Text>
//                 <Text style={{ color: 'black', paddingLeft: 10, }}>User : {userInfo.name}</Text>
//                 <ProgressBar progress={0.5} color='#009030' />
//             </View>

//             <View style={{ gap: 10 }}>
//                 <TextInput style={styles.input} placeholder="Enter your nick name" onChangeText={text => setNn(text)}></TextInput>
//                 <TextInput style={styles.input} placeholder="Enter your place" onChangeText={text => setPlace(text)}></TextInput>
//             </View>


//             <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
//                 <Text style={styles.text}>Continue</Text>
//             </TouchableOpacity>
//         </LinearGradient>
//     </TouchableWithoutFeedback>
// )
// }

// const styles = StyleSheet.create({
// container: {
//     width: "100%",
//     height: "100%",
//     flexDirection: "column",
//     gap: 30,
//     alignItems: 'center',
//     paddingBottom: 70,
//     backgroundColor: "white",
//     justifyContent: 'space-evenly'
// },
// head: {
//     width: 200,
//     height: 30,
//     fontSize: 25,
//     fontStyle: "italic",
//     lineHeight: 30,
//     textAlign: "center",
//     color: "#000000",
//     fontFamily: "serif"
// },
// input: {
//     padding: 5,
//     width: 318,
//     height: 55,
//     borderRadius: 10,
//     backgroundColor: "darkgrey",
//     color: "black",

// },
// cd: {
//     gap: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 5,
//     paddingTop: 2,
// },
// ci: {
//     padding: 5,
//     width: 170,
//     height: 50,
//     borderRadius: 10,
//     backgroundColor: "darkgrey",
//     color: "black",
// },
// submit: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 100,
//     height: 50,
//     borderRadius: 10,
//     backgroundColor: "#009030"
// }, text: {
//     color: "black"
// }
// })

// export default Register1;