import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const Reply = () => {
  return (
    <View style={{ alignSelf: "center", alignItems: "center", position: "absolute", bottom: 30 }}>
      <Entypo name="chevron-small-up" size={25} color="#fff" />
      <Text style={{ color: "#fff" }}>Reply</Text>
    </View>
  );
};

export default Reply;

const styles = StyleSheet.create({});
