import { UpcomingMovie } from "../../core/entities/upcoming.entity";
import { Result } from "../interfaces/upcomingMovies.interface";

export class UpcomingMovieMapper{

    static getUpcomingResultToEntity (result: Result ) : UpcomingMovie{
        return {
            genreIds: result.genre_ids,
            id: result.id,
            originalLanguage: result.original_language,
            originalTitle: result.original_title,
            posterPath: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
            backdropPath: `https://image.tmdb.org/t/p/w500${result.backdrop_path}`,
            releaseDate: new Date(result.release_date),
            rate: result.vote_average
        }
    }
}