import React, {useState, useEffect} from 'react'
import {Button, Image, StyleSheet, Text, View, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import styles from './styles'
import setDollar from '../util/setDollar'

export function SingleReceipt(props) {
  const {receipt} = props

  return (
    <View style={{height: '100%'}}>
      <View>
        {props.success ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingBottom: 5,
            }}
          >
            <Text>Your requests have been sent!</Text>
          </View>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 10,
          }}
        >
          <Text style={{fontSize: 20}}>Amount: </Text>
          <Text style={{fontSize: 20}}>${setDollar(receipt.total)}</Text>
        </View>
        <Text style={{fontSize: 20, paddingBottom: 5}}>
          Date created: {receipt.createdAt.slice(0, 10)}
        </Text>
      </View>
      <ScrollView style={{flex: 1}}>
        {receipt.items.map((item) => {
          return (
            <View
              key={item.id ? item.id : item.itemId}
              style={{
                // flexGrow: 1,
                marginTop: 8,
                borderRadius: 15,
                backgroundColor: '#f5f5f5',
                shadowColor: '#e3e3e3',
                shadowOffset: {width: 2, height: 2},
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
              }}
            >
              {item.itemizedTransactions && item.itemizedTransactions.length ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 5,
                  }}
                >
                  <Text style={{fontSize: 15}}>
                    {item.itemizedTransactions[0].debtor.firstName}{' '}
                    {item.itemizedTransactions[0].debtor.lastName}
                  </Text>
                  <Text style={{fontSize: 15}}>
                    {item.itemizedTransactions[0].paid ? 'Paid' : 'Pending'}
                  </Text>
                </View>
              ) : null}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 5,
                }}
              >
                <Text style={{fontSize: 15}}>{item.name}</Text>
                <Text style={{fontSize: 15}}>${setDollar(item.price)}</Text>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const mapState = (state) => {
  return {
    user: state.user,
    receipt: state.receipt,
  }
}

export default connect(mapState)(SingleReceipt)
