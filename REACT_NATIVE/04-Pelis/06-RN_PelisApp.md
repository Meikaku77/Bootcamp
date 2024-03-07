# REACT NATIVE - App Películas

- Vamos a hacer el esqueleto y la estructura necesaria para la aplicación
- Lo haremos bajo principios de arquitectura DDD y patrones (haremos uso del patrón repositorio)
- Veremos las diferencias entre config, core, infraestructure y presentation y cómo se integran
- Nos vamos a centrar en traer la info de movieDB
- La app debe ser lo suficiente flexible para tolerar cambios
----

## Configuración de pantallas y directorios

- Creo en src
    - config
        - adapters (dónde guardaré los archivos de patrón adaptador)
        - helpers
    - core (casos de uso)
    - presentation
        - hooks
        - components
        - navigation
        - screens
            - details (detalles de peliculas)
            - home
    - infraestructure (es nuestro middleman)

- Creo los componentes HomeScreen y Detailsscreen
- Muevo App dentro de src
----

## Navegación entre pantallas

- Hago las instalaciones necesarias para integrar la navegación en la aplicación

> npm i @react-navigation/native
> npm i react-native-screens react-native-safe-area-context

- Para la navegación Stack

> npm i @react-navigation/stack
> npm i react-native-gesture-handler @react-native-masked-view/masked-view

- Puedo configurar mi NavigationContainer
- Hay que colocar este import en el top del archivo principal

~~~js
import 'react-native-gesture-handler'
import React from 'react';
import {Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

export const App=(): React.JSX.Element=>{

  return(

   <NavigationContainer>
      <Text>Hello World</Text>
   </NavigationContainer>
          
   )
}
~~~

- Uso el ejemplo de la documentación para crear el Stack Navigator
- Tipo el Navigator con RootstackParams
- Empleo screenOptions para ocultar los headers 

~~~js
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/Homescreen';
import { Detailsscreen } from '../screens/details/DetailsScreen';

const Stack = createStackNavigator();

export const Navigation =()=>{
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={Detailsscreen} />
    </Stack.Navigator>
  );
}
~~~

- Coloco Navigation dentro de App
-------

## Obtener Peliculas - TheMovieDB

- Creo una cuenta en theMovieDB.org
- En Editar Perfil / API / le doy cick al enlace para generar la llave
- La guardo (y el token también) en .env
- Creo .env.template para guardar las variables vacias que digan que es lo que necesito configurar
- Añado .env a .gitignore
- Creo el README

~~~md
# README

1. Clonar el proyecto
2. Instalar dependencias `npm install`
3. Clonar el archivo .env.template a .env y configurar las variables de entorno
4. Ejecutar el proyecto con `npm run start`
~~~

- Voy a la documentación de MovieDB
- En Authentication tengo el token de autenticación (no es el mismo que obtuve con la llave). Lo copio en .env
- Puedo seleccionar Node como lenguaje
- Para buscar un endpoint en especifico puedo ir al buscador JUMP TO y , en este caso, escribo **now playing**
- Donde me da el ejemplo de código puedo elegir que quiero usar, si fetch, axios. Selecciono Axios
- Este es el ejemplo

~~~js
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJh....'
  }
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
~~~

- Implementaremos Axios con el patrón adaptador
- Por ahora solo necesito el endpoint que es `https://api.themoviedb.org/3/movie/now_playing`
- Debo mandar mi API_KEY como params en POSTMAN o similares bajo el nombre de api_key
- En THUNDERCLIENT es en Query
- Puedo añadirle language es para que aparezca en español
----

## Patrón Adaptador

- En adapters creo en la carpeta http/http.adapter.tsx
- Porqué lo hago con una clase abstracta?
  - Porque yo no quiero crear instancias de esta clase
  - Lo que aqui defina no va estar implementado
  - Voy a definir las reglas de los métodos y propiedades que deben de tener las clases que extiendan de mi adaptador
  - Options lo hago opcional. Puedo usar Record para decirle que el tipo de dato será de tipo string y el valor al que apunta unknown
  - Si quisiera hacer algo muy genérico usaria tipo any
  - Resuelve en una promesa de tipo genérico

