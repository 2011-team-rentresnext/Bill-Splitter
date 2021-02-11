import React, {Component} from 'react'
import {Text, View, Image, TouchableOpacity} from 'react-native'
import pie from '../assets/pie.jpg'
import styles from './styles'

export default class Home extends Component {
  render() {
    const {navigation} = this.props
    return (
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

        <Image source={pie} style={styles.image} />

        <View>
          <TouchableOpacity
            style={styles.loginbutton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.logintext}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginbutton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.logintext}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
