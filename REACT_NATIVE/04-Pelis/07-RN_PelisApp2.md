# REACT NATIVE - App Películas parte 2

- En esta sección veremos como aplicar estilos pero también hay más cosas que hacer, como
    - Otras peticiones para traer los actores, traer la info de unsa sola película, para mostrar las películas
    - Algún tipo de carrusel, infiniteScroll, configurar las variables de entorno

## Carrusel de posters

- En HomeScreen coloco un ScrollView
- Uso usesafeAreaInsets para tener una distancia segura de la pantalla desde el top
- Coloco un loading provisional
- Creo la carpeta components/movies
- El ScrollView, a diferencia del FlatList, va a renderizar los elementos pese a que no estén en pantalla
    - Horizontal para que el scroll sea de manera horizontal
    - ShowHorizontalScrollIndicator en false para que no aparezca una barra de progreso
- Hago un map de las movies. Recuerda que para renderizar debo pasarle un key. Le paso movie.id

~~~js
import React from 'react'
import { Text, View } from 'react-native'
import { Movie } from '../../../core/entities/movie.entity'
import { ScrollView } from 'react-native-gesture-handler'

interface Props{
    movies: Movie[]
    height?: number
}

const PosterCarousel = ({movies, height= 440}: Props) => {
  return (
    <View style={{height}} >
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator ={false}>
            {movies.map(movie=><Text key={movie.id}>{movie.title}</Text>)}

        </ScrollView>
    </View>
  )
}

export default PosterCarousel
~~~

- En vez de mostrar un texto voy a crear un componente para renderizar el poster en components/movies
- En el View esparzo el styles porque quiero agregar el width de manera provisional

~~~js
import React from 'react'
import { Image, View } from 'react-native'
import { Movie } from '../../../core/entities/movie.entity'
import {StyleSheet} from 'react-native'


interface Props{
    movie: Movie
}

const Poster = ({movie}: Props) => {
  return (
    <View style={{...styles.imageContainer, width: 300}} >
        <Image style={styles.image} source={{uri: movie.poster}} />
    </View>
  )
}



