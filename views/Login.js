import React, {useState, useEffect} from 'react'
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native'
import {Overlay} from 'react-native-elements'
import pie from '../assets/pie.jpg'
import styles from './styles'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import {auth} from '../store'
import {connect} from 'react-redux'

export function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginFailed, setLoginFailed] = useState(false)
  const [loading, setLoading] = useState(false)
  let emailInput
  let passwordInput

  const handlePress = () => {
    props.login(email, password)
    setLoading(true)
    emailInput.clear()
    passwordInput.clear()
  }

  useEffect(() => {
    setLoading(false)
    if (props.user.id) props.navigation.navigate('UserHome')
    if (props.user.error) {
      setLoginFailed(true)
      emailInput.clear()
      passwordInput.clear()
    }
  }, [props.user])

  useEffect(() => {
    setLoginFailed(false)
  }, [])

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: '100%',
          }}
        >
          <View>
            <Image source={pie} style={styles.imagelogin} resizeMode="cover" />
          </View>

          {loginFailed ? (
            <Text>Sorry, unable to login with those credentials</Text>
          ) : null}

          <View style={{alignContent: 'center', flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={styles.usernamelabel}>Email</Text>
            </View>

            <TextInput
              autoCorrect={false}
              style={styles.credentialinput}
              onChangeText={(email) => setEmail(email)}
              ref={(input) => {
                emailInput = input
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInput.focus()
              }}
              blurOnSubmit={false}
            />

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={styles.usernamelabel}>Password</Text>
            </View>
            <TextInput
              autoCorrect={false}
              secureTextEntry={true}
              style={styles.credentialinput}
              onChangeText={(password) => setPassword(password)}
              ref={(input) => {
                passwordInput = input
              }}
              onSubmitEditing={handlePress}
            />
          </View>

          <TouchableOpacity
            style={{
              marginLeft: 40,
              marginRight: 40,
              marginTop: 20,
              height: 48,
              width: 300,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#E83535',
              marginBottom: 20,
            }}
            onPress={handlePress}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 30,
                fontFamily: 'Cochin',
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <Overlay
            isVisible={loading}
            overlayStyle={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'column',
              backgroundColor: 'rgba(52, 52, 52, 0.8)',
            }}
            fullScreen
          >
            <ActivityIndicator />
          </Overlay>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  )
}

const mapState = (state) => {
  return {user: state.user}
}

const mapDispatch = (dispatch) => {
  return {
    login: (email, password) => dispatch(auth(email, password)),
  }
}

export default connect(mapState, mapDispatch)(Login)
