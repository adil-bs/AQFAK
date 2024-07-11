import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, FlatList, TouchableWithoutFeedback, Keyboard } from "react-native";
import IconButton from 'react-native-vector-icons/FontAwesome';
import { Component, useContext, useState, } from "react";
import { List, ProgressBar, MD3Colors, Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Add from '../components/add'
import { LinearGradient } from 'react-native-linear-gradient'
import { AuthContext } from "../core/navigators";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND } from "../core/var";


const CropEdits = ({ route }) => {
    const { userDeta : userInfo } = route.params;
    const {dispatchLoggedState} = useContext(AuthContext)
    const [crops, setCrops] = useState([])

    const [crop, setCrop] = useState("");
    const [stage, setStage] = useState("");
    const [area, setArea] = useState("");


    const handleAdd = () => {
        if (crop && area && stage) {
            setCrops([...crops, { crop: crop, stage: stage, area: area }])
        }
        setCrop('')
        setArea('')
        setStage('')
        
    }

    const handleSubmit = async ()=> {
        try {
            console.log("userInfo ",crops);
            const response = await fetch(BACKEND+'auth/signup/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
                // 'X-CSRFToken': csrfToken
              },
              body: JSON.stringify({userInfo:userInfo, crops:crops})
            });
      
            const data = await response.json();
            console.log('Server Response:', data);
            if (data === "data created") {
                dispatchLoggedState({type:"userLogin"})    
                AsyncStorage.setItem('AQFAK_USER',userInfo.userId)
                console.log("created")
            } else { 
                console.log('data received but something happen');
            }
          } catch (error) {
            console.error('Error in fetch post:', error);
        }
    }

    const navigation = useNavigation();

    console.log(userInfo)
    console.log(crops)

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            
                <View style={styles.container}>

                    
                    <View style={styles.ip}>
                    <Text style={styles.head}>Add crops</Text>
                        <View>
                            <Text style={styles.text}>Crop</Text>
                            <TextInput style={styles.input} placeholder="Crop name" value={crop} onChangeText={text => setCrop(text)}></TextInput>
                        </View>
                        <View style={{ height: 15 }}></View>
                        <View>
                            <Text style={styles.text}>Stage</Text>
                            <TextInput style={styles.input} placeholder="Select stage " value={stage} onChangeText={text => setStage(text)}></TextInput>
                        </View>
                        <View style={{ height: 15 }}></View>
                        <View>
                            <Text style={styles.text}>Area</Text>
                            <TextInput style={styles.input} placeholder="Select area " value={area} onChangeText={text => setArea(text)}></TextInput>
                        </View>
                        <View style={{ height: 15 }}></View>
                        <TouchableOpacity style={styles.submit} onPress={handleAdd} >
                            <Text style={styles.text}>Add crop</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{}}>
                    <Text>Added crops</Text>
                    </View>
                   

                    <FlatList data={crops} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => (
                        
                        <View style={styles.con}>
                            <Text style={styles.text}>Crop: {item.crop}</Text>
                            <Text style={styles.text}>Stage: {item.stage}</Text>
                        </View>
                    )} />

                    

                    <TouchableOpacity 
                        style={styles.submit}
                        onPress={handleSubmit} 
                    >
                        <Text style={styles.text}>Continue</Text>
                    </TouchableOpacity>
                </View>
            

        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flexDirection: "column",
        gap: 30,
        alignItems: 'center',
        paddingBottom: 70,
        backgroundColor: "white",
        justifyContent: 'space-around',
        padding: 10,
        paddingTop:20,

    },
    ip:{
        borderColor:'black',
        borderWidth:.5,
        // backgroundColor:'grey',
        height:'55%',
        width:'86%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
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
    input: {
        padding: 5,
        width: 318,
        height: 55,
        borderRadius: 10,
        backgroundColor: 'rgba(242, 245, 240, 1)',
        color: "black",
    },
    con: {
        flexDirection: 'row',
        marginVertical: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        width: 318,
        height: 55,
        borderRadius: 10,
        backgroundColor:'rgba(242, 245, 240, 1)' ,
        color: "black",
    },
    submit: {
        alignItems: 'center',
        
        justifyContent: 'center',
        width: 318,
        height: 55,
        borderRadius: 10,
        backgroundColor: '#80e51a',
    },
    social: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 318,
        height: 55,
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 1,
        backgroundColor: "white",
        borderColor: '#228b22',
    },
    containerStyle: {
        backgroundColor: '#2e8b57', padding: 20,
        width: '90%', height: '60%', borderRadius: 20,
        alignSelf: 'center'
    }, text: {
        color: "black"
    }
})

export default CropEdits;

























