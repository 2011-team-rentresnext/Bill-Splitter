import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import pie from '../../assets/pie.jpg';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { auth } from '../store';
import { connect } from 'react-redux';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handlePress = () => {
    this.props.login(this.state.email, this.state.password);
    navigation.navigate('UserHome');
  };

  render() {
    const { navigation } = this.props;
    return (
      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <Text style={styles.texttitle}>Slice D'Pie</Text>

            <Image source={pie} style={styles.imagelogin} resizeMode="cover" />

            <Text>
              {'\n'}
              {'\n'}
            </Text>

            <Text style={styles.usernamelabel}>UserName</Text>
            <TextInput
              style={styles.credentialinput}
              onChangeText={(email) => this.setState({ email })}
            />

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
              <Text style={styles.logintext}>Login</Text>
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
    login: (email, password) => dispatch(auth(email, password)),
  };
};

export default connect(mapState, mapDispatch)(Login);
