import { Result } from "../interfaces/top-rated.interface";

export class TopRatedMapper{

    static toTopRatedEntityFromresult(result: Result): TopRatedEntity{
        return{
            id: result.id,
            originalName: result.original_name,
            firstAirDate: new Date(result.first_air_date),
            name: result.name,
            rate: result.vote_average
        }
    }
} 