import { HttpAdapter } from "../../../config/adapters/http/http.adapter"
import { UpcomingResults } from "../../../infraestructure/interfaces/upcomingMovies.interface"
import { UpcomingMovieMapper } from "../../../infraestructure/mappers/upcoming.mapper"
import { UpcomingMovie } from "../../entities/upcoming.entity"


export const moviesUpcomingUseCase= async(fetcher: HttpAdapter): Promise<UpcomingMovie[] | undefined>=>{
    try {
        
        const upcomingMovies  = await fetcher.get<UpcomingResults>('/upcoming')

        return upcomingMovies.results.map(UpcomingMovieMapper.getUpcomingResultToEntity)


        
        
    } catch (error) {
     throw new Error(`fetch error to upcoming movies use case`)   
    }
}