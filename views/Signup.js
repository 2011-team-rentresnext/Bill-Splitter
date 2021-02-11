import React, {Component} from 'react'
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

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  }

  handlePress = () => {
    this.props.signup(this.state)
    this.props.navigation.navigate('UserHome')
  }

  render() {
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
            <Text style={styles.texttitle}>Sliced</Text>

            <View>
              <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <Text style={styles.usernamelabel}>First Name</Text>
              </View>
              <TextInput
                style={styles.credentialinput}
                onChangeText={(firstName) => this.setState({firstName})}
              />
            </View>

            <View>
              <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <Text style={styles.usernamelabel}>Last Name</Text>
              </View>
              <TextInput
                style={styles.credentialinput}
                onChangeText={(lastName) => this.setState({lastName})}
              />
            </View>

            <View>
              <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <Text style={styles.usernamelabel}>Email</Text>
              </View>
              <TextInput
                style={styles.credentialinput}
                onChangeText={(email) => this.setState({email})}
              />
            </View>

            <View>
              <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <Text style={styles.usernamelabel}>Password</Text>
              </View>
              <TextInput
                secureTextEntry={true}
                style={styles.credentialinput}
                onChangeText={(password) => this.setState({password})}
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
              onPress={this.handlePress}
            >
              <Text style={styles.logintext}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    )
  }
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
