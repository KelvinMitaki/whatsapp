import React from "react";
import { StyleSheet, Text, TextInput, TouchableNativeFeedback, View } from "react-native";
import { Ionicons, FontAwesome, Octicons } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";

const NameScreen: NavigationStackScreenComponent = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View style={{ marginTop: "20%" }}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20, textAlign: "center" }}>
          Profile info
        </Text>
        <Text style={{ color: "rgba(255,255,255,.8)", textAlign: "center", marginVertical: 20 }}>
          Please provide your name and an optional profile photo
        </Text>
        <View style={[styles.person]}>
          <Ionicons name="person" size={100} color="rgba(241, 241, 242, 0.8)" />
          <View style={[styles.cameraPrt]}>
            <TouchableNativeFeedback
              onPress={() => {}}
              background={TouchableNativeFeedback.Ripple("#fff", true)}
            >
              <View style={styles.camera}>
                <FontAwesome name="camera" size={20} color="#fff" />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
          <TextInput
            style={{
              borderBottomColor: "#00af9c",
              borderBottomWidth: 2,
              width: "80%",
              marginRight: 10
            }}
            autoFocus
          />
          <Octicons name="smiley" color="rgba(241, 241, 242, 0.8)" size={25} />
        </View>
      </View>
      <Button
        title="NEXT"
        containerStyle={{ alignSelf: "center", marginBottom: 20 }}
        buttonStyle={{ backgroundColor: "#00af9c", paddingVertical: 10, paddingHorizontal: 20 }}
        titleStyle={{ color: "#191f23" }}
        onPress={() => navigation.replace("Tab")}
      />
    </View>
  );
};

export default NameScreen;

const styles = StyleSheet.create({
  person: {
    height: 150,
    width: 150,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    alignSelf: "center"
  },
  cameraPrt: {
    position: "absolute",
    right: "-15%",
    bottom: "7%",
    backgroundColor: "#00af9c",
    borderRadius: 55
  },
  camera: {
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    width: 55
  }
});
