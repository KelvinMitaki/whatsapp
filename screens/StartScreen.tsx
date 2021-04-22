import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-elements";

const StartScreen = () => {
  return (
    <View>
      <Text style={{ color: "#fff", marginTop: "20%", fontSize: 30, alignSelf: "center" }}>
        Welcome to ChatApp
      </Text>
      <Image
        source={require("../assets/hero.png")}
        style={{ width: "70%", alignSelf: "center" }}
        resizeMode="contain"
      />
      <Button
        title="AGREE AND CONTINUE"
        containerStyle={{ alignSelf: "center", width: "70%" }}
        buttonStyle={{ backgroundColor: "#00af9c" }}
        titleStyle={{ color: "#191f23" }}
      />
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({});
