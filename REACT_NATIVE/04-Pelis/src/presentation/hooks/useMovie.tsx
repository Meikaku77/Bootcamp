import React, { useEffect, useState } from 'react'
import * as UseCase from '../../core/use-cases'
import { FullMovie } from '../../core/entities/movie.entity'
import { fullMovieAdapter } from '../../config/adapters/http/fullMovie.adapter'

const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(true)
  const [fullMovie, setFullMovie] = useState<FullMovie>()

  useEffect(()=>{
    loadMovie()
  
},[movieId])

  const loadMovie = async()=>{
    setIsLoading(true)

    const fullMovieResult = await UseCase.getMovieUseCase(fullMovieAdapter, movieId)
    setFullMovie(fullMovieResult)
    setIsLoading(false)
  }
  
    return {
      isLoading,
      fullMovie
    }
}

export default useMovie