import * as React from 'react';
import 'react-native-gesture-handler';
import { View, Text, LogBox, Image, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { 
  Login,
  Signup,
  Home,
  UserHome,
  History,
  Scanner
 } from './client/views'



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

        <Stack.Screen
               name='Signup' 
               component={Signup} 
        />

        <Stack.Screen
               name='UserHome' 
               component={UserHome} 
        />
        
        <Stack.Screen
               name='History' 
               component={History} 
        />
        
        <Stack.Screen
               name='Scanner' 
               component={Scanner} 
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
