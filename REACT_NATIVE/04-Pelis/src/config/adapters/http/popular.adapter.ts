import { AxiosAdapter } from "./axios.adapter";

export const PopularAdapter= new AxiosAdapter({
    baseURL: 'https://api.themoviedb.org',
    params:{
        api_key: "",
        language: 'es'
    }
})