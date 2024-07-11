import { StyleSheet, View, TextInput, Button, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useContext, useEffect, useState } from "react";
import { SegmentedButtons } from "react-native-paper";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { LinearGradient } from 'react-native-linear-gradient'
import { AuthContext } from "../core/navigators";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND } from "../core/var";
import { Text } from "@rneui/themed";
import { ErrorDialog } from "../components/sadPaths";

const Login = ({ navigation }) => {
  const {dispatchLoggedState} = useContext(AuthContext)
  let [userInfo, setUserInfo] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [contact, setContact] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isUser, setIsUser] = useState('')
  const [userType, setUserType] = useState('user')

  const [isLoading,setIsLoading] = useState({google:false,facebook:false})
  const [error, setError] = useState({ocurred:false,msg:''})

  const postdata = async () => {
    try {
      // csrfToken ="0K9FOy7N5YRa6qbm3zg2Ii7EV9U5BDXvwnIDwK1EXBCzTGP3fgTxMDyB2dDskhyE"
      const response = await fetch(BACKEND+'auth/sign/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({ "user_id": userInfo.userId })
      });

      const data = await response.json();
      console.log('Server Response:', data);
      if (data === "true") {
        return "true";
      } else { return "false" }
    } catch (error) {
      console.error('Error in fetch post:', error);
      setError({ocurred:true,msg:error.message})
    }
  };


  useEffect(()=>{
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.email'],
      WebClientId: '1038003706590-g6m6ag7019na3i16u1slc24nqeif3m38.apps.googleusercontent.com',
    });
  },[]);
  
  useEffect(() => {
    if (isUser === 'true') {
      dispatchLoggedState({type:userType+'Login'})
      AsyncStorage.setItem('AQFAK_USER',userInfo.userId)
    } else if (isUser === 'false') {
      navigation.navigate("register1", { userData: userInfo })
    }
  }, [isUser]);


  const handleGSubmit = async () => {
    setIsLoading({...isLoading,google:true})
    try {
      await GoogleSignin.hasPlayServices();
      const userInfoDetail = await GoogleSignin.signIn();
      userInfo = {
        userType: userType,
        userId: userInfoDetail.user.email,
        name: userInfoDetail.user.name,
        photo: userInfoDetail.user.photo
      }
      setUserInfo(userInfo);



      setIsUser(await postdata())
      console.log("func isuser  ",isUser)


    } catch (error) {
      setError({ocurred:true,msg:error.message})
      console.error('Google Sign-In Error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.debug("can")
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.debug("progress")
      } else {
        console.debug("other",error.code)
      }
    }finally{
      setIsLoading({...isLoading,google:false})
    }

  }

  const handleFSubmit = async () => {
    setIsLoading({...isLoading,facebook:true})
    try{
      const result = await LoginManager.logInWithPermissions([]);
      // if (result.isCancelled) {
      //   throw new Error( 'User cancelled the login process');
      // }
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      const userCredential = await auth().signInWithCredential(facebookCredential);
      const facebookUserId = data.userID;
      const response = await fetch(`https://graph.facebook.com/${facebookUserId}?fields=id,name,picture.type(large)&access_token=${data.accessToken}`);

      if (!response.ok) {
        throw new Error( 'Failed to fetch user data from Facebook');
      }

      const userData = await response.json();

      userInfo = {
        userType: userType,
        userId: userData.name,
        photo: userData.picture.data.url
      }
      
      setUserInfo(userInfo)
      setIsUser(await postdata())
      console.log("func isuser  ",isUser)
    }catch(e){
      setError({ocurred:true,msg:e.message})
      console.log('error facebook logging : ',e);
    }finally{
      setIsLoading({...isLoading,facebook:false})
    }
  }


  async function signInWithPhoneNumber(phoneNumber) {
    setShowOtp(true);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }
  async function confirmCode(contact) {
    try {
      await confirm.confirm(code);
      console.log('good');
      userInfo = {
        userType: userType,
        userId: contact,
      }
      setUserInfo(userInfo)   
    } catch (error) {
      setError({ocurred:true,msg:'Invalid OTP'})
      console.log('Invalid code.');
    }finally{
      setShowOtp(false)
    }
  }



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container} >



        <SegmentedButtons
          theme={{ colors: { secondaryContainer: '#80e51a', outline: 'green' } }}
          style={styles.selector}
          value={userType}
          onValueChange={setUserType}
          buttons={[
            {
              value: 'user',
              label: 'User Login',
            },
            {
              value: 'expert',
              label: 'Expert Login',
            },

          ]}
        />

        <View style={{ alignItems: 'center' }}>
          <Text style={styles.head}>Login  or  Signup</Text>
          <Text style={{color:'black'}}>Join the Farming Community</Text>
        </View>


        <View style={styles.img}>
          <Image
            style={styles.img}
            source={require('../assets/Designer.png')}
          />


        </View>
        {!showOtp ? (
          <View style={{ gap: 10 }}>
            <TextInput style={styles.input} placeholder="phone no" value={contact} onChangeText={text => setContact(text)}></TextInput>
            <TouchableOpacity style={styles.submit} onPress={() => signInWithPhoneNumber(contact)}>
              <Text style={styles.text}>Continue</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ gap: 10 }}>
            <TextInput style={styles.input} placeholder="otp" value={code} onChangeText={text => setCode(text)}></TextInput>
            <TouchableOpacity style={styles.submit} onPress={() => confirmCode(contact)}>
              <Text style={styles.text}>otp</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ height: 1, backgroundColor: 'black', width: 318 }}>

        </View>


        <View style={{ gap: 10, }}>

          <TouchableOpacity style={[styles.social,isLoading.google ?{backgroundColor:'gray'} : styles.google]} onPress={handleGSubmit} disabled={isLoading.google}>
            <Icon name={isLoading.google ?"spinner" :"google"} size={26} color="black" />
            <Text bold style={{ color: "white" }} >Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.social,isLoading.facebook ?{backgroundColor:'gray'} : styles.facebook]} onPress={handleFSubmit} disabled={isLoading.facebook}>
            <Icon name={isLoading.facebook ?"spinner" :"facebook"} size={26} color="black" />
            <Text bold style={{ color: "white" }} >Continue with Facebook</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ color: 'black' }}>
            By signing in, I agree to Terms & Conditions
          </Text>
        </View>

        <ErrorDialog
          open={error.ocurred}
          close={()=>setError({ocurred:false,msg:''})}
          msg={error.msg}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingTop: 65,
    flexDirection: "column",
    gap: 35,
    alignItems: 'center',
    backgroundColor: "white",
  },
  selector: {
    width: "50%",
    height: 40,
    position: "absolute",
    marginTop: 10,
    paddingRight: 10,
    alignSelf: 'flex-end',
  },
  img: {
    height: 230,
    width: '100%',
    
  },
  head: {
    height: 30,
    fontSize: 27,
    fontStyle: "italic",
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
    color: "black"
  },
  submit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 318,
    height: 55,
    borderRadius: 10,
    backgroundColor: '#80e51a'
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
    borderColor: "rgba(0, 0, 0, 1.0)",
  },
  socialIcon:{
    transform:'spin'
  },
  google:{
    backgroundColor:'red',
  }, 
  facebook:{
    backgroundColor:'blue',
  },
  text: {
    color: "black"
  }


})

export default Login;