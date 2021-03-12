import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import inspect from "../inspect";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

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
    ),
    headerRight: () => (
      <View style={styles.headerRight}>
        <View
          style={{
            borderRadius: 100
          }}
        >
          <TouchableNativeFeedback
            background={
              //@ts-ignore
              TouchableNativeFeedback.Ripple("#fff", true)
            }
          >
            <MaterialIcons name="call" size={25} color={"#fff"} />
          </TouchableNativeFeedback>
        </View>
        <View
          style={{
            borderRadius: 100
          }}
        >
          <TouchableNativeFeedback
            background={
              //@ts-ignore
              TouchableNativeFeedback.Ripple("#fff", true)
            }
          >
            <Ionicons
              name="ellipsis-vertical-sharp"
              size={25}
              color={"rgba(255,255,255,.5)"}
            />
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  };
};

export default ChatScreen;

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerRight: {
    flexDirection: "row",
    width: 100,
    justifyContent: "space-around"
  }
});
