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




