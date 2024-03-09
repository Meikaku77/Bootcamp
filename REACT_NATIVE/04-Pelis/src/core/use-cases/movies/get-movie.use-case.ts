import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { IFullMovie } from "../../../infraestructure/interfaces/full-movie.interface";
import { FullMovieMapper } from "../../../infraestructure/mappers/full-movie.mapper";
import { FullMovie } from "../../entities/movie.entity";

export const getMovieUseCase = async (fetcher: HttpAdapter, id: number): Promise<FullMovie>=>{

    try { 
        const getFullMovie = await fetcher.get<IFullMovie>(`/3/movie/${id}`)

        const fullMovie = FullMovieMapper.fromMovieDBToEntity(getFullMovie)
        
        return fullMovie
    
    } catch (error) {
        throw new Error("Can't get full movie")
    }


}