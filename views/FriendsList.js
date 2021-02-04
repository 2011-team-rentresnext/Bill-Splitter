import React, { Component } from "react";
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
import pic from "../assets/HandsomeSquidward.png";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
    };
  }

  render() {
    const friends = [
      {
        id: 1,
        firstName: "Ayuna",
        lastName: "Tsy",
        email: "ayuna@email.com",
        photo: pic,
      },
      {
        id: 2,
        firstName: "Oy",
        lastName: "Sa",
        email: "osa@email.com",
        photo: pic,
      },
      {
        id: 3,
        firstName: "Oy",
        lastName: "Sa",
        email: "osa@email.com",
        photo: pic,
      },
      {
        id: 4,
        firstName: "Oy",
        lastName: "Sa",
        email: "osa@email.com",
        photo: pic,
      },
    ];
    const { navigation } = this.props;
    return (
      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <Text style={styles.texttitle}>Slicing Friends</Text>

            <Text>
              {"\n"}
              {"\n"}
            </Text>

            <ScrollView>
              {friends.map((friend) => {
                const name = `${friend.firstName} ${friend.lastName}`;
                return (
                  <Card
                    key={friend.id}
                    title={name}
                    style={styles.friendsCardCol}
                  >
                    <View>
                      <Image
                        source={friend.photo}
                        style={styles.friendimg}
                        resizeMode="contain"
                      />

                      <View style={styles.friendsCard}>
                        <Text>
                          Name: {name}
                          {"\n"}
                        </Text>
                        <Text>{friend.email}</Text>
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
}
