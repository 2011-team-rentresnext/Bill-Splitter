import * as React from 'react'
import 'react-native-gesture-handler'
import {StyleSheet, Button, TouchableOpacity} from 'react-native'
import {Entypo} from '@expo/vector-icons'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack'
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
  SingleDebt,
} from './views'
import {Provider} from 'react-redux'
import {Menu, Divider} from 'react-native-paper'
import {Provider as PaperProvider} from 'react-native-paper'
import store from './store'
import {navigationRef, navigate} from './RootNavigation'

const Stack = createStackNavigator()

export default function App(props) {
  const [visible, setVisible] = React.useState(false)

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              headerRight: () => (
                <TouchableOpacity
                  style={{paddingRight: 15}}
                  onPress={() => navigate('UserHome')}
                >
                  <Entypo name="home" size={24} color="white" />
                </TouchableOpacity>
              ),
              gestureEnabled: false,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#E83535',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 25,
                fontFamily: 'Cochin',
              },
              headerBackTitleStyle: {
                fontFamily: 'Cochin',
              },
              headerTitle: 'Sliced',
            }}
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: '',
                headerLeft: null,
                headerRight: null,
              }}
            />

            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: '',
                headerBackTitle: 'Back',
                headerRight: null,
              }}
            />

            <Stack.Screen
              name="UserHome"
              component={UserHome}
              options={{
                title: '',
                headerLeft: null,
                headerRight: () => (
                  <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                      <TouchableOpacity
                        style={{paddingRight: 15}}
                        onPress={openMenu}
                      >
                        <Entypo name="menu" size={24} color="white" />
                      </TouchableOpacity>
                    }
                  >
                    <Menu.Item
                      onPress={() => {
                        navigate('Home')
                      }}
                      contentStyle={{alignItems: 'center'}}
                      titleStyle={{fontFamily: 'Cochin', fontSize: 20}}
                      title="Logout"
                    />
                  </Menu>
                ),
              }}
            />

            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                title: '',
                headerBackTitle: 'Back',
                headerRight: null,
              }}
            />

            <Stack.Screen
              name="History"
              options={{
                title: '',
                headerBackTitle: 'Back',
              }}
              component={History}
            />

            <Stack.Screen
              name="Scanner"
              options={{
                title: '',
                headerBackTitle: 'Home',
              }}
              component={Scanner}
            />

            <Stack.Screen
              name="UsersList"
              options={{
                title: '',
                headerBackTitle: 'Back',
              }}
              component={UsersList}
            />

            <Stack.Screen
              name="ReceiptItems"
              options={{
                title: '',
                headerBackTitle: 'Retake',
              }}
              component={ReceiptItems}
            />

            <Stack.Screen
              name="SingleDebt"
              component={SingleDebt}
              options={{
                headerBackTitle: 'Back',
              }}
            />

            <Stack.Screen name="SuccessPage" component={SuccessPage} />
            <Stack.Screen
              name="FriendsList"
              component={FriendsList}
              options={{
                title: 'Friends',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
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
})
