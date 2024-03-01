import 'react-native-gesture-handler';
import React from 'react';
import { StackNavigator } from './src/presentation/routes/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';


export const App=(): React.JSX.Element=> {

  return (
    <NavigationContainer>
        <StackNavigator />
    </NavigationContainer>
  );
}
