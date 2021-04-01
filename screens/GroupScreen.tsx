import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Badge, Text } from "react-native-elements";
import { Card, Avatar } from "react-native-elements";
import { TouchableNativeFeedback } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { NavigationMaterialTabScreenComponent } from "react-navigation-tabs";
import { users } from "../data";
import inspect from "../inspect";
import GroupChat from "../components/GroupChat";

const GroupScreen: NavigationMaterialTabScreenComponent = ({ navigation }) => {
  return (
    <View style={styles.prt}>
      <GroupChat />
      <TouchableNativeFeedback onPress={() => navigation.navigate("Contact")}>
        <View style={styles.plus}>
          <MaterialIcons name="message" size={25} color="#fff" />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

GroupScreen.navigationOptions = {
  title: "GROUPS"
};

export default GroupScreen;

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
  group: {
    borderRadius: 70,
    backgroundColor: "grey",
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  plus: {
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
