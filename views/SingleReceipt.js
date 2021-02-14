import React, {useState, useEffect} from 'react'
import {Button, Image, StyleSheet, Text, View, ScrollView} from 'react-native'
import {Divider} from 'react-native-paper'
import {connect} from 'react-redux'
import styles from './styles'
import setDollar from '../util/setDollar'

export function SingleReceipt(props) {
  const {receipt} = props
  const [arrangedReceipt, setArrangedReceipt] = useState(null)

  useEffect(() => {
    arrangeReceipt()
  }, [receipt])

  const arrangeReceipt = () => {
    // make sure necessary data is present
    if (
      !!receipt &&
      receipt.items.length !== 0 &&
      !!receipt.items[0].itemizedTransactions &&
      receipt.items[0].itemizedTransactions.length !== 0
    ) {
      let organizedObj = receipt.items.reduce((reducedReceipt, item) => {
        let fullName =
          item.itemizedTransactions[0].debtor.firstName +
          ' ' +
          item.itemizedTransactions[0].debtor.lastName
        if (reducedReceipt[fullName]) {
          // add item
          reducedReceipt[fullName].push(item)
        } else {
          // create new person with item
          reducedReceipt[fullName] = [item]
        }
        return reducedReceipt
      }, {})
      let returnArray = []

      for (let fullName in organizedObj) {
        returnArray.push({items: organizedObj[fullName], fullName})
      }

      setArrangedReceipt(returnArray)
    } else {
      return null
    }
  }

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
            <Text style={[singleReceiptStyles.cochin]}>
              Your requests have been sent!
            </Text>
          </View>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 10,
          }}
        >
          <Text
            style={[
              singleReceiptStyles.cochin,
              {fontSize: 20, marginRight: 80},
            ]}
          >
            Amount:
          </Text>
          <Text style={[singleReceiptStyles.cochin, {fontSize: 20}]}>
            ${setDollar(receipt.total)}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={[
              singleReceiptStyles.cochin,
              {fontSize: 20, paddingBottom: 5},
            ]}
          >
            Created:
          </Text>
          <Text
            style={[
              singleReceiptStyles.cochin,
              {fontSize: 20, paddingBottom: 5},
            ]}
          >
            {receipt.createdAt.slice(0, 10)}
          </Text>
        </View>

        <Divider />
      </View>
      <ScrollView style={{flex: 1}}>
        {arrangedReceipt
          ? arrangedReceipt.map((assignee) => {
              return (
                <View
                  key={assignee.fullName}
                  style={{
                    // flexGrow: 1,
                    marginTop: 8,
                    marginBottom: 10,
                    paddingBottom: 5,
                    borderRadius: 15,
                    backgroundColor: '#f5f5f5',
                    shadowColor: '#e3e3e3',
                    shadowOffset: {width: 2, height: 2},
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                  }}
                >
                  <View style={{flexDirection: 'column'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 5,
                      }}
                    >
                      <Text
                        style={[singleReceiptStyles.cochin, {fontSize: 20}]}
                      >
                        {assignee.fullName}
                      </Text>
                    </View>
                    <View
                      style={{flexDirection: 'row', justifyContent: 'center'}}
                    >
                      <Text
                        style={[singleReceiptStyles.cochin, {fontSize: 17}]}
                      >
                        {assignee.items[0].itemizedTransactions[0].paid
                          ? 'Paid'
                          : 'Pending'}
                      </Text>
                    </View>

                    {assignee.items.map((item) => {
                      return (
                        <View
                          key={item.id}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 5,
                          }}
                        >
                          <Text
                            style={[singleReceiptStyles.cochin, {fontSize: 15}]}
                          >
                            {item.name}
                          </Text>
                          <Text
                            style={[singleReceiptStyles.cochin, {fontSize: 15}]}
                          >
                            ${setDollar(item.price)}
                          </Text>
                        </View>
                      )
                    })}
                    <Divider />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 5,
                      }}
                    >
                      <Text
                        style={[
                          singleReceiptStyles.cochin,
                          {fontSize: 15, fontWeight: 'bold'},
                        ]}
                      >
                        Total
                      </Text>
                      <Text
                        style={[
                          singleReceiptStyles.cochin,
                          {fontSize: 15, fontWeight: 'bold'},
                        ]}
                      >
                        $
                        {setDollar(
                          assignee.items.reduce((total, item) => {
                            return item.price + total
                          }, 0)
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              )
            })
          : null}
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

const singleReceiptStyles = StyleSheet.create({
  cochin: {
    fontFamily: 'Cochin',
  },
})
