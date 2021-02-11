import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    LoadingPage,
    Home,
    Login,
    Signup,
  } from "../../views";

const LandingStack = createStackNavigator();

export default function Landing() {
  return (
    <LandingStack.Navigator
        screenOptions={{
            gestureEnabled: false,
            headerTitleAlign: "center",
            headerStyle: {
            backgroundColor: "#E83535",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
            },
        }}
    >
        <LandingStack.Screen name="LoadingPage" component={LoadingPage} />
        <LandingStack.Screen name="Home" component={Home} />
        <LandingStack.Screen name="Login" component={Login} />
        <LandingStack.Screen name="Signup" component={Signup} />
    </LandingStack.Navigator>
  );
}