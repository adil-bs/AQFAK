import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '@rneui/themed';

const Register1 = ({ route }) => {
  const { userData } = route.params;
  const [userInfo, setUserInfo] = useState({ ...userData });
  const [nn, setNn] = useState(null);
  const [place, setPlace] = useState(null);
  const navigation = useNavigation();

  const handleSubmit = useCallback(() => {
    if (!(nn && place)) return ; 
    setUserInfo({ ...userInfo, nickname: nn, place: place });
    navigation.navigate('register2', { userDeta: { ...userInfo, nickname: nn, place: place } });
  }, [userInfo, nn, place, navigation]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1,marginBottom:60, }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>

            <View style={{ width: '100%', gap: 10, alignItems: 'center', paddingTop: 5 }}>
                <Text style={styles.head}>Welcome to Agri</Text>
                <Text style={{ color: 'black', paddingLeft: 10, fontWeight: 'bold', fontSize: 20 }}>Create Account(1/2) {userInfo.name}</Text>
            </View>
            <View style={styles.img}>
                <Image style={styles.img} source={require('../assets/Designer.png')} />
            </View>
            <View style={{ gap: 10, width: '90%',marginTop:30, }}>
              <Text style={[styles.head,{marginBottom:20}]}>First, let's get to know each other.</Text>
              <Input floatingLabel placeholder="Name" value={nn}  onChangeText={text => setNn(text)} />
              <Input floatingLabel placeholder="Place" value={place} onChangeText={text => setPlace(text)} />
            </View>
            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
              <Text style={styles.text}>Continue</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    alignItems: 'center',
  },
  head: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'serif',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
  img: {
    height: 230,
    width: '100%',
    marginTop:10,
  },
  submit: {
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'center',
    width: 318,
    height: 55,
    borderRadius: 10,
    backgroundColor: '#80e51a',
  },
});

export default Register1;

// import { View, Text, StyleSheet, TouchableOpacity, TextInput,Image, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
// import { useState, useCallback } from "react";
// import { useNavigation } from '@react-navigation/native';
// import { Input } from "@rneui/themed";

// const Register1 = ({ route }) => {
//     let { userData } = route.params;
//     let [userInfo, setUserInfo] = useState({ ...userData });
//     let [nn, setNn] = useState('');
//     let [place, setPlace] = useState('');
//     const navigation = useNavigation();


//     const handleSubmit = useCallback(() => {

//         setUserInfo({ ...userInfo, nickname: nn, place: place });
//         navigation.navigate('register2', { userDeta: { ...userInfo, nickname: nn, place: place } });
//     }, [userInfo, nn, place, navigation]);


//     return (
//         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         <KeyboardAvoidingView behavior={Platform.OS==='ios' ? 'padding' :'height'} style={{flex:1}}>
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
//             <View style={styles.container}>
//                 <View style={{ width: '100%', gap: 10, alignItems: 'center', paddingTop: 5 }}>
//                     <Text style={styles.head}>Welcome to Agri</Text>
//                     <Text style={{ color: 'black', paddingLeft: 10, fontWeight: 'bold', fontSize: 20 }}>Create Account(1/3) {userInfo.name}</Text>
                    
//                 </View>

//                 <View style={styles.img}>
//                     <Image
//                         style={styles.img}
//                         source={require('../assets/Designer.png')}
//                     />

                    
//                 </View>

//                 {/* <KeyboardAvoidingView behavior={Platform.OS==='ios' ? 'padding' :'height'} style={{width:"100%"}} > */}
//                 <View style={{   gap:30, width:"90%"}} >
//                     <Text style={styles.head}>First, let's get to know each other.</Text>
//                     {/* <View> */}
//                         {/* <Text style={styles.text}>Name</Text> */}
//                         {/* <TextInput style={styles.input} placeholderTextColor={'gray'} placeholder="Farmer name" onChangeText={text => setNn(text)}></TextInput> */}
//                     {/* </View> */}
//                         <Input containerStyle={styles.input} placeholder="Farmer name" label={'Name'} onChangeText={text => setNn(text)}/>
//                         <Input containerStyle={styles.input} placeholder="City,area " label={'Place'} onChangeText={text => setNn(text)}/>
//                     {/* <View>
//                         <Text style={styles.text}>Place</Text>
//                         <TextInput style={styles.input} placeholderTextColor={'gray'} placeholder="City,area " onChangeText={text => setPlace(text)}></TextInput>
//                     </View>     */}
                    
//                 </View>
//                 {/* </KeyboardAvoidingView> */}

//                 <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
//                     <Text style={styles.text}>Continue</Text>
//                 </TouchableOpacity>
//             </View>
//         </TouchableWithoutFeedback>
//         </KeyboardAvoidingView>
//         </ScrollView>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         width:'100%',
//         flex:1,
//         flexDirection: "column",
//         gap: 30,
//         alignItems: 'center',
//         paddingBottom: 70,
//         backgroundColor: "white",
//         // justifyContent: 'space-evenly',

//     },
//     head: {

//         height: 30,
//         fontSize: 20,
//         // fontStyle: "italic",
//         lineHeight: 30,
//         textAlign: "center",
//         color: "#000000",
//         fontFamily: "serif",
//         fontWeight: 'bold',
//     },
//     text: {
//         color: "#000000",
//         // fontFamily: "serif",
//         fontWeight: 'bold',

//     },
//     img: {
//         height: 230,
//         width: '100%'
//     },
//     input: {
//         borderRadius: 10,
//         backgroundColor: 'rgba(242, 245, 240, 1)',
//     },
//     cd: {
//         gap: 10,
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 5,
//         paddingTop: 2,
//     },
//     ci: {
//         padding: 5,
//         width: 170,
//         height: 50,
//         borderRadius: 10,
//         backgroundColor: "darkgrey",
//         color: "black",
//     },
//     submit: {
        
//         alignItems: 'center',
//         marginTop:30,
//         justifyContent: 'center',
//         width: 318,
//         height: 55,
//         borderRadius: 10,
//         backgroundColor: '#80e51a',
       
//     }, text: {
//         color: "black"
//     }
// })

// export default Register1;
