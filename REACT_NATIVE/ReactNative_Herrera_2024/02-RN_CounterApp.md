## 02 REACT NATIVE - COUNTER APP

- Usaremos Material 3
- Cambio la declaración de function App por una función de flecha y lo exporto en lugar de usar la exportación por defecto

~~~js
import React from 'react';
import { Text, View } from 'react-native';


export const App= (): React.JSX.Element=> {

  return(
    <View>
      <Text>Hola Mundo</Text>
    </View>
   )
 
}
~~~

- Debo cambiar también la importación de App en index.js y colocarlo entre llaves

~~~js
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {App} from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
~~~
-----

## Explicación de archivos y directorios

- .watchmanconfig (no se suele necesitar modificarlo)
- app.json es info básica de la app, es usado en otros directorios, pone la info en ios y android
- babel.config.js permite escribir javascript moderno
- Gemfile es el archivo de configuración de Ruby
- index.js es el main, el archivo de inicio. Cuando se lance todo la app empezará por aquí
- metro.config.js es raro que se tenga que modificar
- En las carpetas android o ios tengo la aplicación en si 
-----

## Crear pantallas independientes

- En lugar del View uso el SafeAreaView para que se renderice correctamente con el notch de ios
- En src/**presentation** creo el HelloWorldScreen.tsx y lo renderizo en App.tsx

~~~js
import React from 'react';
import { SafeAreaView, Text} from 'react-native';
import HelloWorldScreen from './src/presentation/HelloWorldScreen';


export const App= (): React.JSX.Element=> {

  return(
    <SafeAreaView>
      <HelloWorldScreen />
    </SafeAreaView>
   )
}
~~~

- Para los estilos creo el snippet con la extensión Easy Snippets, uso **stless**

~~~js
// @prefix stless
// @description 
/* eslint-disable */


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})
~~~
--------



