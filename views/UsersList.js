import React, {Component, useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native'
import pie from '../assets/pie.jpg'
import styles from './styles'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import {ScrollView} from 'react-native-gesture-handler'
import {Card, Overlay, Button} from 'react-native-elements'
import {searchUsersThunk, clearUsers} from '../store/users'
import {assignUser} from '../store/receipt'
import {addMe} from '../store/users'
import {AWS_URL} from '../secrets'

// prevents useEffect from running on component mount
const useDidUpdateEffect = (fn, inputs) => {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current) fn()
    else didMountRef.current = true
  }, inputs)
}

export function UsersList(props) {
  const {selectedItems} = props.route.params
  const {navigation, users, searchUsers, items} = props
  const [visible, setVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})
  let textInput

  useEffect(() => {
    if (!props.users.length) {
      props.addMyself(props.me)
    }
  }, [])

  const toggleOverlay = () => {
    setVisible(!visible)
  }

  const handleTextChange = (searchTerm) => {
    if (searchTerm === '') {
      props.clearUsers()
      props.addMyself()
    } else {
      searchUsers(searchTerm)
    }
  }

  const handleSelectionPress = (user) => {
    setSelectedUser(user)
    setVisible(true)
  }

  // runs when items are updated via assignment
  useDidUpdateEffect(() => {
    async function postAssignment(requestBody) {
      try {
        await axios.post(
          `${AWS_URL}receipts/${props.receiptId}/assign`,
          requestBody
        )
        navigation.navigate('UserHome', {
          success: true,
          receiptId: props.receiptId,
        })
      } catch (err) {
        console.log(err)
      }
    }
    // check if all items are assigned
    if (!items.filter((item) => !item.assignedUser).length) {
      // all the items are assigned
      // build request body
      let assignmentPostBody = items.reduce((requestBody, currentItem) => {
        let foundUserFlag = false
        requestBody = requestBody.map((userAssignment) => {
          //check if user already has items in the request body
          // if so, add item to their existing array of items: assignedItems
          if (userAssignment.userId === currentItem.assignedUser) {
            foundUserFlag = true
            return {
              ...userAssignment,
              assignedItems: [
                ...userAssignment.assignedItems,
                {itemId: currentItem.id, price: currentItem.price},
              ],
            }
          } else {
            return userAssignment
          }
        })
        // if user was not already in request body, add an entry for the user
        if (!foundUserFlag) {
          requestBody.push({
            userId: currentItem.assignedUser,
            assignedItems: [
              {
                itemId: currentItem.id,
                price: currentItem.price,
              },
            ],
          })
        }
        return requestBody
      }, [])
      // fire thunk to assign items
      postAssignment(assignmentPostBody)
    } else {
      // not done assigning, go to receipt items list
      console.log('NAVIGATION STATE IS: ', navigation.dangerouslyGetState())
      let routes = navigation.dangerouslyGetState().routes
      if (routes[routes.length - 1].name === 'UserHome') return
      navigation.navigate('ReceiptItems')
    }
  }, items)

  const handleUserConfirmation = () => {
    const itemIds = selectedItems.map((item) => item.id)
    props.confirmUser(selectedUser.id, itemIds)
    setVisible(false)
    textInput.clear()
    props.clearUsers()
    // clear users
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        // justifyContent: 'center',
        height: '100%',
      }}
    >
      <Text style={styles.texttitle}>Select Slicer</Text>
      <TextInput
        ref={(input) => {
          textInput = input
        }}
        style={styles.credentialinput}
        onChangeText={handleTextChange}
      />

      <View style={{width: '100%'}}>
        <ScrollView>
          {users.map((user) => {
            const name = `${user.firstName} ${user.lastName}`
            return (
              <TouchableOpacity
                key={user.email}
                onPress={(e) => {
                  handleSelectionPress(user)
                }}
              >
                <View style={{width: '100%'}}>
                  <Card
                    title={name}
                    containerStyle={{
                      borderRadius: 15,
                      backgroundColor: '#f5f5f5',
                      shadowColor: '#e3e3e3',
                      shadowOffset: {width: 2, height: 2},
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5,
                    }}
                  >
                    <View style={styles.userCard}>
                      <Text style={{fontSize: 25}}>{name} </Text>
                      <Text style={{flexWrap: 'wrap'}}>{user.email}</Text>
                    </View>
                  </Card>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={{padding: 25, paddingBottom: 1, paddingTop: 15}}>
          <Text style={{fontSize: 30, paddingBottom: 10}}>
            {`${selectedUser.firstName} ${selectedUser.lastName}`}
          </Text>
          {selectedItems.map((item) => {
            return (
              <View
                key={item.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{marginBottom: 25, fontSize: 15}}
                >{`${item.name}`}</Text>
                <Text style={{fontSize: 15}}>{`${item.price}`}</Text>
              </View>
            )
          })}
          <Button
            buttonStyle={{backgroundColor: '#E83535', borderRadius: 15}}
            onPress={handleUserConfirmation}
            title="Slice"
          ></Button>
        </View>
      </Overlay>
    </View>
  )
}

const mapState = (state) => {
  return {
    me: state.user,
    users: state.users,
    items: state.receipt.items,
    receiptId: state.receipt.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    searchUsers: (searchTerm) => dispatch(searchUsersThunk(searchTerm)),
    addMyself: (me) => dispatch(addMe(me)),
    clearUsers: () => dispatch(clearUsers()),
    confirmUser: (userId, itemIds) => {
      dispatch(assignUser(userId, itemIds))
    },
  }
}

export default connect(mapState, mapDispatch)(UsersList)
