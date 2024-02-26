import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HelloWorldScreen = () => {
  return (
    <View>
        <Text>Hello World</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default HelloWorldScreen