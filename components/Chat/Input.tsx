import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import inspect from "../../inspect";

const Input = () => {
  return (
    <View style={styles.prt}>
      <View style={styles.smiley}>
        <Fontisto name="smiley" color="#fff" size={25} />
      </View>
      <TextInput style={styles.inp} />
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={styles.send}>
          <Ionicons name="send-sharp" size={25} color="#fff" style={{ marginLeft: "10%" }} />
        </View>
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  prt: {
    flexDirection: "row",
    position: "absolute",
    bottom: 5,
    alignItems: "center"
  },
  inp: {
    width: "75%",
    backgroundColor: "#262d31",
    height: 45,
    fontSize: 20,
    color: "#fff",
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50
  },
  smiley: {
    backgroundColor: "#262d31",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
    marginLeft: 5
  },
  send: {
    height: 45,
    width: 45,
    backgroundColor: "#00af9c",
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center"
  }
});
