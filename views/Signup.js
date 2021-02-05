import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { connect } from 'react-redux'
import { signup } from '../store'

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  handlePress = () => {
    this.props.signup(this.state);
    this.props.navigation.navigate('UserHome');
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <Text style={styles.texttitle}>Slice D'Pie</Text>

            <Text>{'\n'}</Text>

            <Text style={styles.usernamelabel}>First Name</Text>
            <TextInput
              style={styles.credentialinput}
              onChangeText={(firstName) => this.setState({ firstName })}
            />

            <Text>{'\n'}</Text>

            <Text style={styles.usernamelabel}>Last Name</Text>
            <TextInput
              style={styles.credentialinput}
              onChangeText={(lastName) => this.setState({ lastName })}
            />

            <Text>{'\n'}</Text>

            <Text style={styles.usernamelabel}>Email</Text>
            <TextInput
              style={styles.credentialinput}
              onChangeText={(email) => this.setState({ email })}
            />

            {/* //space */}
            <Text>{'\n'}</Text>

            <Text style={styles.usernamelabel}>Password</Text>

            <TextInput
              secureTextEntry={true}
              style={styles.credentialinput}
              onChangeText={(password) => this.setState({ password })}
            />

            <Text>{'\n'}</Text>

            <TouchableOpacity
              style={styles.loginbutton}
              onPress={this.handlePress}
            >
              <Text style={styles.logintext}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    );
  }
}

const mapState = (state) => {
  return { user: state.user };
};

const mapDispatch = (dispatch) => {
  
  return {
    signup: (newUser) => dispatch(signup(newUser)),
  };
};

export default connect(mapState, mapDispatch)(Signup);
