import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import inspect from "../inspect";

const StartScreen: NavigationStackScreenComponent = ({ navigation }) => {
  return (
    <View>
      <Text style={{ color: "#fff", marginTop: "20%", fontSize: 30, alignSelf: "center" }}>
        Welcome to ChatApp
      </Text>
      <View style={{ height: "70%" }}>
        <Image
          source={require("../assets/hero.png")}
          style={{ width: "70%", alignSelf: "center" }}
          resizeMode="contain"
        />
      </View>
      <Button
        title="AGREE AND CONTINUE"
        containerStyle={{ alignSelf: "center", width: "70%" }}
        buttonStyle={{ backgroundColor: "#00af9c" }}
        titleStyle={{ color: "#191f23" }}
        onPress={() => navigation.replace("PhoneNumber")}
      />
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({});
