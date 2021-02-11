import React, {useEffect} from 'react'
import {Text, View, Image, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {logout} from '../store/user'
import pie from '../assets/pie.jpg'
import styles from './styles'

function Home(props) {
  const {navigation} = props

  useEffect(() => {
    props.logout()
    const unsubscribe = navigation.addListener('focus', () => {
      props.logout()
    })
    return unsubscribe
  }, [navigation])

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

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  }
}

export default connect(null, mapDispatch)(Home)
