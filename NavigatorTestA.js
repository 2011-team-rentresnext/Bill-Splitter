import * as React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Login,
  Signup,
  Home,
  UserHome,
  History,
  Scanner,
  FriendsList,
  UsersList,
  ReceiptItems,
  SuccessPage,
  LoadingPage,
} from "./views";
import {connect} from 'react-redux'

const Tab = createBottomTabNavigator();

class Navigator extends React.Component {
    
    render(){
    return (
      <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home') {
                    iconName = focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline';
                  } else if (route.name === 'Settings') {
                    iconName = focused ? 'ios-list-box' : 'ios-list';
                  }
      
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
              }}
        >

          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              title: "",
              headerLeft: null,
            }}
          />

          <Tab.Screen name="Login" component={Login} />

          <Tab.Screen
            name="Signup"
            component={Signup}
            options={{
              title: "",
            }}
          />

          <Tab.Screen
            name="UserHome"
            component={UserHome}
            options={{
              title: "Home",
              headerLeft: null,
            }}
          />

          <Tab.Screen name="History" component={History} />

          <Tab.Screen name="Scanner" component={Scanner} />

          <Tab.Screen name="UsersList" component={UsersList} />

          <Tab.Screen name="ReceiptItems" component={ReceiptItems} />

          <Tab.Screen name="SuccessPage" component={SuccessPage} />
          <Tab.Screen
            name="FriendsList"
            component={FriendsList}
            options={{
              title: "Friends",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
    }
}

export default connect()(Navigator)


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
