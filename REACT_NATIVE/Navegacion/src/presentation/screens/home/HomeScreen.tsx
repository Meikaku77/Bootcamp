import React, { useEffect } from 'react'
import { Pressable, Text, View, useWindowDimensions } from 'react-native'
import { globalStyles } from '../../theme/theme'
import { type NavigationProp, useNavigation, DrawerActions } from '@react-navigation/native'
import { PrimaryButton } from '../../components/shared/PrimaryButton'
import type {RootstackParams } from '../../routes/StackNavigator'

export const HomeScreen = () => {
  
  const navigation = useNavigation<NavigationProp<RootstackParams>>()
  const dimensions = useWindowDimensions()

   useEffect(() => {
      navigation.setOptions({
          headerLeft:()=>( 
              <Pressable onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer)}>
              <Text style={{paddingLeft: 10}}>Menu</Text> 
              </Pressable>  
          )
        })
   
  }, []) 
  
  
  return (
    <View style={globalStyles.container} >
      <PrimaryButton label={"Products"} onPress={()=> navigation.navigate("Products")} />
      <PrimaryButton label={"Settings"} onPress={()=> navigation.navigate("Settings")} />
    </View>
  )
}