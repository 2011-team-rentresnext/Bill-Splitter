import React, {useState, useEffect} from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import {Button, Overlay} from 'react-native-elements'
import {Divider} from 'react-native-paper'
import axios from 'axios'
import styles from './styles'
import setDollar from '../util/setDollar'
import {AWS_URL} from '../secrets'

export function SingleDebt(props) {
  const {debt, user} = props.route.params
  const [completedPayment, setCompletedPayment] = useState(false)
  const [loading, setLoading] = useState(false)
  const handlePaid = async () => {
    setLoading(true)
    try {
      await axios.put(`${AWS_URL}receipts/${debt.receipt.id}/settle`)
      setCompletedPayment(true)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          padding: 25,
          paddingRight: 40,
          paddingLeft: 40,
        }}
      >
        <Text style={componentStyles.bigger}>Created</Text>
        <Text style={componentStyles.bigger}>
          {debt.receipt.createdAt.slice(0, 10)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingBottom: 25,
          paddingRight: 40,
          paddingLeft: 40,
        }}
      >
        <Text style={componentStyles.bigger}>Total</Text>
        <Text style={componentStyles.bigger}>${setDollar(debt.totalDebt)}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingBottom: 25,
          paddingRight: 40,
          paddingLeft: 40,
        }}
      >
        <Text style={componentStyles.bigger}>Created by</Text>
        <Text style={componentStyles.bigger}>
          {user.id === debt.creditor.id
            ? 'Me'
            : `${debt.creditor.firstName} ${debt.creditor.lastName}`}
        </Text>
      </View>
      <Divider style={{padding: 1, width: '100%'}} />

      <Text style={[componentStyles.bigger, {margin: 20}]}>Items</Text>
      <ScrollView style={{width: '100%'}}>
        {debt.items.map((item) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                paddingBottom: 25,
                paddingRight: 40,
                paddingLeft: 40,
              }}
              key={item.id}
            >
              <Text style={componentStyles.smaller}>{item.name}</Text>
              <Text style={componentStyles.smaller}>
                ${setDollar(item.price)}
              </Text>
            </View>
          )
        })}
      </ScrollView>
      <View style={{width: '100%'}}>
        <Button
          disabled={completedPayment}
          buttonStyle={{
            backgroundColor: '#E83535',
            // borderRadius: 15,
            marginTop: 10,
            paddingBottom: 15,
          }}
          style={{width: '100%'}}
          onPress={handlePaid}
          titleStyle={{fontFamily: 'Cochin', fontSize: 35}}
          title={completedPayment ? 'Paid' : 'Mark as Paid'}
        />
      </View>
      <Overlay
        isVisible={loading}
        overlayStyle={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: 'rgba(52, 52, 52, 0.8)',
        }}
        fullScreen
      >
        <ActivityIndicator />
      </Overlay>
    </View>
  )
}

export default SingleDebt

const componentStyles = StyleSheet.create({
  bigger: {
    fontFamily: 'Cochin',
    fontSize: 30,
  },
  smaller: {
    fontFamily: 'Cochin',
    fontSize: 20,
  },
})

// const debt = {
//   creditor: {
//     id: 107,
//     firstName: 'J',
//     lastName: 'J',
//     email: 'j@gmail.com',
//   },
//   receipt: {
//     id: 240,
//     total: 4650,
//     createdAt: '2021-02-12T17:47:03.474Z',
//     updatedAt: '2021-02-12T17:47:03.474Z',
//     creditorId: 107,
//   },
//   items: [
//     {
//       id: 990,
//       name: 'Wine',
//       price: 850,
//       createdAt: '2021-02-12T17:47:03.487Z',
//       updatedAt: '2021-02-12T17:47:03.487Z',
//       receiptId: 231,
//     },
//     {
//       id: 991,
//       name: 'Beer',
//       price: 1300,
//       createdAt: '2021-02-12T17:47:03.491Z',
//       updatedAt: '2021-02-12T17:47:03.491Z',
//       receiptId: 231,
//     },
//   ],
//   totalDebt: 2150,
// }
