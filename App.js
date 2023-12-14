import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


const Stack = createStackNavigator();

import Login from './screens/Login';
import Home from './screens/Home';
import Nodos from './screens/Nodos';
import Datos from './screens/Datos';
import TableData from './screens/TableData';
import CardData from './screens/CardData';
import GraphTemperature from './screens/GraphTemperature';
import GraphHumidity from './screens/GraphHumidity';
import Client from './screens/Client';

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Nodos" component={Nodos} />
      <Stack.Screen name="Datos" component={Datos} />
      <Stack.Screen name="TableData" component={TableData} />
      <Stack.Screen name="CardData" component={CardData} />
      <Stack.Screen name="GraphTemperature" component={GraphTemperature} />
      <Stack.Screen name="GraphHumidity" component={GraphHumidity} />
      <Stack.Screen name="Client" component={Client} />
       

    </Stack.Navigator>
  )
}
//

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  }
});