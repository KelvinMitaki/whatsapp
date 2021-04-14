import React from "react";
import { Image, StyleSheet, Text, TouchableNativeFeedback, View, ScrollView } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";
import inspect from "../inspect";

const MyStatusScreen: NavigationStackScreenComponent = () => {
  const status = [];
  for (let i = 0; i < 5; i++) {
    status.push("statusUpdate");
  }
  return (
    <ScrollView>
      {status.map((_, i) => (
        <TouchableNativeFeedback
          key={i}
          onPress={() => {}}
          background={TouchableNativeFeedback.Ripple("#fff", false)}
        >
          <View style={styles.statusPrt}>
            <Image source={require("../assets/1.jpg")} style={styles.statusImg} />
            <View style={styles.statusMetaData}>
              <Text style={{ color: "white", fontSize: 18 }}>20 views</Text>
              <Text style={{ color: "rgba(255,255,255,.5)" }}>Today, 7:44 PM</Text>
            </View>
            <View style={{ marginLeft: "-10%" }}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple("#fff", true)}
                onPress={() => {}}
              >
                <View style={styles.ellipsis}>
                  <Ionicons name="ellipsis-vertical" size={20} color="rgba(255,255,255,.5)" />
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </TouchableNativeFeedback>
      ))}
      <Text
        style={{
          color: "rgba(255,255,255,.5)",
          alignSelf: "center",
          marginVertical: 20
        }}
      >
        Your status updates will disappear after 24 hours
      </Text>
    </ScrollView>
  );
};

MyStatusScreen.navigationOptions = {
  headerTitle: "My Status"
};

export default MyStatusScreen;

const styles = StyleSheet.create({
  statusPrt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 75
  },
  statusImgPrt: {
    borderColor: "#00af9c",
    borderWidth: 2,
    borderRadius: 50,
    height: 65,
    width: 65,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15
  },
  statusImg: {
    height: 55,
    width: 55,
    borderRadius: 50
  },
  statusMetaData: {
    marginLeft: "2.5%",
    height: "100%",
    width: "75%",
    justifyContent: "center",
    borderTopWidth: 0.5,
    borderTopColor: "rgba(255,255,255,.3)"
  },
  ellipsis: {
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center"
  }
});
