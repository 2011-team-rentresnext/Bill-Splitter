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
import { Card } from "react-native-elements";
import { searchUsersThunk } from "../store/users";

export function UsersList(props) {
  console.log("Got selected Items: ", props.route.params.selectedItems);
  const { navigation, users, searchUsers } = props;
  const handleTextChange = (searchTerm) => {
    searchUsers(searchTerm);
  };

  const handleSelectionPress = (user) => {
    console.log("SELECTED USER: ", user);
  };
  return (
    <KeyboardAwareScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.texttitle}>Select Slicer</Text>
          <TextInput
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
  };
};

export default connect(mapState, mapDispatch)(UsersList);
