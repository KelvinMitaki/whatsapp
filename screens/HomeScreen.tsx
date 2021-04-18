import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableNativeFeedback } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationMaterialTabScreenComponent } from "react-navigation-tabs";
import { users } from "../data/data";
import inspect from "../inspect";
import HomeChat from "../components/Home/HomeChat";

const HomeScreen: NavigationMaterialTabScreenComponent = ({ navigation }) => {
  return (
    <View style={styles.prt}>
      <HomeChat />
      <TouchableNativeFeedback onPress={() => navigation.navigate("Contact")}>
        <View style={styles.message}>
          <MaterialCommunityIcons
            name="android-messages"
            size={30}
            color="#fff"
            style={styles.msgIcon}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  prt: {},
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
  },
  msgIcon: {
    transform: [{ scaleX: -1 }, { scaleY: 1 }]
  }
});
