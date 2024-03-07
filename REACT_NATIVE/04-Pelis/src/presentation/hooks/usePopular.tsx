import React, { useEffect, useState } from 'react'
import { PopularEntity } from '../../core/entities/popular.entity'
import * as UseCases from '../../core/use-cases'
import { PopularAdapter } from '../../config/adapters/http/popular.adapter'

const usePopular = () => {
  
  const [isLoading, setIsLoading] = useState(true)

  const [popularMovies, setPopularMovies] = useState<PopularEntity[]>([])

  useEffect(()=>{
    initPopularLoading()
  },[])
  

  const initPopularLoading = async ()=>{
        const popularMoviesResult = await UseCases.PopularUseCase(PopularAdapter)
        console.log(popularMoviesResult)
        setPopularMovies(popularMoviesResult)
  }
    return {
        isLoading,
        popularMovies
  }
}

export default usePopular