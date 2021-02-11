import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UserHome } from '../../views/UserHome'
import { connect } from 'react-redux'

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
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

        <HomeStack.Screen name="UserHome" component={UserHome} />

    </HomeStack.Navigator>
  );
}

export default connect()(HomeStackScreen)