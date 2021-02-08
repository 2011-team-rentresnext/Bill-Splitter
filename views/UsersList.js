import React, { Component, useState, useEffect, useRef } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import pie from "../assets/pie.jpg";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Overlay, Button } from "react-native-elements";
import { searchUsersThunk } from "../store/users";
import { assignUser } from "../store/dummyReceipt";
import { AWS_URL } from "../secrets";

// prevents useEffect from running on component mount
const useDidUpdateEffect = (fn, inputs) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, inputs);
};

export function UsersList(props) {
  const { selectedItems } = props.route.params;
  const { navigation, users, searchUsers, items } = props;
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  let textInput;

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleTextChange = (searchTerm) => {
    searchUsers(searchTerm);
  };

  const handleSelectionPress = (user) => {
    setSelectedUser(user);
    setVisible(true);
  };

  // runs when items are updated via assignment
  useDidUpdateEffect(() => {
    async function postAssignment(requestBody) {
      try {
        await axios.post(
          `${AWS_URL}receipts/${props.receiptId}/assign`,
          requestBody
        );
      } catch (err) {
        console.log(err);
      }
    }
    // check if all items are assigned
    if (!items.filter((item) => !item.assignedUser).length) {
      // all the items are assigned
      // build request body
      let assignmentPostBody = items.reduce((requestBody, currentItem) => {
        let foundUserFlag = false;
        requestBody = requestBody.map((userAssignment) => {
          //check if user already has items in the request body
          // if so, add item to their existing array of items: assignedItems
          if (userAssignment.userId === currentItem.assignedUser) {
            foundUserFlag = true;
            return {
              ...userAssignment,
              assignedItems: [
                ...userAssignment.assignedItems,
                { itemId: currentItem.itemId, price: currentItem.price },
              ],
            };
          } else {
            return userAssignment;
          }
        });
        // if user was not already in request body, add an entry for the user
        if (!foundUserFlag) {
          requestBody.push({
            userId: currentItem.assignedUser,
            assignedItems: [
              {
                itemId: currentItem.itemId,
                price: currentItem.price,
              },
            ],
          });
        }
        return requestBody;
      }, []);
      // fire thunk to assign items
      postAssignment(assignmentPostBody);
      // TO DO navigate to home page with confirmation screen
      navigation.navigate("SuccessPage");
    } else {
      // not done assigning, go to receipt items list
      navigation.navigate("ReceiptItems");
    }
  }, items);

  const handleUserConfirmation = () => {
    const itemIds = selectedItems.map((item) => item.itemId);
    props.confirmUser(selectedUser.id, itemIds);
    setVisible(false);
    textInput.clear();
  };

  return (
    <KeyboardAwareScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.texttitle}>Select Slicer</Text>
          <TextInput
            ref={(input) => {
              textInput = input;
            }}
            style={styles.credentialinput}
            onChangeText={handleTextChange}
          />

          <View style={{ width: "100%" }}>
            <ScrollView>
              {users.map((user) => {
                const name = `${user.firstName} ${user.lastName}`;
                return (
                  <TouchableOpacity
                    key={user.id}
                    onPress={(e) => {
                      handleSelectionPress(user);
                    }}
                  >
                    <View style={{ width: "100%" }}>
                      <Card title={name} style={{ width: "100%" }}>
                        <View style={styles.userCard}>
                          <Text style={{ fontSize: 25 }}>{name} </Text>
                          <Text style={{ flexWrap: "wrap" }}>{user.email}</Text>
                        </View>
                      </Card>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <Card>
              <Card.Title style={{ fontSize: 25 }}>
                {`${selectedUser.firstName} ${selectedUser.lastName}`}
              </Card.Title>
              <Card.Divider />
              {selectedItems.map((item) => {
                return (
                  <View
                    key={item.itemId}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ marginBottom: 20 }}>{`${item.name}`}</Text>
                    <Text>{`${item.price}`}</Text>
                  </View>
                );
              })}
              <Button onPress={handleUserConfirmation} title="Slice"></Button>
            </Card>
          </Overlay>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const mapState = (state) => {
  return { users: state.users, items: state.dummyReceipt.items };
};

const mapDispatch = (dispatch) => {
  return {
    searchUsers: (searchTerm) => dispatch(searchUsersThunk(searchTerm)),
    confirmUser: (userId, itemIds) => {
      dispatch(assignUser(userId, itemIds));
    },
  };
};

export default connect(mapState, mapDispatch)(UsersList);