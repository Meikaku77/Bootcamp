import React from 'react'
import { Text, View } from 'react-native'
import useMovies from '../../hooks/useMovies'
import useUpcoming from '../../hooks/useUpcoming'
import usePopular from '../../hooks/usePopular'
import useTopRated from '../../hooks/useTopRated'

export const HomeScreen  = () => {

  //const {} = useMovies()
  //const {} = useUpcoming()
  //const {} = usePopular()

  const {} = useTopRated()

  
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}