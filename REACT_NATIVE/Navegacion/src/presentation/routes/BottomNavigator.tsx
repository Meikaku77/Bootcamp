import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tab1Screen } from '../screens/tabs/Tab1Screen';
import { Tab2Screen } from '../screens/tabs/Tab2Screen';
import { Tab3Screen } from '../screens/tabs/Tab3Screen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export const BottomNavigator=()=> {
  return (
    <Tab.Navigator
    sceneContainerStyle={{
        backgroundColor: 'rgba(241, 237, 231, 0.2)',
    }}
    screenOptions={{
        //headerShown: false,
        tabBarLabelStyle:{
            marginBottom: 5
        },
        headerStyle: { //eliminar la linea 
            elevation: 0,
            borderColor: 'transparent',
            shadowColor: 'transparent'
        },
        tabBarStyle:{ //para eliminar la linea en ios
            borderTopWidth: 0,
            elevation: 0
        }

    }}
    >
      <Tab.Screen name="Tab1" options={{title: "Tab1", tabBarIcon: ({color})=>(<Text style={{color: color}}>Tab</Text>)}} component={Tab1Screen} />
      <Tab.Screen name="Tab2" options={{title: "Tab2", tabBarIcon: ({color})=>(<Text style={{color: color}}>Tab</Text>)}}  component={Tab2Screen} />
      <Tab.Screen name="Tab3" options={{title: "Tab3", tabBarIcon: ({color})=>(<Text style={{color: color}}>Tab</Text>)}}  component={Tab3Screen} />
    </Tab.Navigator>
  );
}