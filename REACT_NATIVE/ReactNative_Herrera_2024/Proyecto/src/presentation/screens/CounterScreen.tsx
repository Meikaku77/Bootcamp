import React, { useState } from 'react'
import { Button, Platform, Pressable, StyleSheet, Text, View} from 'react-native'

export const CounterScreen = () => {

  const [counter, setCounter] = useState(10)


  const increment = ()=> {
    setCounter(counter +1)
  }

  const decrement = ()=> {
    setCounter(counter -1)
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Counter: {counter}</Text>

        <Pressable 
        style={({pressed})=>[
            styles.button,
            pressed && styles.buttonPressed]} 
            onPress={increment}>
             <Text style={styles.buttonText}>Increment</Text>
        </Pressable>
        <Pressable 
        style={({pressed})=>[
            styles.button,
            pressed && styles.buttonPressed]} 
            onPress={decrement} onLongPress={()=>setCounter(0)}>
          <Text style={styles.buttonText}>Decrement</Text>
        </Pressable>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    fontSize: 45,
    color:'black',
    fontWeight: '300'
  },
  button:{
    backgroundColor: 'purple',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10
  },
  buttonText:{
    fontSize: 25,
    color: 'white'
  },
  buttonPressed:{
    backgroundColor: Platform.OS === 'android' ?'rgb(126, 0, 78)': 'white'
  }
})







