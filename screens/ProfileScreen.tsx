import React from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import inspect from "../inspect";

const ProfileScreen = () => {
  return (
    <View>
      <View>
        <View style={styles.person}>
          <Ionicons name="person" size={100} color="rgba(241, 241, 242, 0.8)" />
        </View>
        <TouchableNativeFeedback onPress={() => {}}>
          <View style={styles.camera}>
            <FontAwesome name="camera" size={20} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#fff", false)}
        onPress={() => {}}
      >
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: "20%", alignItems: "center" }}>
              <Ionicons
                name="person"
                size={20}
                color="rgba(241, 241, 242, 0.8)"
              />
            </View>
            <View style={styles.edit}>
              <View>
                <Text style={{ color: "rgba(241, 241, 242, 0.7)" }}>Name</Text>
                <Text style={{ color: "#fff" }}>Kevin</Text>
              </View>
              <MaterialIcons name="edit" size={20} color="#00af9c" />
            </View>
          </View>
          <View style={styles.meta}>
            <Text style={{ color: "rgba(241, 241, 242, 0.7)" }}>
              This is not your username or pin. This name will be visible to
              your WhatsApp contacts
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  person: {
    height: 150,
    width: 150,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    marginVertical: 25,
    alignSelf: "center"
  },
  camera: {
    position: "absolute",
    right: "30%",
    bottom: "7%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00af9c",
    height: 55,
    width: 55,
    borderRadius: 55
  },
  meta: {
    paddingTop: 10,
    paddingBottom: 20,
    width: "80%",
    alignSelf: "flex-end",
    borderBottomColor: "rgba(241, 241, 242, 0.3)",
    borderBottomWidth: 0.4
  },
  edit: {
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
