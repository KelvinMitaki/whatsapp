import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import {} from "@expo/vector-icons";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import inspect from "../inspect";

const ChatScreen: NavigationStackScreenComponent = () => {
  return (
    <View>
      <Text>ChatScreen ChatScreen</Text>
    </View>
  );
};

ChatScreen.navigationOptions = ({}) => {
  return {
    headerTitle: () => (
      <View style={styles.headerLeft}>
        <Avatar
          rounded
          source={require("../assets/blank.png")}
          containerStyle={{ marginLeft: "-8%" }}
          size={40}
        />
        <Text
          style={{
            color: "white",
            marginLeft: 10,
            fontSize: 20,
            fontWeight: "400"
          }}
        >
          Kevin
        </Text>
      </View>
    )
  };
};

export default ChatScreen;

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center"
  }
});
