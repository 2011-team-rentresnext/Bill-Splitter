import React, {useState, useEffect} from 'react'
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native'
import {Card, Overlay} from 'react-native-elements'
import styles from './styles'
import {connect} from 'react-redux'
import {logout} from '../store'
import {fetchReceipt} from '../store/receipt'
import {Entypo} from '@expo/vector-icons'
import {MaterialIcons} from '@expo/vector-icons'
import SingleReceipt from './SingleReceipt'

export function UserHome(props) {
  const {route, navigation} = props
  const {user} = props
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (
      props.route &&
      props.route.params &&
      props.route.params.success &&
      props.route.params.receiptId
    ) {
      setVisible(true)
      console.log('THE RECEIPT ID IS : ', props.route.params.receiptId)
      props.getReceipt(props.route.params.receiptId)
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
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        height: '100%',
      }}
    >
      {/* HEADER */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          padding: 10,
        }}
      >
        <Text style={styles.profilenametext}>Welcome, {user.firstName}!</Text>
      </View>

      {/* MAIN BODY */}
      <ScrollView>{/* OLD RECEIPTS GO HERE */}</ScrollView>

      {/* FOOTER */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 100,
          justifyContent: 'space-around',
          paddingBottom: 5,
          // backgroundColor: 'black',
        }}
      >
        {/* SCAN BUTTON */}
        <View
          style={{
            width: '32%',
            height: '100%',
            paddingRight: 1,
            paddingLeft: 1,
            paddingTop: 2,
          }}
        >
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('Scanner')}
          >
            <Entypo name="camera" size={45} color="black" />
          </TouchableOpacity>
        </View>

        {/* GALLERY BUTTON */}
        <View
          style={{
            width: '32%',
            height: '100%',
            paddingLeft: 1,
            paddingRight: 1,
            paddingTop: 2,
          }}
        >
          <TouchableOpacity style={styles.footerButton}>
            <Entypo name="upload" size={45} color="black" />
          </TouchableOpacity>
        </View>

        {/* DEBTS BUTTON */}
        <View
          style={{width: '32%', paddingLeft: 1, paddingTop: 2, paddingRight: 1}}
        >
          <TouchableOpacity style={styles.footerButton}>
            <MaterialIcons name="payment" size={45} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* OVERLAY */}
      <Overlay
        overlayStyle={{height: '60%'}}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <SingleReceipt success />
      </Overlay>
    </View>
  )
}

const mapState = (state) => {
  return {
    user: state.user,
    receipt: state.receipt,
  }
}

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    getReceipt: (receiptId) => dispatch(fetchReceipt(receiptId)),
  }
}

export default connect(mapState, mapDispatch)(UserHome)
