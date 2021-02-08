import * as React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
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
import { Provider } from "react-redux";
import store from "./store";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
            name="LoadingPage"
            component={LoadingPage}
            options={{
              title: "",
              headerLeft: null,
            }}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "",
              headerLeft: null,
            }}
          />

          <Stack.Screen name="Login" component={Login} />

          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              title: "",
            }}
          />

          <Stack.Screen
            name="UserHome"
            component={UserHome}
            options={{
              title: "Home",
              headerLeft: null,
            }}
          />

          <Stack.Screen name="History" component={History} />

          <Stack.Screen name="Scanner" component={Scanner} />

          <Stack.Screen name="UsersList" component={UsersList} />

          <Stack.Screen name="ReceiptItems" component={ReceiptItems} />

          <Stack.Screen name="SuccessPage" component={SuccessPage} />
          <Stack.Screen
            name="FriendsList"
            component={FriendsList}
            options={{
              title: "Friends",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

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
