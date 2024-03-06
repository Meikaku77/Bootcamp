import { HttpAdapter } from "./http.adapter";
import axios from 'axios'

export class AxiosAdapter implements HttpAdapter{

    async get<T>(url: string, options?: Record<string, unknown>) : Promise<T>{

        try {
            const {data} = await axios.get<T>(url,options)
            
            return data
        
        } catch (error) {
            throw new Error(`Error fetching get: ${url}` )
        }
    }
}