import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { AWS_URL } from "../secrets.js";
import axios from "axios";

export default function Scanner() {
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
        const res = await axios.post(AWS_URL + "receipts", { base64 });
        console.log("IT IS WORKING IN THE FROTNEND\n", res.data);
        // redo this -- we will get back receipt data
        // store this data in redux!
        setStatus(result);
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
          {status && <Text style={styles.text}>{status}</Text>}
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
