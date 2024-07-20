import { View, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import {  useContext, useEffect, useState, } from "react";
import { AuthContext } from "../core/navigators";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Dialog, Icon, Input, ListItem, Text, Tooltip } from "@rneui/themed";
import { fetchApiCall } from "../core/api";


const CropListItem = ({item,handleDelete}) => {
    return(
        <ListItem containerStyle={styles.con} >
            <ListItem.Content>
                <ListItem.Title style={{fontSize:22,fontWeight:"bold"}}>{item?.crop || item?.name}</ListItem.Title>
                <ListItem.Subtitle style={{fontSize:17}}>{item?.stage}</ListItem.Subtitle>
                <ListItem.Subtitle style={{fontStyle:"italic"}}>{item?.area}</ListItem.Subtitle>
            </ListItem.Content>

            <Icon name="edit"/>
            <Icon name="delete" onPress={handleDelete}/>
        </ListItem>
    )
}
const CropEdits = ({route,navigation}) => {
    const {role} = route.params
    console.log(role);
    const {loggedState :{token}} = useContext(AuthContext)
    const {dispatchLoggedState} = useContext(AuthContext)
    // const [crops, setCrops] = useState([{"area": "Hsshhs", "crop": "Hshshsh", "stage": "Hdhssjhs"}, {"area": "Susuus", "crop": "Bsjsjs", "stage": "Shshjs"}, {"area": "Ssss", "crop": "Shshs", "stage": "Sss"}, {"area": "Ddd", "crop": "Ddd", "stage": "Ddd"}, {"area": "Hdhd", "crop": "Fkht", "stage": "Gg"}, {"area": "Ssd", "crop": "Bdhd", "stage": "Syys"}])
    const [crops, setCrops] = useState([])
    const [inputCrop, setInputCrop] = useState({crop:'',stage:'',area:''})

    useEffect(()=>{
        fetchApiCall('auth/list_create_crop/',{
            headers: {"Authorization" : token},
        })
          .then(data => {setCrops(data)})
          .catch(err => console.error('err : ',err)) 
    },[])
    const handleInputCropChange = (key,text) => {
        setInputCrop(prev => ({
            ...prev,
            [key]:text.trim(),
        }))
    }

    const handleAdd = () => {
        if (Object.values(inputCrop).some(val => !val)) return

        setCrops([inputCrop,...crops ])
        setInputCrop({crop:'',stage:'',area:''})
    }
    const handleDelete = (cropItem) => {
        setCrops(prev => prev.filter(item => item !== cropItem))
    }

    const handleSubmit = async ()=> {
        try {
            console.log("userInfo ",crops);
            const data = await fetchApiCall('auth/list_create_crop/',{
                method:'POST',body: JSON.stringify({crops:crops}),
                headers: {"Authorization" : token},
            })
            console.log('Server Response:', data);
            if (data.data === "crops created") {
                if(role === 'edit'){
                    Alert.alert('Crops are added')
                    navigation.navigate('HomeIndex',{shouldRefresh : (new Date()).toDateString()})
                }else{
                    dispatchLoggedState({type:"userLogin"})    
                }
            } else { 
                console.log('data received but something happen');
            }
          } catch (error) {
            console.error('Error in crops post:', error);
        }
    }

    console.log(crops)

    return (
        <View style={[styles.container,{paddingBottom:role === 'edit' ? 20 : 70}]}>
                    
            <View style={styles.ip}>
                <Text style={styles.head}>Add crops</Text>
                {Object.keys(inputCrop).map(ele =>
                    <Input 
                        key={ele}
                        floatingLabel 
                        placeholderTextColor={'gray'} 
                        placeholder={"Crop " + ele==='crop' ? 'name' : ele} 
                        value={inputCrop[ele]} 
                        onChangeText={text => handleInputCropChange(ele,text)}
                    />
                )}
                        
                <Button title={'Add Crop'} containerStyle={styles.submit} onPress={handleAdd}/>
            </View>

            {crops.length!==0 ?
            <>
                <View style={styles.cropsHeaderContainer}>
                    <Text bold style={{fontSize:20}}>Your Crops</Text>
                </View> 
                    
                <FlatList 
                    keyExtractor={(_,index) => index.toString()} 
                    data={crops} 
                    extraData={crops}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={<View style={{margin:3}}/>}
                    renderItem={({ item }) => <CropListItem item={item} handleDelete={()=>handleDelete(item)}/>} 
                />
            </>
            :                    
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Your added Crops will appear here</Text>
            </View>
            }
                    
            <Button 
                title={role === 'edit' ?'Save changes' : 'Continue'} 
                onPress={handleSubmit} 
                containerStyle={styles.continue}
            />
        </View>
            
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        gap: 30,
        alignItems:"center",
        justifyContent: 'space-around',
        paddingTop:20,
    },
    cropsHeaderContainer:{
        marginBottom:-30,
        marginTop:-15,
        width:"80%",
        padding:10,
        backgroundColor:"#DFF3CB",
        borderTopEndRadius:15,
        borderTopStartRadius:15,
        borderWidth:2,
        borderColor:"green",
    },
    ip:{
        borderColor:'black',
        borderWidth:.5,
        width:'90%',
        alignSelf:"center",
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        padding:20,
    },
    head: {
        height: 30,
        fontSize: 20,
        lineHeight: 30,
        textAlign: "center",
        color: "#000000",
        fontFamily: "serif",
        fontWeight: 'bold',
    },
    input: {
        padding: 5,
        paddingHorizontal:18,
        width: 318,
        height: 55,
        borderRadius: 10,
        backgroundColor: 'rgba(242, 245, 240, 1)',
        color: "black",
    },
    con: {
        width: 318,
        borderRadius: 8,
        backgroundColor:'lightblue' ,
    },
    submit: {
        width: '100%',
        borderRadius: 10,
    },
    continue: {
        width: '80%',
        borderRadius: 10,
    },
    emptyText: {
        textAlign:"center",
        fontSize:30,
        fontWeight:"bold",
        color:"gray",
    },
    emptyContainer:{
        flex:1,
        justifyContent:"center",
    },
    containerStyle: {
        backgroundColor: '#2e8b57', padding: 20,
        width: '90%', height: '60%', borderRadius: 20,
        alignSelf: 'center'
    }
})

export default CropEdits;

























