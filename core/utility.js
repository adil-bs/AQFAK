import { useNavigation } from "@react-navigation/native";
import { createContext } from "react";
import { Linking, PermissionsAndroid } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';

export const NewsContext = createContext()

export const getImageFromUser = async (selectImageUri) => {
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "This app needs access to your camera to take photos.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('Image picker error: ', response.error);
          } else {
            let imageUri = response.assets[0].uri;
            selectImageUri(imageUri);
          }
        });
      } else {
        console.log(granted);
        Alert.alert(
          "Permission Required",
          "Camera permission is required to use this feature. Please enable it in your phone settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() }
          ]
        );
      }
    } catch (err) {
      console.warn(err);
      Alert.alert(
        "Permission Required",
        "Camera permission is required to use this feature. Please enable it in your phone settings.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() }
        ]
      );
    }
  }
};

export function getRelativeTime(dateString) {
    const date = new Date(dateString); 
    const now = new Date(); 
    
    var elapsed = now - date; 
    
    const minute = 60*1000 ;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;
 
    let relativeTime;
    if (elapsed<0)
      return new Date(dateString)
      .toLocaleDateString('en-US', {month:'short',day:'numeric',hour:"numeric",minute:"numeric",hour12:"true"}); 
    else if (elapsed < minute) 
      relativeTime =  Math.round(elapsed/1000) + ' second';
    else if (elapsed < hour) 
      relativeTime = Math.round(elapsed / minute) + ' minute';
    else if (elapsed < day) 
      relativeTime = Math.round(elapsed / hour) + ' hour';
    else if (elapsed < month) 
      relativeTime = Math.round(elapsed / day) + ' day';
    else if (elapsed < year) 
      relativeTime = Math.round(elapsed / month) + ' month';
    else 
      return new Date(dateString)
      .toLocaleDateString(undefined, {year:'numeric',month:'long',day:'numeric'}); 

    return relativeTime + (relativeTime.startsWith('1 ') ? ' ago' : 's ago') 
}


