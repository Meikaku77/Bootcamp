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