import React, { Component, useState } from "react";
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

export function UsersList(props) {
  const { selectedItems } = props.route.params;
  console.log("Got selected Items: ", selectedItems);
  const { navigation, users, searchUsers } = props;
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
    console.log("SELECTED USER: ", user);
    setSelectedUser(user);
    setVisible(true);
  };

  const handleUserConfirmation = () => {
    const itemIds = selectedItems.map((item) => item.itemId);
    props.confirmUser(selectedUser.id, itemIds);
    setVisible(false);
    props.navigation.navigate("ReceiptItems");
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
  return { users: state.users };
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