~~~js
export abstract class HttpAdapter{

    abstract get<T>(url: string, options?: Record<string, unknown>) : Promise<T> 
}
~~~

- Instalo axios
- Creo en http/axios.adapter.tsx
- Implemento el método get, uso async await y un trycatch
- Extraigo la data del fetch de axios
- Tipo la respuesta de axios con el mismo genérico que el método
- Retorno la data

~~~js
import { HttpAdapter } from "./http.adapter";
import axios, { AxiosInstance } from 'axios'

interface Options{
    baseURL: string,
    params: Record<string,string>
}

export class AxiosAdapter implements HttpAdapter{

    private axiosInstance : AxiosInstance;

    constructor(options: Options){
        this.axiosInstance = axios.create({
            baseURL: options.baseURL,
            params: options.params
        })
    }


    async get<T>(url: string, options?: Record<string, unknown>) : Promise<T>{

        try {
            const {data} = await this.axiosInstance.get<T>(url,options)
            
            return data
        
        } catch (error) {
            throw new Error(`Error fetching get: ${url}` )
        }
    }
}
~~~
-----

## Casos de uso - Now Playing

- En /core/use-cases/movies/now-playing.use-case.tsx
- Now playing debe traer las peliculas usando el adaptador de axios
- Se busca que los casos de uso sean agnósticos (que no necesiten paquetes de terceros para funcionar)
- Le paso de parámetro *fetcher* que serña del tipo HttpAdapater (el mismo que mi adaptador de axios)
- Podría pasar el url como parámetro para hacerlo más genérico, pero yo se que en este caso de uso siempre voy a llamar al mismo endpoint
- Como la cabecera de la url la voy a configurar en el adaptador, añado solo la parte de la url de '/now_playing'
- Hay que tipar la respuesta, por lo que hago un llamado al endpoint desde THUNDERCLIENT y uso paste JSON as code
- La pego en infraestructure/interfaces/movieDBResponses.tsx
- Cambio algunos nombres y en lugar de usar guiones bajos uso camelCase

~~~js
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

/*
export enum OriginalLanguage {
    En = "en",
    Es = "es",
}
*/
~~~

- Lo que va a regresar el fetcher va a ser de tipo NowPlayingResponse
- Para tipar la respuesta de la promisa bien podría usar la interfaz de Movie, pero podría ser que la DB cambiara en un futuro, y eso podría darme un dolor de cabeza
- En lugar de usar una interfaz proveniente de la db, creo /core/entities/movie.entity.tsx
- Usualmente la entity es una clase, pero también puedo trabajar con una interfaz y luego transformarla en una clase

~~~js
export interface Movie{
    id: number
    title: string
    description: string
    releaseDate: Date
    rating: number
    poster: string
    backdrop: string
}
~~~

- Entonces, voy a usar mi propio modelo. En la respuesta los nombres vienen diferente, por ejemplo *poster_path* en lugar de poster
- Voy a tener que transformar la data de la respuesta para que concuerde con mi entity, ya que la respuesta de la DB no es exactamente igual
- Todo esto lo hago porque si el día de mañana la interfaz que extraje de la DB cambia, mi aplicación crashearía

~~~js
import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { NowPlayingResponse } from "../../../infraestructure/interfaces/movieDBResponses";
import { Movie } from "../../entities/movie.entity";


export const moviesNowPlayingUseCase = async(fetcher: HttpAdapter): Promise<Movie[]>=>{
    try {
        const nowPlaying = await fetcher.get<NowPlayingResponse>('/now_playing')

        return []//Aquí voy a tener que transformar la data para adaptarlo a como lo he tipado yo en mi entidad
                 //y no con los nombres y el conjunto de propiedades que viene desde la DB
        
    } catch (error) {
        throw new Error (`Error fetching movies - Now Playing`)
    }
}
~~~
-------

## Custom Hook useMovies

- 






