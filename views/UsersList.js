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
  const { navigation, users, searchUsers } = props;
  const handleTextChange = (searchTerm) => {
    searchUsers(searchTerm);
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

          <ScrollView>
            {users.map((user) => {
              const name = `${user.firstName} ${user.lastName}`;
              return (
                <Card key={user.id} title={name} style={styles.usersCardCol}>
                  <View>
                    <View style={styles.usersCard}>
                      <Text>Name: {name}</Text>
                      <Text>{user.email}</Text>
                    </View>
                  </View>
                </Card>
              );
            })}
          </ScrollView>
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
