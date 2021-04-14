import React from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  FontAwesome5
} from "@expo/vector-icons";
import inspect from "../inspect";

const ProfileScreen = () => {
  return (
    <View>
      <View>
        <View style={styles.person}>
          <Ionicons name="person" size={100} color="rgba(241, 241, 242, 0.8)" />
        </View>
        <View style={styles.cameraPrt}>
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
                color="rgba(241, 241, 242, 0.7)"
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
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#fff", false)}
        onPress={() => {}}
      >
        <View style={{ flexDirection: "row", paddingTop: 20 }}>
          <View
            style={{
              width: "20%",
              alignItems: "center"
            }}
          >
            <MaterialIcons
              name="info-outline"
              size={25}
              color="rgba(241, 241, 242, 0.7)"
            />
          </View>
          <View style={{ width: "80%" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "95%"
              }}
            >
              <View>
                <Text style={{ color: "rgba(241, 241, 242, 0.7)" }}>About</Text>
                <Text style={{ color: "#fff" }}>
                  Hey there! I am using ChatApp
                </Text>
              </View>
              <View style={{}}>
                <MaterialIcons name="edit" size={20} color="#00af9c" />
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "rgba(241, 241, 242, 0.3)",
                borderBottomWidth: 0.4,
                paddingTop: 20
              }}
            ></View>
          </View>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#fff", false)}
        onPress={() => {}}
      >
        <View style={{ flexDirection: "row", paddingVertical: 20 }}>
          <View
            style={{
              width: "20%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <FontAwesome5
              name="phone-alt"
              size={20}
              color="rgba(241, 241, 242, 0.7)"
            />
          </View>
          <View>
            <Text style={{ color: "rgba(241, 241, 242, 0.7)" }}>Phone</Text>
            <Text style={{ color: "#fff" }}>+254 721 559392</Text>
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
  cameraPrt: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: "30%",
    bottom: "7%",
    borderRadius: 500
  },
  camera: {
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
