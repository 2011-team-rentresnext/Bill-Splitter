import * as React from 'react';
import 'react-native-gesture-handler';
import { View, Text, LogBox, Image, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Home from './client/views/Home'
import Login from './client/views/Login'

const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      
      <Stack.Navigator>

        <Stack.Screen
               name='Home' 
               component={Home} 
        />

        <Stack.Screen
               name='Login' 
               component={Login} 
        />

      </Stack.Navigator>

    </NavigationContainer>


  )

}













const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    margin: 5,
  },
});
