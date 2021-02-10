import React, {Component, useState, useEffect} from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import {Card, Overlay} from 'react-native-elements'
import styles from './styles'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import {ImageBackground} from 'react-native'
import pic from '../assets/HandsomeSquidward.png'
import profile from '../assets/profile.png'
import {connect} from 'react-redux'
import {logout} from '../store'

export function UserHome(props) {
  const {route, navigation} = props
  const {user} = props
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (props.route && props.route.params && props.route.params.success) {
      setVisible(true)
    }
  }, [route])

  const toggleOverlay = () => {
    setVisible(!visible)
  }

  const handlePressLogout = () => {
    props.logout()
    props.navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={profile} style={styles.container}>
        <View style={styles.navbar}>
          <Text
            style={styles.navtextsmall}
            onPress={() => alert(`Settings component coming soon`)}
          >
            Settings{' '}
          </Text>

          <Text onPress={handlePressLogout} style={styles.navtextsmall}>
            Logout
          </Text>
        </View>
        <View style={{height: 20}}></View>

        <Image source={pic} style={styles.profileimage} />

        <Text style={styles.profilenametext}>{user.fullName}</Text>

        <Text style={styles.profileemailtext}>{user.email}</Text>

        <Text>
          {'\n'}
          {'\n'}
          {'\n'}
        </Text>

        <TouchableOpacity
          style={styles.loginbutton}
          onPress={() => navigation.navigate('Scanner')}
        >
          <Text style={styles.logintext}>Start Slicing!</Text>
        </TouchableOpacity>

        {/*
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
              */}
        <Text>
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
        </Text>
      </ImageBackground>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>Success!</Text>
      </Overlay>
    </View>
  )
}

const mapState = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  }
}

export default connect(mapState, mapDispatch)(UserHome)
