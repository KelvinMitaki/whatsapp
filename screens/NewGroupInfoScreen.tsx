import React from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { Input, Text } from "react-native-elements";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import inspect from "../inspect";

const NewGroupInfoScreen: NavigationStackScreenComponent = ({}) => {
  return (
    <View>
      <View
        style={{
          height: 125,
          justifyContent: "center",
          ...inspect()
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <TouchableNativeFeedback onPress={() => {}}>
            <View style={styles.camera}>
              <FontAwesome name="camera" size={25} color="#fff" />
            </View>
          </TouchableNativeFeedback>
          <View
            style={{
              width: "70%"
            }}
          >
            <Input placeholder="Type group subject here..." />
          </View>
          <View style={{ marginTop: 10 }}>
            <Fontisto name="smiley" color="#fff" size={25} />
          </View>
        </View>
        <Text style={{ color: "rgba(255,255,255,.5)", paddingLeft: 10 }}>
          Provide a group subject and optional group icon
        </Text>
      </View>
    </View>
  );
};

NewGroupInfoScreen.navigationOptions = {
  headerTitle: () => (
    <View>
      <Text style={{ color: "#fff" }} h4>
        New Group
      </Text>
      <Text style={{ color: "#fff" }}>Add subject</Text>
    </View>
  )
};

export default NewGroupInfoScreen;

const styles = StyleSheet.create({
  camera: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc",
    height: 55,
    width: 55,
    borderRadius: 55
  }
});
