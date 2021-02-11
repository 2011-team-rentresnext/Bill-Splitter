import * as React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {connect} from 'react-redux'
import Landing from './Landing/Landing'
import TabsIndex from './TabNavigator/TabsIndex'

const Stack = createStackNavigator();

class NavigatorIndex extends React.Component {
    
    render(){
    return (
      <NavigationContainer>
        <Stack.Navigator
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
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{
              title: "",
              headerLeft: null,
            }}
          />

          <Stack.Screen
            name="TabsIndex"
            component={TabsIndex}
            options={{
              title: "",
              headerLeft: null,
            }}
          />

          
        </Stack.Navigator>
      </NavigationContainer>
    );
    }
}

export default connect()(NavigatorIndex)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    margin: 5,
  },
});
