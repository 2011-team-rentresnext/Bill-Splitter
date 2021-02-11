import * as React from "react";
import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {  createStackNavigator} from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './Home'
import {connect} from 'react-redux'

const Tab = createBottomTabNavigator();

function TabsIndex(){

    return (
        <Tab.Navigator>
          <Tab.Screen name="Slice" component={HomeStackScreen} />
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Transaction" component={HomeStackScreen} />
        </Tab.Navigator>

    );
}

export default connect()(TabsIndex)

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
