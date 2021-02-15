import React, {useState, useEffect} from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native'
import {Card, Overlay} from 'react-native-elements'
import {Feather} from '@expo/vector-icons'
import styles from './styles'
import {connect} from 'react-redux'
import {logout} from '../store'
import {fetchReceipt, scanReceipt, clearReceipt} from '../store/receipt'
import {checkNotifications} from '../store/user'
import {Entypo} from '@expo/vector-icons'
import {MaterialIcons} from '@expo/vector-icons'
import SingleReceipt from './SingleReceipt'
import * as ImagePicker from 'expo-image-picker'
import {ListItem, ListItemSeparator} from '../components/lists'
import {fetchReceipts} from '../store/receipts'
import date from '../util/date'

function UserHome(props) {
  const {
    route,
    navigation,
    user,
    receipts,
    clearReceipt,
    scanReceipt,
    getReceipts,
  } = props
  console.log('receipts', receipts)
  const [visible, setVisible] = useState(false)
  const [notificationVisible, setNotificationVisible] = useState(
    !!props.user.hasOutstandingDebts
  )
  const [error, setError] = useState(null)

  useEffect(() => {
    getReceipts()
    const checkNotifications = navigation.addListener('focus', () => {
      props.checkNotifications(user.id)
    })
    return checkNotifications
  }, [navigation])

  useEffect(() => {
    if (
      props.route &&
      props.route.params &&
      props.route.params.success &&
      props.route.params.receiptId
    ) {
      console.log('THE RECEIPT ID IS : ', props.route.params.receiptId)
      props
        .getReceipt(props.route.params.receiptId)
        .then(() => setVisible(true))
    }
  }, [route])

  const takePictureAsync = async () => {
    let {granted} = await ImagePicker.requestCameraPermissionsAsync()
    if (!granted) alert('Permission to access camera is required!')
    const {cancelled, base64} = await ImagePicker.launchCameraAsync({
      base64: true,
    })
    if (!cancelled) {
      try {
        clearReceipt()
        scanReceipt(base64)
        props.navigation.navigate('ReceiptItems')
      } catch (error) {
        setError(`Error: ${error.message}`)
        console.log('Error taking picture', error)
      }
    }
  }
  const selectPictureAsync = async () => {
    let {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!granted) alert('Permission to access camera roll is required!')
    const {cancelled, base64} = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    })
    if (!cancelled) {
      try {
        clearReceipt()
        scanReceipt(base64)
        props.navigation.navigate('ReceiptItems')
      } catch (error) {
        setError(`Error: ${error.message}`)
        console.log('Error reading an image', error)
      }
    }
  }

  const toggleOverlay = () => {
    setVisible(!visible)
    clearReceipt()
  }

  const toggleNotificationOverlay = () => {
    setNotificationVisible(false)
  }

  const handlePressLogout = () => {
    props.logout()
    props.navigation.navigate('Home')
  }

  const handlePressReceipt = async (receiptId) => {
    await props.getReceipt(receiptId)
    setVisible(true)
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
          justifyContent: 'center',
          width: '100%',
          padding: 20,
        }}
      >
        <Text style={styles.profilenametext}>Welcome, {user.firstName}!</Text>
      </View>

      {/* MAIN BODY */}
      <FlatList
        data={receipts}
        keyExtractor={(receipt) => receipt.id}
        renderItem={({item}) => (
          <ListItem
            title={`Created: ${date(item.createdAt)}`}
            subTitle={`by ${item.user.firstName}`}
            onPress={() => handlePressReceipt(item.id)}
          />
        )}
      />

      {/* FOOTER */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 100,
          justifyContent: 'space-around',
          paddingBottom: 5,
          backgroundColor: '#969696',
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
            onPress={takePictureAsync}
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
          <TouchableOpacity
            style={styles.footerButton}
            onPress={selectPictureAsync}
          >
            <Entypo name="upload" size={45} color="black" />
          </TouchableOpacity>
        </View>

        {/* DEBTS BUTTON */}
        <View
          style={{width: '32%', paddingLeft: 1, paddingTop: 2, paddingRight: 1}}
        >
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('PendingDebts')}
          >
            <MaterialIcons
              name="payment"
              size={45}
              color={props.user.hasOutstandingDebts ? '#E83535' : 'black'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* RECEIPT OVERLAY */}
      <Overlay
        overlayStyle={{height: '60%'}}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <SingleReceipt success />
      </Overlay>

      {/* NOTIFICATION OVERLAY */}
      <Overlay
        overlayStyle={{
          position: 'absolute',
          // marginTop: '120%',
          marginBottom: 100,
          borderRadius: 15,
          bottom: 0,
        }}
        isVisible={notificationVisible}
        onBackdropPress={toggleNotificationOverlay}
      >
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: '#E83535',
              textAlign: 'center',
              fontSize: 35,
              fontFamily: 'Cochin',
            }}
          >
            Pay your friends!
          </Text>
          <Feather
            style={{marginLeft: 15}}
            name="arrow-down"
            size={40}
            color="#E83535"
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
          ></View>
        </View>
      </Overlay>
    </View>
  )
}

const mapState = (state) => {
  return {
    user: state.user,
    receipt: state.receipt,
    receipts: state.receipts,
  }
}

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    getReceipt: (receiptId) => dispatch(fetchReceipt(receiptId)),
    getReceipts: () => dispatch(fetchReceipts()),
    scanReceipt: (base64) => dispatch(scanReceipt(base64)),
    clearReceipt: () => dispatch(clearReceipt()),
    checkNotifications: (userId) => dispatch(checkNotifications(userId)),
  }
}

export default connect(mapState, mapDispatch)(UserHome)
