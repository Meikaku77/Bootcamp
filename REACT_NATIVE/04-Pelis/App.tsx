import 'react-native-gesture-handler'
import React from 'react';
import {PaperProvider} from 'react-native-paper'
import {Text} from 'react-native'

export const App=(): React.JSX.Element=>{

  return(
      <PaperProvider>
         <Text>Hello World</Text>
      </PaperProvider>      
   )
}





