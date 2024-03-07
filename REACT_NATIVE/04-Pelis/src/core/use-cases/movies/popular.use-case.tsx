import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { PopularResults } from "../../../infraestructure/interfaces/popular.interface";
import { PopularMapper } from "../../../infraestructure/mappers/popular.mapper";
import { PopularEntity } from "../../entities/popular.entity";


export const PopularUseCase = async (fetcher: HttpAdapter): Promise<PopularEntity[]>=>{

        const popularMoviesResult = await fetcher.get<PopularResults>('/3/tv/popular')

    return   popularMoviesResult.results.map(PopularMapper.toPopularEntityFromresult)
    
}