export function camelToCapital(camelCaseVariable) {
  if (!camelCaseVariable )
    return camelCaseVariable
  return camelCaseVariable
    .split(/(?=[A-Z])|_+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}


export const weatherCode = {
  "0"   : "Unknown",
  "1000": {
    img:require('../assets/weatherIcons/1000.png'),
    name:"Clear, Sunny"
  },
  "1100": {
    img:require('../assets/weatherIcons/1100.png'),
    name:"Mostly Clear"
  },
  "1101": {
    img:require('../assets/weatherIcons/1101.png'),
    name:"Partly Cloudy"
  },
  "1102": {
    img:require('../assets/weatherIcons/1102.png'),
    name:"Mostly Cloudy"
  },
  "1001": {
    img:require('../assets/weatherIcons/1001.png'),
    name:"Cloudy"
  },
  "2000": {
    img:require('../assets/weatherIcons/2000.png'),
    name:"Fog"
  },
  "2100": {
    img:require('../assets/weatherIcons/2100.png'),
    name:"Light Fog"
  },
  "4000": {
    img:require('../assets/weatherIcons/4000.png'),
    name:"Drizzle"
  },
  "4001": {
    img:require('../assets/weatherIcons/4001.png'),
    name:"Rain"
  },
  "4200": {
    img:require('../assets/weatherIcons/4200.png'),
    name:"Light Rain"
  },
  "4201": {
    img:require('../assets/weatherIcons/4201.png'),
    name:"Heavy Rain"
  },
  "5000": {
    img:require('../assets/weatherIcons/5000.png'),
    name:"Snow"
  },
  "5001": {
    img:require('../assets/weatherIcons/5001.png'),
    name:"Flurries"
  },
  "5100": {
    img:require('../assets/weatherIcons/5100.png'),
    name:"Light Snow"
  },
  "5101": {
    img:require('../assets/weatherIcons/5101.png'),
    name:"Heavy Snow"
  },
  "6000": {
    img:require('../assets/weatherIcons/6000.png'),
    name:"Freezing Drizzle"
  },
  "6001": {
    img:require('../assets/weatherIcons/6001.png'),
    name:"Freezing Rain"
  },
  "6200": {
    img:require('../assets/weatherIcons/6200.png'),
    name:"Light Freezing Rain"
  },
  "6201": {
    img:require('../assets/weatherIcons/6201.png'),
    name:"Heavy Freezing Rain"
  },
  "7000": {
    img:require('../assets/weatherIcons/7000.png'),
    name:"Ice Pellets"
  },
  "7101": {
    img:require('../assets/weatherIcons/7101.png'),
    name:"Heavy Ice Pellets"
  },
  "7102": {
    img:require('../assets/weatherIcons/7102.png'),
    name:"Light Ice Pellets"
  },
  "8000": {
    img:require('../assets/weatherIcons/8000.png'),
    name:"Thunderstorm"
  },
}
export const weatherUnits = {
  cloudBase:{
    unit:'m',
    availability: ['Avg','Min','Max'],
  },
  cloudCeiling:{
    unit:'m',
    availability: ['Avg','Min','Max'],
  },
  cloudCover:{
    unit:'okta',
    availability: ['Avg','Min','Max'],
  },
  dewPoint:{
    unit:'°C',
    availability: ['Avg','Min','Max'],
  },
  evapotranspiration:{
    unit:'mm/day',
    availability: ['Avg','Min','Max','Sum'],
  },
  freezingRainIntensity:{
    unit:'mm/h',
    availability: ['Avg','Min','Max'],
  },
  humidity:{
    unit:'%',
    availability: ['Avg','Min','Max'],
  },
  iceAccumulation:{
    unit:'mm',
    availability: ['Avg','Min','Max','Sum'],
  },
  iceAccumulationLwe:{
    unit:'mm',
    availability: ['Avg','Min','Max','Sum'],
  },
  precipitationProbability:{
    unit:'',
    availability: ['Avg','Min','Max'],
  },
  pressureSurfaceLevel:{
    unit:'hPa',
    availability: ['Avg','Min','Max'],
  },
  rainAccumulation: {
    unit:'mm',
    availability: ['Avg','Min','Max','Sum'],
  },
  rainAccumulationLwe: {
    unit:'mm',
    availability: ['Avg','Min','Max'],
  },
  rainIntensity:{
    unit:'mm/h',
    availability: ['Avg','Min','Max'],
  },
  sleetAccumulation:{
    unit:'mm',
    availability: ['Avg','Min','Max'],
  },
  sleetAccumulationLwe:{
    unit:'mm',
    availability: ['Avg','Min','Max','Sum'],
  },
  sleetIntensity:{
    unit:'mm/h',
    availability: ['Avg','Min','Max'],
  },
  snowAccumulation:{
    unit:'mm',
    availability: ['Avg','Min','Max'],
  },
  snowAccumulationLwe:{
    unit:'mm',
    availability: ['Avg','Min','Max','Sum'],
  },
  snowDepth:{
    unit:'cm',
    availability: ['Avg','Min','Max','Sum'],
  },
  snowIntensity:{
    unit:'mm/h',
    availability: ['Avg','Min','Max'],
  },
  temperatureApparent:{
    unit:'°C',
    availability: ['Avg','Min','Max'],
  },
  temperature:{
    unit:'°C',
    availability: ['Avg','Min','Max'],
  },
  uvHealthConcern:{
    unit:'',
    availability: ['Avg','Min','Max'],
  },
  uvIndex:{
    unit:'',
    availability: ['Avg','Min','Max'],
  },
  visibility:{
    unit:'m',
    availability: ['Avg','Min','Max'],
  },
  windDirection:{
    unit:'°',
    availability: ['Avg',],
  },
  windGust:{
    unit:'m/s',
    availability: ['Avg','Min','Max'],
  },
  windSpeed:{
    unit:'m/s',
    availability: ['Avg','Min','Max'],
  },
}