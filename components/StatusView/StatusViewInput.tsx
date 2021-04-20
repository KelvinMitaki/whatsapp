import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Entypo, FontAwesome, Fontisto, Ionicons } from "@expo/vector-icons";
import { Input } from "react-native-elements";
import { genRandomNum } from "../Group/GroupMessage";
const StatusViewInput = () => {
  const color = `rgb(${genRandomNum()},${genRandomNum()},${genRandomNum()})`;
  return (
    <View style={{ position: "absolute", bottom: 0 }}>
      <View style={styles.meta}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color }}>Kevin</Text>
          <Entypo name="dot-single" size={25} color={color} />
          <Text style={{ color }}>Status</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="photo" size={25} />
          <Text>Photo</Text>
        </View>
      </View>
      <View style={styles.inp}>
        <Fontisto name="smiley" size={25} />
        <Input />
      </View>
      <View style={styles.send}>
        <Ionicons name="send-sharp" size={25} color="#fff" style={{ marginLeft: "10%" }} />
      </View>
    </View>
  );
};

export default StatusViewInput;

const styles = StyleSheet.create({
  meta: {},
  inp: {},
  send: {
    height: 45,
    width: 45,
    backgroundColor: "#00af9c",
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center"
  }
});
