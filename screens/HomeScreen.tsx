import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableNativeFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationMaterialTabScreenComponent } from "react-navigation-tabs";
import { users } from "../data";
import inspect from "../inspect";
import HomeChat from "../components/HomeChat";

const HomeScreen: NavigationMaterialTabScreenComponent = ({ navigation }) => {
  return (
    <View style={styles.prt}>
      <HomeChat />
      <TouchableNativeFeedback onPress={() => navigation.navigate("Contact")}>
        <View style={styles.message}>
          <MaterialIcons name="message" size={25} color="#fff" />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  prt: {},
  contact: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    paddingHorizontal: 10
  },
  contactTxt: {
    paddingLeft: 10,
    width: "85%",
    justifyContent: "space-between",
    height: "100%"
  },
  msg: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  person: {
    height: 50,
    width: 50,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey"
  },
  message: {
    position: "absolute",
    right: "5%",
    bottom: "3%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00af9c",
    height: 55,
    width: 55,
    borderRadius: 55
  }
});
