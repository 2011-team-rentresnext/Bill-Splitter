import React, { Component, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, BottomSheet, Button } from "react-native-elements";
import { connect } from "react-redux";
import styles from "./styles";

export function ReceiptItems(props) {
  // console.log(props.items);
  const { items } = props;
  const [selectedItems, updateSelectedItems] = useState([]);
  const [selectedItemIds, updateSelectedItemIds] = useState([]);

  const handleSelectionPress = (item) => {
    console.log("ITEM IS :", item);
    updateSelectedItems([...selectedItems, item]);
    updateSelectedItemIds([...selectedItemIds, item.itemId]);
  };

  const handleUnselectPress = (item) => {
    updateSelectedItems(
      selectedItems.filter((currentItem) => currentItem.itemId !== item.itemId)
    );
    updateSelectedItemIds(
      selectedItemIds.filter((itemId) => itemId !== item.itemId)
    );
  };

  const handleNext = () => {
    props.navigation.navigate("UsersList", { selectedItems });
  };

  return (
    <View styles={styles.container}>
      <Text style={styles.texttitle}>Slice your receipt!</Text>
      <Text style={styles.textsubtitle}>Select item(s) for a friend</Text>
      <View style={{ height: "79%" }}>
        <ScrollView>
          <View>
            {selectedItems.map((item) => {
              return (
                <TouchableOpacity
                  key={item.itemId}
                  onPress={(e) => {
                    handleUnselectPress(item);
                  }}
                >
                  <Card
                    title={item.name}
                    containerStyle={styles.selectedItemCard}
                  >
                    <View>
                      <View style={styles.itemCard}>
                        <Text style={{ color: "white" }}>{item.name}</Text>
                        <Text style={{ color: "white" }}>{item.price}</Text>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>
          <View>
            {items
              .filter((item) => {
                return !selectedItemIds.includes(item.itemId);
              })
              .map((item) => {
                return (
                  <TouchableOpacity
                    key={item.itemId}
                    onPress={(e) => {
                      handleSelectionPress(item);
                    }}
                  >
                    <Card title={item.name} style={styles.usersCardCol}>
                      <View>
                        <View style={styles.itemCard}>
                          <Text>{item.name}</Text>
                          <Text>{item.price}</Text>
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
      </View>
      <View style={{ padding: 1 }}>
        <Button
          onPress={handleNext}
          buttonStyle={{ backgroundColor: "#E83535" }}
          title="Next"
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return { items: state.dummyReceipt.items };
};

export default connect(mapStateToProps)(ReceiptItems);
