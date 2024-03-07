import { PopularEntity } from "../../core/entities/popular.entity";
import { Result } from "../interfaces/popular.interface";

export class PopularMapper{

    static toPopularEntityFromresult (result: Result): PopularEntity{
        return{
            id: result.id,
            originalLanguage: result.original_language,
            originalName: result.original_name,
            popularity: result.popularity,
            posterPath: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
            rate: result.vote_average
        }
    }
}