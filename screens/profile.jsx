import { StyleSheet, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Dialog, Text } from '@rneui/themed'
import { BACKEND } from '../core/var';
import { AuthContext } from '../core/navigators';
import { ErrorDialog } from '../components/sadPaths';

export default function Profile() {
  const {dispatchLoggedState} = useContext(AuthContext)
  const [logoutLoading,setLogoutLoading] = useState(false)
  const [error,setError] = useState({ocurred:false,msg:''})

  const handleLogout = () => {
    setLogoutLoading(true)
    fetch(BACKEND + 'auth/signout/')
      .then(res => res.json())
      .then(data => {
        if (data === 'logged out'){
          dispatchLoggedState({ type: 'logout' })
        }
      })
      .catch((err) => {
        console.log('Error in logout : ',err.message)
        setError({ocurred:true,msg:"Error ocurred while logging out. Please try again later."})
      })
      .finally(() => setLogoutLoading(false))
  }
  
  return (
    <View>
      <Text>Profile</Text>
      <Button
        title={'LOGOUT'}
        containerStyle={{
          width: 140,
          marginHorizontal: 20,
          marginVertical: 20,
          borderRadius:10,
          borderColor:'pink',
          borderWidth:3,
        }}
        titleStyle={{
          fontWeight:'bold',
          marginHorizontal:15,
        }}
        color={'red'}
        onPress={handleLogout}
        icon={{name:'logout',color:'white'}}
        iconRight
        loading={logoutLoading}
        disabled={logoutLoading}
        disabledStyle={{backgroundColor:'gray'}}
      />
      <ErrorDialog 
        open={error.ocurred}
        close={()=>setError({ocurred:false,msg:''})}
        msg={error.msg}
      />
    </View>
  )
}

const styles = StyleSheet.create({})