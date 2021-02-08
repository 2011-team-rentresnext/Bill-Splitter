import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { scanReceipt } from "../store/receipt";

function Scanner(props) {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(null);
  const [permissions, setPermissions] = useState(false);
  const [base64, setBase64] = useState("");

  const askPermissionsAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    } else {
      setPermissions(true);
    }
  };

  const takePictureAsync = async () => {
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      base64: true,
    });
    if (!cancelled) {
      setImage(uri);
      setStatus("Loading...");
      try {
        props.scanReceipt(base64);
        setStatus(props.receipt);
        props.navigation.navigate("ReceiptItems");
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
    }
  };

  return (
    <View style={styles.container}>
      {permissions === false ? (
        <Button onPress={askPermissionsAsync} title="Ask permissions" />
      ) : (
        <>
          {image && <Image style={styles.image} source={{ uri: image }} />}
          {status && status.id && (
            <Text style={styles.text}>{status.total}</Text>
          )}
          {status &&
            status.id &&
            status.items.map((item) => (
              <Text style={styles.text}>
                {item.name} {item.price}
              </Text>
            ))}
          <Button onPress={takePictureAsync} title="Take a Picture" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    margin: 5,
  },
});

const mapState = (state) => {
  return { receipt: state.receipt };
};

const mapDispatch = (dispatch) => {
  return {
    scanReceipt: (base64) => dispatch(scanReceipt(base64)),
  };
};

export default connect(mapState, mapDispatch)(Scanner);
