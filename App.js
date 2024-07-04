import { StyleSheet} from 'react-native';
import Login from './screens/login';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Register1 from './screens/register1';
import Profile from './screens/profile';
import Register2 from './screens/cropEdits';
import Home from './screens/home'

export default function App() {
  const Stack = createNativeStackNavigator();
  return (

    <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='login'>{(props)=> <Login {...props}/> }</Stack.Screen>
            <Stack.Screen name="profile">{(props)=> <Profile {...props}/> }</Stack.Screen>
            <Stack.Screen name="register1">{(props)=> <Register1 {...props}/> }</Stack.Screen>
            <Stack.Screen name="register2">{(props)=> <Register2 {...props}/> }</Stack.Screen>
            <Stack.Screen name="home">{(props)=> <Home {...props}/> }</Stack.Screen>
        </Stack.Navigator>    
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
