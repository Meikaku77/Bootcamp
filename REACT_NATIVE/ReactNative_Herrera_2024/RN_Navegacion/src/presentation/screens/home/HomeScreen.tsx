import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { globalStyles } from '../../theme/theme'
import { type NavigationProp, useNavigation } from '@react-navigation/native'
import { PrimaryButton } from '../../components/shared/PrimaryButton'
import type {RootstackParams } from '../../routes/StackNavigator'

export const HomeScreen = () => {
  
  const navigation = useNavigation<NavigationProp<RootstackParams>>()
  
  return (
    <View style={globalStyles.container} >
      <PrimaryButton label={"Products"} onPress={()=> navigation.navigate("Products")} />
      <PrimaryButton label={"Settings"} onPress={()=> navigation.navigate("Settings")} />
    </View>
  )
}