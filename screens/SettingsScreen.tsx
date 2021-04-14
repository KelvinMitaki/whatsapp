import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Ionicons, Foundation, MaterialIcons } from "@expo/vector-icons";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import inspect from "../inspect";

const SettingsScreen: NavigationStackScreenComponent = ({ navigation }) => {
  return (
    <View>
      <TouchableNativeFeedback
        onPress={() => navigation.navigate("Profile")}
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
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#fff", false)}
        onPress={() => navigation.navigate("Privacy")}
      >
        <View style={styles.settingsItem}>
          <View style={{ width: "20%", alignItems: "center" }}>
            <MaterialIcons name="lock" size={25} color="rgba(255,255,255,.7)" />
          </View>
          <View style={{ width: "80%" }}>
            <Text style={{ color: "#fff", fontSize: 17 }}>Privacy</Text>
            <Text numberOfLines={1} style={{ color: "rgba(255,255,255,.7)" }}>
              Last seen, profile photo, about
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#fff", false)}
        onPress={() => {}}
      >
        <View style={styles.settingsItem}>
          <View style={{ width: "20%", alignItems: "center" }}>
            <MaterialIcons
              name="group"
              size={25}
              color="rgba(255,255,255,.7)"
            />
          </View>
          <View style={{ width: "80%" }}>
            <Text style={{ color: "#fff", fontSize: 17 }}>Invite a friend</Text>
            <Text numberOfLines={1} style={{ color: "rgba(255,255,255,.7)" }}>
              Share the link with a friend to join ChatApp
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#fff", false)}
        onPress={() => {}}
      >
        <View style={styles.settingsItem}>
          <View style={{ width: "20%", alignItems: "center" }}>
            <Foundation name="trash" size={25} color="rgba(255,255,255,.7)" />
          </View>
          <View style={{ width: "80%" }}>
            <Text style={{ color: "#fff", fontSize: 17 }}>Delete account</Text>
            <Text numberOfLines={1} style={{ color: "rgba(255,255,255,.7)" }}>
              All your data in the system will be deleted.
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
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20
  }
});
