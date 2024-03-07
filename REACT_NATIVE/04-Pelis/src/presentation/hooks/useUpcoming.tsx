import React, { useEffect, useState } from 'react'
import { UpcomingMovie } from '../../core/entities/upcoming.entity'
import * as UseCases from '../../core/use-cases'
import { UpcomingAdapter } from '../../config/adapters/http/upcoming.adapter'

const useUpcoming = () => {
  
    const [isLoading, setIsLoading] = useState(true)
    const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMovie[] | undefined>([])

    useEffect(()=>{
        initLoadUpcoming()
    }, [])


    const initLoadUpcoming = async ()=>{

        const upcomingMoviesResult = await UseCases.moviesUpcomingUseCase(UpcomingAdapter)

        console.log({upcomingMoviesResult})

        setUpcomingMovies(upcomingMoviesResult)
    }
    
  
    return {
        isLoading,
        upcomingMovies
  }
}

export default useUpcoming