import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const StatusScreen = () => {
  return (
    <View>
      <Text style={{ color: "rgba(255,255,255,.5)" }}>Recent Updates</Text>
      <View
        style={{
          borderColor: "#00af9c",
          borderWidth: 2,
          borderRadius: 50,
          height: 65,
          width: 65,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image
          source={require("../assets/1.jpg")}
          style={{ height: 55, width: 55, borderRadius: 50 }}
        />
      </View>
    </View>
  );
};

export default StatusScreen;

const styles = StyleSheet.create({});
