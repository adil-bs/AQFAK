import { StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Button, Dialog, Icon, Image, Input, Text } from '@rneui/themed'
import { BACKEND } from '../core/var';
import { AuthContext } from '../core/navigators';
import { ErrorDialog, LoadingPage } from '../components/sadPaths';
import { fetchApiCall } from '../core/api';
import { camelToCapital, getImageFromUser } from '../core/utility';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const {dispatchLoggedState,loggedState :{token}} = useContext(AuthContext)
  const [profile, setProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading,setLoading] = useState({edit:false, logout:false})
  const [error,setError] = useState({ocurred:false,msg:''})

  const profileTextInputArray = ['name','place','email']

  useEffect(()=>{
    fetchApiCall('auth/retreive_update_user/',{
      headers: {"Authorization" : token,},
    })
    .then(data => {
      setProfile(data.user)
    })
    .catch((err) => {
      console.log('Error in retrieving profile : ',err.message)
      setError({ocurred:true,msg:"Error ocurred while retrieving profile Info. Please try again later."})
    })
  },[])

  const handleTextInputChange = (e, inputType) => {
    setProfile(prev => ({
      ...prev,
      [inputType] : e.nativeEvent.text,
    }))
  }
  const handleImageInputChange = (imageUri) => {
    setProfile(prev => ({
      ...prev,
      profilePhoto : imageUri,
    }))
  }
  const handleEdit = () => {
    if (isEditing) {
      setLoading(prev => ({...prev, edit:true}))

      fetchApiCall('auth/retreive_update_user/',{
        method:"PUT",
        headers: {"Authorization" : token,},
        body: JSON.stringify(profile),
      })
      .then(data => {
        console.log('data : ',data);
        setProfile(data.user)
        AsyncStorage.setItem('AQFAK_USER',profile.email)
      })
      .catch((err) => {
        console.log('Error in updating profile : ',err.message)
        setError({ocurred:true,msg:"Error ocurred while updating profile Info. Please try again later."})
      })
      .finally(() => setLoading(prev => ({...prev, edit:false})))
    }
    setIsEditing(prev => !prev)
  }

  const handleLogout = () => {
    setLoading(prev => ({...prev, logout:true}))

    fetchApiCall('auth/signout/',{
      headers: {"Authorization" : token,},
    })
      .then(data => {
        if (data.detail === 'Successfully logged out'){
          dispatchLoggedState({ type: 'logout' })
        }
      })
      .catch((err) => {
        console.log('Error in logout : ',err.message)
        setError({ocurred:true,msg:"Error ocurred while logging out. Please try again later."})
      })
      .finally(() => setLoading(prev => ({...prev, logout:false})))
  }
  console.log(profile);
  return (
    profile ?
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Avatar
          size={130}
          rounded
          source={{ uri:  profile.profilePhoto }}
          title={profile.name.split(' ').map(word => word[0]?.toUpperCase()).join('')}
          containerStyle={{backgroundColor: 'purple', }}
        />
        {isEditing && <Icon containerStyle={styles.avatarEditIcon} name='edit' onPress={() => getImageFromUser(handleImageInputChange)} raised reverse />}
      </View>

      {profileTextInputArray.map((inputType) => (
        <Input 
          key={inputType} 
          nativeID={inputType}
          disabled={!isEditing} 
          floatingLabel 
          placeholder={camelToCapital(inputType)} 
          value={profile[inputType]}
          onChange={e => handleTextInputChange(e, inputType)}
        />
      ))}

      <Button
        title={isEditing ? 'APPLY' : 'EDIT'}
        onPress={handleEdit}
        containerStyle={styles.editContainer}
        titleStyle={styles.logoutTitle}
        iconRight
        icon={{name:isEditing ? 'done' : 'edit', color:'white'}}
        loading={loading.edit}
        disabled={loading.edit}
        disabledStyle={{backgroundColor:'gray'}}
      />
      <Button
        title={'LOGOUT'}
        containerStyle={styles.logoutContainer}
        titleStyle={styles.logoutTitle}
        color={'red'}
        onPress={handleLogout}
        icon={{name:'logout',color:'white'}}
        iconRight
        loading={loading.logout}
        disabled={loading.logout}
        disabledStyle={{backgroundColor:'gray'}}
      />
      <ErrorDialog 
        open={error.ocurred}
        close={()=>setError({ocurred:false,msg:''})}
        msg={error.msg}
      />
    </View>

    : <LoadingPage/>
  )
}

const styles = StyleSheet.create({
  container:{
    padding:30
  },
  avatar:{ 
    alignSelf:'center',
    marginBottom:40,  
  },
  avatarEditIcon:{
    position:"absolute",
    bottom:-10,
    right:-10,
    zIndex:999,
  },
  editContainer:{
    width: 140,
    borderRadius:10,
    borderColor:'green',
    borderWidth:3,
  },
  logoutContainer:{
    width: 140,
    marginVertical: 20,
    borderRadius:10,
    borderColor:'pink',
    borderWidth:3,
  },
  logoutTitle:{
    fontWeight:'bold',
    marginHorizontal:15,
  }
})