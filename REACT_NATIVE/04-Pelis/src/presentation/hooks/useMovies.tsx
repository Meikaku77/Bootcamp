import React, { useEffect, useState } from 'react'
import { Movie } from '../../core/entities/movie.entity'
import * as UseCases from '../../core/use-cases'
import { MovieDBFetcher } from '../../config/adapters/http/movieDB.adapter'

const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([])

    useEffect(()=>{
        initLoad()
    },[])

    const initLoad= async()=>{
        const nowPlayingMovies = await UseCases.moviesNowPlayingUseCase(MovieDBFetcher)
        setNowPlaying(nowPlayingMovies)
    }
    
    return {
        isLoading,
        nowPlaying
    }
}

export default useMovies