
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { styles } from '../../config/appTheme'
import { useProfileStore } from '../store/profile-store'

export const ProfileScreen  = () => {

  const name = useProfileStore(get=> get.name)
  const email = useProfileStore(get=> get.email)

  return (
    <View style={styles.container} >
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>{email}</Text>

      <Pressable style={styles.primaryButton} 
      onPress={()=>useProfileStore.setState({name: "Miguel Castaño"})}
      >
        <Text style={styles.title}>Cambio Nombre</Text>
      </Pressable>

      <Pressable style={styles.primaryButton} 
      onPress={()=> useProfileStore.setState({email: "migue@gmail.com"})}
      >
        <Text style={styles.title}>Cambio email</Text>
      </Pressable>
    </View>
  )
}