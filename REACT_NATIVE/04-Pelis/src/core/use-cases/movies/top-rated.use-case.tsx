import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBResponse} from "../../../infraestructure/interfaces/movieDBResponses";
import { MovieMapper } from "../../../infraestructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";


export const TopRatedUseCase = async (fetcher: HttpAdapter) : Promise<Movie[]>=>{

    const topRatedMovies = await fetcher.get<MovieDBResponse>('3/tv/top_rated')

    return topRatedMovies.results.map(MovieMapper.fromMovieDBResultToEntity)
}