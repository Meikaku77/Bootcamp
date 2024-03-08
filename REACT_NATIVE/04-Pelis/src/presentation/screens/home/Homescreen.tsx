import React from 'react'
import { Text, View } from 'react-native'
import useMovies from '../../hooks/useMovies'


export const HomeScreen  = () => {

const {nowPlaying, upcomingMovie,topRatedMovie, popularMovie} = useMovies()

console.log({
  nowPlaying,upcomingMovie,topRatedMovie,popularMovie
})

  
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}