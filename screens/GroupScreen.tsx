import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Badge, Text } from "react-native-elements";
import { Card, Avatar } from "react-native-elements";
import { TouchableNativeFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationMaterialTabScreenComponent } from "react-navigation-tabs";
import { users } from "../data/data";
import inspect from "../inspect";
import GroupChat from "../components/Group/GroupChat";

const GroupScreen: NavigationMaterialTabScreenComponent = ({ navigation }) => {
  return (
    <View style={styles.prt}>
      <GroupChat />
      <TouchableNativeFeedback onPress={() => navigation.navigate("Contact")}>
        <View style={styles.plus}>
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

GroupScreen.navigationOptions = {
  title: "GROUPS"
};

export default GroupScreen;

const styles = StyleSheet.create({
  prt: {},
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
  },
  msgIcon: {
    transform: [{ scaleX: -1 }, { scaleY: 1 }]
  }
});
