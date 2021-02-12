import React, {useState} from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import styles from './styles'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import {connect} from 'react-redux'
import {signup} from '../store'

function Signup(props) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let lastNameRef
  let emailRef
  let passwordRef

  handlePress = () => {
    props.signup({firstName, lastName, email, password})
    props.navigation.navigate('UserHome')
  }
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
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <Text style={styles.usernamelabel}>First Name</Text>
            </View>
            <TextInput
              autoCorrect={false}
              style={styles.credentialinput}
              onChangeText={(firstName) => setFirstName(firstName)}
              returnKeyType="next"
              onSubmitEditing={() => {
                lastNameRef.focus()
              }}
              blurOnSubmit={false}
            />
          </View>

          <View>
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <Text style={styles.usernamelabel}>Last Name</Text>
            </View>
            <TextInput
              autoCorrect={false}
              returnKeyType="next"
              style={styles.credentialinput}
              onChangeText={(lastName) => setLastName(lastName)}
              ref={(input) => {
                lastNameRef = input
              }}
              onSubmitEditing={() => {
                emailRef.focus()
              }}
              blurOnSubmit={false}
            />
          </View>

          <View>
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <Text style={styles.usernamelabel}>Email</Text>
            </View>
            <TextInput
              autoCorrect={false}
              returnKeyType="next"
              style={styles.credentialinput}
              onChangeText={(email) => setEmail(email)}
              ref={(input) => {
                emailRef = input
              }}
              onSubmitEditing={() => {
                passwordRef.focus()
              }}
              blurOnSubmit={false}
            />
          </View>

          <View>
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <Text style={styles.usernamelabel}>Password</Text>
            </View>
            <TextInput
              autoCorrect={false}
              secureTextEntry={true}
              style={styles.credentialinput}
              onChangeText={(password) => setPassword(password)}
              ref={(input) => {
                passwordRef = input
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
              marginBottom: 25,
            }}
            onPress={handlePress}
          >
            <Text style={styles.logintext}>Sign up</Text>
          </TouchableOpacity>
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
    signup: (newUser) => dispatch(signup(newUser)),
  }
}

export default connect(mapState, mapDispatch)(Signup)
