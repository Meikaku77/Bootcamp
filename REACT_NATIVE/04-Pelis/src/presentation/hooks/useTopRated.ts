import React, { useEffect, useState } from 'react'
import * as UseCases from '../../core/use-cases'
import { TopRatedAdapter } from '../../config/adapters/http/top-rated.adapter'

const useTopRated = () => {
  
    const [isLoading, setIsLoading] = useState(true)
    const [topRatedMovies, setTopratedMovies] = useState<TopRatedEntity[]>([])


    useEffect(()=>{
        initTopRated()
    }, [])

    const initTopRated = async()=>{
        const topRatedMoviesResult = await UseCases.TopRatedUseCase(TopRatedAdapter)
        setTopratedMovies(topRatedMoviesResult)
        console.log(topRatedMoviesResult)
    }

  
  
    return {
        isLoading,
        topRatedMovies
  }
}

export default useTopRated