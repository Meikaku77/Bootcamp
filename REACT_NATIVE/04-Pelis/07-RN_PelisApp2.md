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

- 