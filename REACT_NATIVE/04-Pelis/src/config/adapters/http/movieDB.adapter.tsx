import { AxiosAdapter } from "./axios.adapter";

export const MovieDBFetcher = new AxiosAdapter({
    baseURL: "https://api.themoviedb.org/3/movie",
    params: {
        api_key: "",
        language: 'es'
    }
})