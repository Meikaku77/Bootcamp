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

~~~




