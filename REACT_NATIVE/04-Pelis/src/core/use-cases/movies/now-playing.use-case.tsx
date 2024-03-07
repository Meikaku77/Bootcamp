import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { NowPlayingResponse } from "../../../infraestructure/interfaces/movieDBResponses";
import { Movie } from "../../entities/movie.entity";


export const moviesNowPlayingUseCase = async(fetcher: HttpAdapter): Promise<Movie[]>=>{
    try {
        const nowPlaying = await fetcher.get<NowPlayingResponse>('/now_playing')

        return []//Aquí voy a tener que transformar la data para adaptarlo a como lo he tipado yo en mi entidad
                 //y no con los nombres y el conjunto de propiedades que viene desde la DB
        
    } catch (error) {
        throw new Error (`Error fetching movies - Now Playing`)
    }
}

