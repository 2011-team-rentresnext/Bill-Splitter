import * as React from "react";
import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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
} from "./views";
import { Provider } from "react-redux";
import store from "./store";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* TODO:change component to Home */}
          <Stack.Screen name="Home" component={ReceiptItems} />

          <Stack.Screen name="Login" component={Login} />

          <Stack.Screen name="Signup" component={Signup} />

          <Stack.Screen name="UserHome" component={UserHome} />

          <Stack.Screen name="History" component={History} />

          <Stack.Screen name="Scanner" component={Scanner} />

          <Stack.Screen name="UsersList" component={UsersList} />

          <Stack.Screen name="ReceiptItems" component={ReceiptItems} />

          <Stack.Screen name="SuccessPage" component={SuccessPage} />
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
