import React, { useEffect, useState } from 'react'
import * as UseCase from '../../core/use-cases'
import { FullMovie } from '../../core/entities/movie.entity'
import { MovieDBFetcher } from '../../config/adapters/http/movieDB.adapter'

const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(true)
  const [movie, setMovie] = useState<FullMovie>()

  useEffect(()=>{
    loadMovie()
},[movieId])

  const loadMovie = async()=>{
    setIsLoading(true)

      const fullMovie = await UseCase.getMovieUseCase(MovieDBFetcher, movieId)

      setMovie(fullMovie)
      setIsLoading(false)
    
  }
  
    return {
      isLoading,
      movie
    }
}

export default useMovie