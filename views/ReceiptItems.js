import React, {Component, useState, useEffect} from 'react'
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {Card, BottomSheet, Button} from 'react-native-elements'
import {connect} from 'react-redux'
import axios from 'axios'
import styles from './styles'
import {AWS_URL} from '../secrets'
import cat3 from '../assets/cat3.gif'

export function ReceiptItems(props) {
  // console.log(props.items);
  const {items} = props
  const [selectedItems, updateSelectedItems] = useState([])
  const [selectedItemIds, updateSelectedItemIds] = useState([])

  const handleSelectionPress = (item) => {
    updateSelectedItems([...selectedItems, item])
    updateSelectedItemIds([...selectedItemIds, item.id])
  }

  const handleUnselectPress = (item) => {
    updateSelectedItems(
      selectedItems.filter((currentItem) => currentItem.id !== item.id)
    )
    updateSelectedItemIds(
      selectedItemIds.filter((itemId) => itemId !== item.id)
    )
  }

  const handleNext = () => {
    props.navigation.navigate('UsersList', {selectedItems})
    updateSelectedItems([])
    updateSelectedItemIds([])
  }

  return (
    <View>
      {items.length ? (
        <View styles={styles.container}>
          <Text style={styles.textsubtitle}>Select item(s) to slice</Text>
          {items && items.length ? (
            <View style={{height: '88%', backgroundColor: 'white'}}>
              <ScrollView>
                <View>
                  {selectedItems.map((item) => {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        onPress={(e) => {
                          handleUnselectPress(item)
                        }}
                      >
                        <Card
                          title={item.name}
                          containerStyle={styles.selectedItemCard}
                        >
                          <View>
                            <View style={styles.itemCard}>
                              <Text style={{color: 'white'}}>{item.name}</Text>
                              <Text style={{color: 'white'}}>{item.price}</Text>
                            </View>
                          </View>
                        </Card>
                      </TouchableOpacity>
                    )
                  })}
                </View>
                <View>
                  {items
                    .filter((item) => {
                      return (
                        !selectedItemIds.includes(item.id) && !item.assignedUser
                      )
                    })
                    .map((item) => {
                      return (
                        <TouchableOpacity
                          key={item.id}
                          onPress={(e) => {
                            handleSelectionPress(item)
                          }}
                        >
                          <Card
                            title={item.name}
                            containerStyle={{
                              borderRadius: 15,
                              backgroundColor: '#f5f5f5',
                              shadowColor: '#e3e3e3',
                              shadowOffset: {width: 2, height: 2},
                              shadowOpacity: 0.8,
                              shadowRadius: 2,
                              elevation: 5,
                            }}
                            style={styles.usersCardCol}
                          >
                            <View>
                              <View style={styles.itemCard}>
                                <Text>{item.name}</Text>
                                <Text>{item.price}</Text>
                              </View>
                            </View>
                          </Card>
                        </TouchableOpacity>
                      )
                    })}
                </View>
              </ScrollView>
            </View>
          ) : null}

          <View style={{padding: 1}}>
            <Button
              onPress={handleNext}
              buttonStyle={{backgroundColor: '#E83535'}}
              title="Next"
            />
          </View>
        </View>
      ) : (
        <View>
          <ActivityIndicator style={{paddingTop: 35}} size="large" />
        </View>
      )}
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    items: state.receipt.items,
    receiptId: state.receipt.id,
  }
}

export default connect(mapStateToProps)(ReceiptItems)
