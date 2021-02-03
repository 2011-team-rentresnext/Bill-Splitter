import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { TAGGUN_API_KEY } from "./secrets.js";

export let fetchedReceiptData = "";

const TAGGUN_URL = "https://api.taggun.io/api/receipt/v1/verbose/encoded";

async function callTaggunAsync(image) {
  const body = {
    image: image,
    filename: "img.jpg",
    contentType: "image/jpeg",
    incognito: true,
    language: "en",
    extractTime: false,
  };

  const response = await fetch(TAGGUN_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      apikey: TAGGUN_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();

  if (result.error) {
    throw new Error(result.message);
  } else {
    fetchedReceiptData = result;
    return "$" + result.totalAmount.data;
  }
}

export default function App() {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(null);
  const [permissions, setPermissions] = useState(false);

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
        const result = await callTaggunAsync(base64);
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
