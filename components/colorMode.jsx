import { Icon,useThemeMode,useTheme } from '@rneui/themed'
import React from 'react'

const ColorMode = (props) => {
  const {mode,setMode} = useThemeMode()
  const {theme} = useTheme()
  return (
    <Icon 
      name={mode === 'light' ? "moon" : "sunny" }
      size={20} 
      type={"ionicon"} 
      onPress={() => setMode(mode === 'light' ? 'dark' : 'light')}
      containerStyle={{marginRight:20}}
    />
  )
}

export default ColorMode