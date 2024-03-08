import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBResponse} from "../../../infraestructure/interfaces/movieDBResponses";
import { MovieMapper } from "../../../infraestructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";



export const PopularUseCase = async (fetcher: HttpAdapter): Promise<Movie[]>=>{

        const popularMoviesResult = await fetcher.get<MovieDBResponse>('/3/tv/popular')

    return   popularMoviesResult.results.map(MovieMapper.fromMovieDBResultToEntity)
    
}