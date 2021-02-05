import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { ImageBackground } from 'react-native';
import pic from '../assets/HandsomeSquidward.png';
import profile from '../assets/profile.png';
import { connect } from 'react-redux';
import { logout } from '../store'


class UserHome extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      image: '',
    };
  }

  handlePressLogout = () => {
    this.props.logout();
    this.props.navigation.navigate('Home');
  };

  render() {
    const { navigation } = this.props;
    const { user } = this.props

    return (
      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <ImageBackground source={profile} style={styles.container}>
              <View style={styles.navbar}>
                <Text style={styles.navtextsmall}>Settings {'\n'} </Text>
                <Text style={styles.navtextbig}>Home </Text>
                <Text
                  onPress={this.handlePressLogout}
                  style={styles.navtextsmall}>Logout</Text>
              </View>

              <Image source={pic} style={styles.profileimage} />

              <Text style={styles.profilenametext}>{user.fullName}</Text>

              <Text style={styles.profileemailtext}>{user.email}</Text>

              <Text>{'\n'}</Text>

              <TouchableOpacity
                style={styles.loginbutton}
                onPress={() => navigation.navigate('Scanner')}
              >
                <Text style={styles.logintext}>Start Slicing!</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('FriendsList')}
                style={styles.loginbutton}
              >
                <Text style={styles.logintext}>Slicing Friends</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginbutton}>
                <Text
                  style={styles.logintext}
                  onPress={() => navigation.navigate('History')}
                >
                  Slicing History
                </Text>
              </TouchableOpacity>
              
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    );
  }
}


const mapState = (state) => {
  return {
    user: state.user
  }
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch( logout() ),
  };
};

export default connect(mapState, mapDispatch)(UserHome)