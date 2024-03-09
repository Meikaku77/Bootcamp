import { AxiosAdapter } from "./axios.adapter";

export const MovieDBFetcher = new AxiosAdapter({
    baseURL: "https://api.themoviedb.org",
    params: {
        api_key: "fe1099f21bfaef01ab67feb300828d6d",
        language: 'es'
    }
})