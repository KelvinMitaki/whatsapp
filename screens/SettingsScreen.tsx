import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = () => {
  return (
    <View>
      <TouchableNativeFeedback
        onPress={() => {}}
        background={TouchableNativeFeedback.Ripple("#fff", false)}
      >
        <View style={styles.profile}>
          <View style={styles.person}>
            <Ionicons
              name="person"
              size={35}
              color="rgba(241, 241, 242, 0.8)"
            />
          </View>
          <View
            style={{
              marginLeft: 15
            }}
          >
            <Text style={{ color: "#fff", fontSize: 20 }}>Kevin</Text>
            <Text style={{ color: "rgba(255,255,255,.7)" }}>
              Hey there, I am using WhatsApp
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  profile: {
    flexDirection: "row",
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,.4)",
    paddingVertical: 20,
    alignItems: "center"
  },
  person: {
    height: 60,
    width: 60,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey"
  }
});
