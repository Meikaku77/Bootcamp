# REACT NATIVE - NAVEGACION

## Tipos de Navegación

- Usaremos el paquete React Navigation
- Tenemos:
    - **Stack Navigation**: las pantallas se apilan como en una baraja de cartas
    - **Drawer Navigation**: abre un menú lateral
    - **BottomTab Navigation**: tienes las opciones en el bottom
    - **MaterialTop Navigation**: tienes las opciones en el top
- Se pueden combinar. Tiene su ciencia! 
- Con navigation.navigate navegamos entre las pantallas
- En Stack Navigation podemos deshacernos de las pantallas con **navigation.pop**, con **popToTop** volvemos a la primera, con **goBack** a la anterior
----

## Instalaciones

- Creo los directorios en src
    - **presentation**: la capa de presentacion, lo que está cerca del usuario. Componentes, visualización y demás
        - Dentro de presentation creo **screens** para las pantallas, **theme** para los estilos globales con theme.ts, **routes** para las rutas y **components**
    - Dentro de screens creo una carpeta **home** con la **HomeScreen.tsx**
    - Creo otras dos carpetas dentro de screens llamada products con ProductScreen.tsx y ProductsScreen.tsx y tabs con Tab1Screen, 2 y 3
    - Creo también la carpeta about dentro de screens con la AboutScreen.tsx
    - Creo otra carpeta dentro de screens llamada profiles con ProfileScreen.tsx y settings con SettingsScreen.tsx

> npm i @react-navigation/native
> npm install react-native-gesture-handler

- Usa import 'react-native-gesture-handler' en App.tsx **encima de todos los import**
- Lanza la app para ver si hay algún error
- Si da error con la ruta HOME de JAVA colocar la ruta en gradle.properties

~~~
org.gradle.java.home=C:\\Program Files\\Java\\jdk-17
~~~

- Si da error  de React.jsx: type is invalid, cambiar App por una función de flecha, no exportarlo por default y cambiar la exportación en index.js

~~~js
import 'react-native-gesture-handler';
import React from 'react';
import { Text, View } from 'react-native';


export const App=(): React.JSX.Element=> {


  return (
    <View>
      <Text>Hello world</Text>
    </View>
  );
}
~~~

- index.js
~~~js
import {AppRegistry} from 'react-native';
import {App} from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
~~~

## React Navigation Stack

- Instalación

> npm i @react-navigation/stack
> npm install @react-native-masked-view/masked-view

- En presentation/routes creo el archivo stackNavigator.tsx
- Creo una navegación con el ejemplo de la documentación y le añado mis componentes

~~~js
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ProductScreen } from '../screens/products/ProductScreen';
import { ProductsScreen } from '../screens/products/ProductsScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
    </Stack.Navigator>
  );
}
~~~

- 