const styles = StyleSheet.create({
  image:{
    flex:1,
    borderRadius: 18
  },
  imageContainer:{
    flex:1,
    borderRadius: 18,
    shadowColor: "black",
    shadowOffset:{
        width:0,
        height: 10
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9
  }
})

export default Poster
~~~

- Lo coloco en el Carrousel que coloco en el HomeScreen

~~~js
import React from 'react'
import { Text, View } from 'react-native'
import { Movie } from '../../../core/entities/movie.entity'
import { ScrollView } from 'react-native-gesture-handler'
import Poster from './Poster'

interface Props{
    movies: Movie[]
    height?: number
}

const PosterCarousel = ({movies, height= 440}: Props) => {
  return (
    <View style={{height}} >
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator ={false}>
            {movies.map(movie=> <Poster key={movie.id} movie={movie}  />)}
        </ScrollView>
    </View>
  )
}

export default PosterCarousel
~~~

- Le paso el nowPlaying en HomeScreen

~~~js
import React from 'react'
import { Text, View } from 'react-native'
import useMovies from '../../hooks/useMovies'
import { ScrollView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import PosterCarousel from '../../components/movies/PosterCarousel'


export const HomeScreen  = () => {

  const {top} = useSafeAreaInsets()

const {isLoading, nowPlaying} = useMovies()

if(isLoading){
  return (<Text>Is loading...</Text>)
}

  
  return (
    <ScrollView>
      <View style={{marginTop: top + 20, paddingBottom: 30}}>

      <PosterCarousel movies={nowPlaying} />
      </View>
    </ScrollView>
  )
}
~~~
--------

## Terminar Carrousel y Navegación

- Quiero poder navegar a DetailsScreen
- Añado un par de props a Poster para hacerlo más flexible. Las hago opcionales y les coloco valores por defecto
- Para poder navegar a Details coloco el View dentro de un Pressable
- Hago el tipado estricto  del useNavigation
- El componente Details me pide el movie.id (como tipé en RootParams), se lo paso como segundo parametro dentro de un objeto al navigation 

~~~js
import React from 'react'
import { Image, Pressable, View } from 'react-native'
import { Movie } from '../../../core/entities/movie.entity'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../navigation/Navigation'
import {StyleSheet} from 'react-native'


interface Props{
    movie: Movie
    height?: number
    width?: number 
}

const Poster = ({movie, height=420, width=300}: Props) => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>()

  return (
    <Pressable onPress={()=>{navigation.navigate('Details', {movieId: movie.id})}} >
        <View style={{...styles.imageContainer, width:300}} >
            <Image style={styles.image} source={{uri: movie.poster}} />
        </View>
    </Pressable>
  )
}



const styles = StyleSheet.create({
  image:{
    flex:1,
    borderRadius: 18
  },
  imageContainer:{
    flex:1,
    borderRadius: 18,
    shadowColor: "black",
    shadowOffset:{
        width:0,
        height: 10
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9
  }
})

export default Poster
~~~

- Le añado el width y el height al Pressable.
- Quiero añadirle opacidad, por lo que en lugar de doble llave dentro del style, coloco solo un par de llaves y dentro, con una funcion de retorno implícito coloco el width y el height.
    - Con esta función ahora puedo desestructurar el pressed para saber si se está presionando
    - Hago un ternario para añadir la opacidad

~~~js
import React from 'react'
import { Image, Pressable, View } from 'react-native'
import { Movie } from '../../../core/entities/movie.entity'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../navigation/Navigation'
import {StyleSheet} from 'react-native'


interface Props{
    movie: Movie
    height?: number
    width?: number 
}

const Poster = ({movie, height=420, width=300}: Props) => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>()

  return (
    <Pressable onPress={()=>{navigation.navigate('Details', {movieId: movie.id})}} 
    style={({pressed})=>({
        width,
        height,
        marginHorizontal:4,
        paddingBottom: 20,
        paddingHorizontal:5,
        opacity: pressed? 0.9: 1
    })} 
    >
        <View style={{...styles.imageContainer, width:300}} >
            <Image style={styles.image} source={{uri: movie.poster}} />
        </View>
    </Pressable>
  )
}



const styles = StyleSheet.create({
  image:{
    flex:1,
    borderRadius: 18
  },
  imageContainer:{
    flex:1,
    borderRadius: 18,
    shadowColor: "black",
    shadowOffset:{
        width:0,
        height: 10
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9
  }
})

export default Poster
~~~

- Estoy usando un ScrollView porque me interesa que todas las imágenes estén ya creadas
- Con el FlatList se renderizarían de manera dinámica, y es lo que vamos a hacer con los otros listados
-----

## Carrousel de películas con FlatList

- Vamos a reutilizar mucho nuestro código
- Quiero mostrar en HomeScreen las péliculas populares
- Extraigo popularMovies del hook useMovies
- Creo components/HorizontalCarousel.tsx
- En un FlatList siempre le paso la data (que es un arreglo de movies), el renderItem (de la que desestructuro item y con un return implicito poniendo paréntesis renderizo el componente Poster), y también debo pasarle el keyExtractor, que siempre debe ser un string
- Quito el width y height que había colocado en duro en el container de la imagen de Poster, ya que se lo paso por props

~~~js
import React from 'react'
import { Text, View } from 'react-native'
import { Movie } from '../../../core/entities/movie.entity'
import { FlatList } from 'react-native-gesture-handler'
import Poster from './Poster'

interface Props{
    movies: Movie[]
    title?: string
}

export const HorizontalCarousel  = ({movies, title}: Props) => {
  return (
    <View style={{height: title? 260: 220}} >
      {
        title && (
            <Text style={{fontSize: 30, fontWeight: '400', marginLeft: 10, marginBottom: 10}} >
                {title}
            </Text>
        )
      }

      <FlatList 
      data={movies}
      renderItem={({item})=>(<Poster movie={item} width={140} height={200} />)}
      keyExtractor={item=> item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}
~~~

- Uso el mismo componente para las top-rated y las upcoming

~~~js
import React from 'react'
import { Text, View } from 'react-native'
import useMovies from '../../hooks/useMovies'
import { ScrollView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import PosterCarousel from '../../components/movies/PosterCarousel'
import { HorizontalCarousel } from '../../components/movies/HorizontalCarousel'


export const HomeScreen  = () => {

  const {top} = useSafeAreaInsets()

const {isLoading, nowPlaying, popularMovie, topRatedMovie, upcomingMovie} = useMovies()

if(isLoading){
  return (<Text>Is loading...</Text>)
}

  
  return (
    <ScrollView>
      <View style={{marginTop: top + 20, paddingBottom: 30}}>

      <PosterCarousel movies={nowPlaying} />
      <HorizontalCarousel movies={popularMovie} title="Populars"/>
      <HorizontalCarousel movies={topRatedMovie} title="Top Rated"/>
      <HorizontalCarousel movies={upcomingMovie} title="Upcoming"/>
      </View>
    </ScrollView>
  )
}
~~~

- Enfoquémonos en customizar el infiniteScroll
------

## Infinite Scroll Horizontal

- Para aplicar el scroll infinito necesito saber cuando mi FlatList está en el final o cerca del final
  - Para ello usaré la propiedad onScroll
  - Para sacar el tipado del evento pongo el cursor encima

~~~js
const PosterCarousel = ({movies, height= 440}: Props) => {
  return (
    <View style={{height}} >
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator ={false}
        onScroll={(event)=>} //coloco el cursor encima para saber de que tipo es el evento
        >
            {movies.map(movie=> <Poster key={movie.id} movie={movie}  />)}
        </ScrollView>
    </View>
  )
}
~~~

- **NOTA:** El onScroll es en el **FlatList!!** 

- Creo la función onScroll
- Extraigo de event.nativeEvent los valores
- Los imprimo en consola

~~~js
import React from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native'
import { Movie } from '../../../core/entities/movie.entity'
import { FlatList } from 'react-native-gesture-handler'
import Poster from './Poster'

interface Props{
    movies: Movie[]
    title?: string
}

export const HorizontalCarousel  = ({movies, title}: Props) => {

  const onScroll = (event:NativeSyntheticEvent<NativeScrollEvent> )=>{
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent
    console.log({contentOffset, layoutMeasurement, contentSize})
  }

  return (
    <View style={{height: title? 260: 220}} >
      {
        title && (
            <Text style={{fontSize: 30, fontWeight: '400', marginLeft: 10, marginBottom: 10}} >
                {title}
            </Text>
        )
      }

      <FlatList 
      data={movies}
      renderItem={({item})=>(<Poster movie={item} width={140} height={200} />)}
      keyExtractor={item=> item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      />
    </View>
  )
}

~~~js

~~~
- Para cargar esas nuevas películas tengo que integrarlo en el flujo que ya tengo actualmente
- En **contentOffset** es el movimiento que muevo en x (y estará en 0 porque es scroll horizontal)
- El **contentSize** es el tamaño del elemento total
- El **LayoutMeasurement** es el tamaño del elemento
- Cuando hago scroll, estos dos últimos no varían
- Si llevo el carrito hasta el final tengo que en contentOffset.x 2480 y en contentSize.width 2960 (porque hay un padding)
- Le sumo 600 pixeles de gracia
- Si esto es mayor que el contentSize.width significará que llegamos al final
  - En caso contrario será false
- Con un if, si no he llegado al final mando un return para que no haga nada
- Pero si llega al final, debo cargar las siguientes películas
- Creo la funcion l**oadNextPage** en las Props
- Si loadNextPage tiene un valor, lo ejecuta

~~~js
import React from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native'
import { Movie } from '../../../core/entities/movie.entity'
import { FlatList } from 'react-native-gesture-handler'
import Poster from './Poster'

interface Props{
    movies: Movie[]
    title?: string
    loadNextPage: ()=> void
}

export const HorizontalCarousel  = ({movies, title, loadNextPage}: Props) => {

  const onScroll = (event:NativeSyntheticEvent<NativeScrollEvent> )=>{
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent
    console.log({contentOffset, layoutMeasurement, contentSize})

    const isEndReached = (contentOffset.x + layoutMeasurement.width + 600) >= contentSize.width

    if(!isEndReached) return

    loadNextPage && loadNextPage()

  }

  return (
    <View style={{height: title? 260: 220}} >
      {
        title && (
            <Text style={{fontSize: 30, fontWeight: '400', marginLeft: 10, marginBottom: 10}} >
                {title}
            </Text>
        )
      }

      <FlatList 
      data={movies}
      renderItem={({item})=>(<Poster movie={item} width={140} height={200} />)}
      keyExtractor={item=> item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      />
    </View>
  )
}
~~~

- En HomeScreen le coloco un console.log al loadNextPage del componente HorizontalCarousel

~~~js
import React from 'react'
import { Text, View } from 'react-native'
import useMovies from '../../hooks/useMovies'
import { ScrollView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import PosterCarousel from '../../components/movies/PosterCarousel'
import { HorizontalCarousel } from '../../components/movies/HorizontalCarousel'


export const HomeScreen  = () => {

  const {top} = useSafeAreaInsets()

const {isLoading, nowPlaying, popularMovie, topRatedMovie, upcomingMovie} = useMovies()

if(isLoading){
  return (<Text>Is loading...</Text>)
}

  
  return (
    <ScrollView>
      <View style={{marginTop: top + 20, paddingBottom: 30}}>

      <PosterCarousel movies={nowPlaying} />
      <HorizontalCarousel movies={popularMovie} title="Populars" loadNextPage={()=>console.log("end reached!")} />
      <HorizontalCarousel movies={topRatedMovie} title="Top Rated" loadNextPage={()=>console.log("end reached!")}/>
      <HorizontalCarousel movies={upcomingMovie} title="Upcoming" loadNextPage={()=>console.log("end reached!")}/>
      </View>
    </ScrollView>
  )
}
~~~

- Hago uso del useRef para determinar cuando llamo a loadNextPage porque si no se va a disparar muchas veces
- Cuando se que voy a cargar algo pongo el .current a true
- Antes de ejecutar el código verifico que .current no esté en true, porque significa que estoy haciendo la petición de las sigueintes películas
- Para regresarlo a false podemos hacer uso del useEffect. Cuando las movies cambien pono el .current a false
- Uso setTimeOut para darle unas milésimas de segundo y no vaya tan rápido pues produce un efecto no deseado (opcional)

~~~js
import React, { useEffect, useRef } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native'
import { Movie } from '../../../core/entities/movie.entity'
import { FlatList } from 'react-native-gesture-handler'
import Poster from './Poster'

interface Props{
    movies: Movie[]
    title?: string
    loadNextPage?: ()=> void
}

export const HorizontalCarousel  = ({movies, title, loadNextPage}: Props) => {

  const isLoading = useRef(false)

  useEffect(()=>{

    setTimeout(()=>{
      isLoading.current = false
    }, 200)
    
  }, [movies])

  const onScroll = (event:NativeSyntheticEvent<NativeScrollEvent> )=>{

    if(isLoading.current) return

    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent
    console.log({contentOffset, layoutMeasurement, contentSize})

    const isEndReached = (contentOffset.x + layoutMeasurement.width + 600) >= contentSize.width

    if(!isEndReached) return

    isLoading.current = true

    loadNextPage && loadNextPage()

  }

  return (
    <View style={{height: title? 260: 220}} >
      {
        title && (
            <Text style={{fontSize: 30, fontWeight: '400', marginLeft: 10, marginBottom: 10}} >
                {title}
            </Text>
        )
      }

      <FlatList 
      data={movies}
      renderItem={({item})=>(<Poster movie={item} width={140} height={200} />)}
      keyExtractor={item=> item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      />
    </View>
  )
}
~~~

- Si quisiera cargar un spinner o algo para decir que está cargando si debería hacerlo con un state y no con un ref
- Ref no dispara rerenders cuando cambia su valor
-------

## Infinite Scroll parte 2

- HorizontalCarousel no está llamadno a las nuevas películas, solo a la función si es que la tiene
- Para cargar las siguientes películas, la lógica está en el custom hook useMovies
- Creo una variable popularPage y la inicializo en 1
- En la función incremento la página y llamo al caso de uso
- Debo añadir el argumento page al caso de uso

~~~js
import React, { useEffect, useState } from 'react'
import { Movie } from '../../core/entities/movie.entity'
import * as UseCases from '../../core/use-cases'
import { MovieDBFetcher } from '../../config/adapters/http/movieDB.adapter'


let popularPage = 1

const useMovies = () => {



    const [isLoading, setIsLoading] = useState(true)
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([])
    const [popularMovie, setpopularMovie] = useState<Movie[]>([])
    const [topRatedMovie, setTopRatedMovie] = useState<Movie[]>([])
    const [upcomingMovie, setUpcomingMovie] = useState<Movie[]>([])

    const popularNextPage = async () =>{
         popularPage ++;
         
         const popularMovies = await UseCases.PopularUseCase(MovieDBFetcher) 
    }

    useEffect(()=>{
        initLoad()
    },[])

    const initLoad= async()=>{
        const nowPlayingPromise = UseCases.moviesNowPlayingUseCase(MovieDBFetcher)
        const popularPromise = UseCases.PopularUseCase(MovieDBFetcher)
        const topRatedPromise = UseCases.TopRatedUseCase(MovieDBFetcher)
        const upcomingPromise = UseCases.moviesUpcomingUseCase(MovieDBFetcher)

        const[
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upcomingMovies
        ] = await Promise.all([nowPlayingPromise, popularPromise, topRatedPromise, upcomingPromise])
        

        setNowPlaying(nowPlayingMovies)
        setpopularMovie(popularMovies)
        setTopRatedMovie(topRatedMovies)
        setUpcomingMovie(upcomingMovies)
        setIsLoading(false)

        
    }
    
    return {
        isLoading,
        nowPlaying,
        popularMovie,
        topRatedMovie,
        upcomingMovie,
        popularNextPage
    }
}

export default useMovies
~~~

- En el caso de uso de popular, agrego una interfaz para el objeto options y poder pasarle la página y el limit

~~~js
import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBResponse} from "../../../infraestructure/interfaces/movieDBResponses";
import { MovieMapper } from "../../../infraestructure/mappers/movie.mapper";
import { Movie } from "../../entities/movie.entity";

interface Options{
    page?: number
    limit?: number
}


export const PopularUseCase = async (fetcher: HttpAdapter, options?: Options): Promise<Movie[]>=>{

        const popularMoviesResult = await fetcher.get<MovieDBResponse>('/3/tv/popular', {
            params:{
                page: options?.page ?? 1
            }
        })

    return   popularMoviesResult.results.map(MovieMapper.fromMovieDBResultToEntity)
    
}
~~~

- Ahora, en el hook, añado el argumento page al caso de uso
- Esparzo con el spread el state anterior y el nuevo

~~~js
import React, { useEffect, useState } from 'react'
import { Movie } from '../../core/entities/movie.entity'
import * as UseCases from '../../core/use-cases'
import { MovieDBFetcher } from '../../config/adapters/http/movieDB.adapter'


let popularPage = 1

const useMovies = () => {



    const [isLoading, setIsLoading] = useState(true)
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([])
    const [popularMovie, setpopularMovie] = useState<Movie[]>([])
    const [topRatedMovie, setTopRatedMovie] = useState<Movie[]>([])
    const [upcomingMovie, setUpcomingMovie] = useState<Movie[]>([])

    const popularNextPage = async () =>{
         popularPage ++;
         
         const popularMovies = await UseCases.PopularUseCase(MovieDBFetcher, {page: popularPage}) 

         setpopularMovie(prev=> [...prev, ... popularMovies])
    }

    useEffect(()=>{
        initLoad()
    },[])

    const initLoad= async()=>{
        const nowPlayingPromise = UseCases.moviesNowPlayingUseCase(MovieDBFetcher)
        const popularPromise = UseCases.PopularUseCase(MovieDBFetcher)
        const topRatedPromise = UseCases.TopRatedUseCase(MovieDBFetcher)
        const upcomingPromise = UseCases.moviesUpcomingUseCase(MovieDBFetcher)

        const[
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upcomingMovies
        ] = await Promise.all([nowPlayingPromise, popularPromise, topRatedPromise, upcomingPromise])
        

        setNowPlaying(nowPlayingMovies)
        setpopularMovie(popularMovies)
        setTopRatedMovie(topRatedMovies)
        setUpcomingMovie(upcomingMovies)
        setIsLoading(false)

        
    }
    
    return {
        isLoading,
        nowPlaying,
        popularMovie,
        topRatedMovie,
        upcomingMovie,
        popularNextPage
    }
}

export default useMovies
~~~

- Ahora puedo desestructurar este popularNextPage del hook y llamarlo

~~~js
import React, { useEffect, useRef } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native'
import { Movie } from '../../../core/entities/movie.entity'
import { FlatList } from 'react-native-gesture-handler'
import Poster from './Poster'

interface Props{
    movies: Movie[]
    title?: string
    loadNextPage?: ()=> void
}

export const HorizontalCarousel  = ({movies, title, loadNextPage}: Props) => {

  const isLoading = useRef(false)

  useEffect(()=>{

    setTimeout(()=>{
      isLoading.current = false
    }, 200)
    
  }, [movies])

  const onScroll = (event:NativeSyntheticEvent<NativeScrollEvent> )=>{

    if(isLoading.current) return

    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent
    console.log({contentOffset, layoutMeasurement, contentSize})

    const isEndReached = (contentOffset.x + layoutMeasurement.width + 600) >= contentSize.width

    if(!isEndReached) return

    isLoading.current = true

    loadNextPage && loadNextPage()

  }

  return (
    <View style={{height: title? 260: 220}} >
      {
        title && (
            <Text style={{fontSize: 30, fontWeight: '400', marginLeft: 10, marginBottom: 10}} >
                {title}
            </Text>
        )
      }

      <FlatList 
      data={movies}
      renderItem={({item})=>(<Poster movie={item} width={140} height={200} />)}
      keyExtractor={item=> item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      />
    </View>
  )
}
~~~

- Está dando problemas de id's duplicados
- Podemos verificar que en nuestro arreglo de pelis populares los id's sean únicos
- También puedo generar un id único con el index en el keyExtractor
- HorizontalCarousel.tsx

~~~js
<FlatList 
data={movies}
renderItem={({item})=>(<Poster movie={item} width={140} height={200} />)}
keyExtractor={(item, index)=> `${item.id}-${index}`}
horizontal
showsHorizontalScrollIndicator={false}
onScroll={onScroll}
/>
~~~
-----

## Información Película por ID

- Para hacer peticiones http de una película, como cada vez que entre a la misma película voy a ahcer la petición, es conveniente almacenar la info en caché. Eso es lo que hace React Query, se puede usar en React Native 
- Necesitamos el id de la película
- En DetailsScreen tomo los params de useRoute

~~~js
import { useRoute } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'

export const Detailsscreen  = () => {

  const {movieId} = useRoute().params

  console.log(movieId)
  
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  )
}
~~~

- De esta manera funcion (aunque debo tipar el useRoute)
- Hay otra forma. Tipando las props, dispongo de navigation y route

~~~js
import { useRoute } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text, View } from 'react-native'
import { RootStackParams } from '../../navigation/Navigation'

interface Props extends StackScreenProps<RootStackParams, 'Details'>{}

export const Detailsscreen  = ({route}:Props) => {

  const {movieId} = route.params

  return (
    <View>
      <Text>Hello World</Text>
    </View>
  )
}
~~~

- Creo un custom hook useMovie
- Haremos algo parecido al useMovies. Apenas se carga lanzamos un efecto para realizar la petición http
  - Podriamos poner de dependencia el movieId o dejar el arreglo vacío del useEffect

~~~js
import React, { useEffect, useState } from 'react'

const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    loadMovie()
  
},[movieId])

  const loadMovie =()=>{

  }
  
    return (
    isLoading

  )
}

export default useMovie
~~~

- Si hago un llamado a un endpoint y detrás de movie coloco el id .../3/movie/*aqui_coloco_ID* me trae mucha info
- En la entidad creo una interfaz que extiende de Movie

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

export interface FullMovie extends Movie{
    genres: string[]
    duration: number
    budget: number
    originalTitle: string
    productionCompanies: string[]
}
~~~

- Debo crear el caso de uso GetMovie y el mapper para mapear la data
- Del endpoint extraigo la interfaz para tipar la respuesta del fetcher en el caso de uso
- Cambio el tipo Genres[] por string[]

~~~js
// Generated by https://quicktype.io

export interface IFullMovie {
    adult:                 boolean;
    backdrop_path:         null;
    belongs_to_collection: null;
    budget:                number;
    genres:                string[];
    homepage:              string;
    id:                    number;
    imdb_id:               string;
    original_language:     string;
    original_title:        string;
    overview:              string;
    popularity:            number;
    poster_path:           string;
    production_companies:  any[];
    production_countries:  ProductionCountry[];
    release_date:          string;
    revenue:               number;
    runtime:               number;
    spoken_languages:      SpokenLanguage[];
    status:                string;
    tagline:               string;
    title:                 string;
    video:                 boolean;
    vote_average:          number;
    vote_count:            number;
}

export interface Genre {
    id:   number;
    name: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name:       string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1:    string;
    name:         string;
}
~~~

- Hago el mapper

~~~js
import { FullMovie } from "../../core/entities/movie.entity"
import { IFullMovie } from "../interfaces/full-movie.interface"

export class FullMovieMapper {

    static fromMovieDBToEntity(result: IFullMovie): FullMovie{

        return{id: result.id,
        title: result.title,
        description: result.overview,
        releaseDate: new Date(result.release_date),
        rating: result.vote_average,
        poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
        backdrop: `https://image.tmdb.org/t/p/w500${result.backdrop_path}`,
        genres: result.genres,
        duration: result.runtime,
        budget: result.budget,
        originalTitle: result.original_title,
        productionCompanies: result.production_companies}
    }
}
~~~

- Voy al caso de uso, utilizo un try catch
- Le paso el id, se lo paso como argumento y lo coloco con un template string
- Uso el mapper y retorno el resultado

~~~js
import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { IFullMovie } from "../../../infraestructure/interfaces/full-movie.interface";
import { FullMovieMapper } from "../../../infraestructure/mappers/full-movie.mapper";
import { FullMovie } from "../../entities/movie.entity";

export const getMovieUseCase = async (fetcher: HttpAdapter, id: number): Promise<FullMovie>=>{

    try { 
        const getFullMovie = await fetcher.get<IFullMovie>(`/3/movie/${id}`)

        const fullMovie = FullMovieMapper.fromMovieDBToEntity(getFullMovie)
        
        return fullMovie
    
    } catch (error) {
        throw new Error("Can't get full movie")
    }

}
~~~

- Puedo ir al hook, antes debo crear el adaptador

~~~js
import { AxiosAdapter } from "./axios.adapter";

const fullMovieAdapter = new AxiosAdapter({
    baseURL: "https://api.themoviedb.org",
    params: {
        api_key: "",
        language: 'es'
    }
})
~~~

- Exporto el caso de uso desde el archivo de barril y voy al hook useMovie
- Desde el useEffect disparo la función
- En la función cambio el isLoading a true
- Hago uso del caso de uso, le paso el adaptador  y el id (que tendré en DetailsScreen)
- Pongo el isLoading en false y retorno en el objeto los dos estados

~~~js
import React, { useEffect, useState } from 'react'
import * as UseCase from '../../core/use-cases'
import { FullMovie } from '../../core/entities/movie.entity'
import { fullMovieAdapter } from '../../config/adapters/http/fullMovie.adapter'

const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(true)
  const [fullMovie, setFullMovie] = useState<FullMovie>()

  useEffect(()=>{
    loadMovie()
  
},[movieId])

  const loadMovie = async()=>{
    setIsLoading(true)

    const fullMovieResult = await UseCase.getMovieUseCase(fullMovieAdapter, movieId)
    setFullMovie(fullMovieResult)
    setIsLoading(false)
  }
  
    return {
      isLoading,
      fullMovie
    }
}

export default useMovie
~~~

- Ahora puedo ir a DetailsScreen y desestructurar el state del hook
- Renderizo el título en pantalla
- Ahora ya tengo la info, solo es hacer un poco de carpíntería

~~~js
import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text, View } from 'react-native'
import { RootStackParams } from '../../navigation/Navigation'
import useMovie from '../../hooks/useMovie'

interface Props extends StackScreenProps<RootStackParams, 'Details'>{}

export const Detailsscreen  = ({route}:Props) => {

  const {movieId} = route.params

  const{fullMovie} = useMovie(movieId)

  return (
    <View>
      <Text>{fullMovie?.title}</Text>
    </View>
  )
}
~~~
------

## Pantalla de detalles - Header

- 