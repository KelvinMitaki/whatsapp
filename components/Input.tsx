import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import inspect from "../inspect";

const Input = () => {
  return (
    <View>
      <TextInput style={styles.inp} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inp: {
    width: "90%",
    backgroundColor: "#262d31",
    position: "absolute",
    bottom: 5,
    height: 40,
    fontSize: 20,
    color: "#fff",
    borderRadius: 50
  }
});
