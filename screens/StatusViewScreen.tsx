import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import inspect from "../inspect";

const StatusViewScreen: NavigationStackScreenComponent = () => {
  return (
    <View>
      <Text>StatusViewScreen StatusViewScreen</Text>
    </View>
  );
};

StatusViewScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: () => (
      <View style={styles.headerLeft}>
        <View style={styles.person}>
          <Ionicons name="person" size={25} color="rgba(241, 241, 242, 0.8)" />
        </View>
        <View style={{ marginLeft: 10, width: "75%" }}>
          <Text
            numberOfLines={1}
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "400"
            }}
          >
            Kevin
          </Text>
          <Text style={{ color: "#fff", fontSize: 13 }}>Yesterday, 11:25 PM</Text>
        </View>
      </View>
    ),
    headerRight: () => (
      <View
        style={{
          width: 50,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#fff", true)}
          onPress={() => {}}
        >
          <View style={{ height: 30, width: 30, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="ellipsis-vertical-sharp" size={20} color={"rgba(255,255,255,.5)"} />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  };
};

export default StatusViewScreen;

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "-10%"
  },
  person: {
    borderRadius: 70,
    backgroundColor: "grey",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center"
  }
});
