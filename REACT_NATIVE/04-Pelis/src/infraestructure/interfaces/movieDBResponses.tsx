export interface NowPlayingResponse {
    dates:         Dates;
    page:          number;
    results:       Movie[];
    totalPages:   number;
    totalResults: number;
}

export interface Dates {
    maximum: string;
    minimum: string;
}

export interface Movie {
    adult:             boolean;
    backdropPath:     string;
    genreIds:         number[];
    id:                number;
    originalLanguage: string;
    originalTitle:    string;
    overview:          string;
    popularity:        number;
    posterPath:       string;
    releaseDate:      string;
    title:             string;
    video:             boolean;
    voteAverage:      number;
    voteCount:        number;
}

export enum OriginalLanguage {
    En = "en",
    Es = "es",
}
