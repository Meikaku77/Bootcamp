import { AxiosAdapter } from "./axios.adapter";

export const MovieDBFetcher = new AxiosAdapter({
    baseURL: "https://api.themoviedb.org",
    params: {
        api_key: "",
        language: 'es'
    }
})