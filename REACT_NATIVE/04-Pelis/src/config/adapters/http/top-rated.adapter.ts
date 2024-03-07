import { AxiosAdapter } from "./axios.adapter";

export const TopRatedAdapter = new AxiosAdapter({
    baseURL: 'https://api.themoviedb.org',
    params:{
        api_key: "",
        language: 'es'
    }
})