import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { TopRatedResults } from "../../../infraestructure/interfaces/top-rated.interface";
import { TopRatedMapper } from "../../../infraestructure/mappers/top-rated.mapper";

export const TopRatedUseCase = async (fetcher: HttpAdapter) : Promise<TopRatedEntity[]>=>{

    const topRatedMovies = await fetcher.get<TopRatedResults>('3/tv/top_rated')

    return topRatedMovies.results.map(TopRatedMapper.toTopRatedEntityFromresult)
}