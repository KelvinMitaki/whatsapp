import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableNativeFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import inspect from "../inspect";
import { NavigationMaterialTabScreenComponent } from "react-navigation-tabs";

const StatusScreen: NavigationMaterialTabScreenComponent = ({ navigation }) => {
  const status = [];
  const statusUpdate = (
    <TouchableNativeFeedback>
      <View style={styles.statusPrt}>
        <View style={styles.statusImgPrt}>
          <Image source={require("../assets/1.jpg")} style={styles.statusImg} />
        </View>
        <View style={styles.statusMetaData}>
          <Text style={{ color: "white", fontSize: 18 }}>Kevin</Text>
          <Text style={{ color: "rgba(255,255,255,.5)" }}>Today, 7:44 PM</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
  for (let i = 0; i < 100; i++) {
    status.push(statusUpdate);
  }
  return (
    <ScrollView>
      <TouchableNativeFeedback>
        <View style={styles.statusPrt}>
          <View style={styles.statusImgPrt}>
            <Image
              source={require("../assets/1.jpg")}
              style={styles.statusImg}
            />
          </View>
          <View style={styles.statusMetaData}>
            <Text style={{ color: "white", fontSize: 18 }}>My Status</Text>
            <Text style={{ color: "rgba(255,255,255,.5)" }}>
              Today, 7:44 PM
            </Text>
          </View>
          <View style={{ marginLeft: "-12%" }}>
            <TouchableNativeFeedback
              background={
                //@ts-ignore
                TouchableNativeFeedback.Ripple("#fff", true)
              }
              onPress={() => navigation.navigate("MyStatus")}
            >
              <View style={styles.ellipsis}>
                <Ionicons
                  name="ellipsis-horizontal"
                  size={25}
                  color="rgba(255,255,255,.5)"
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </TouchableNativeFeedback>
      <Text
        style={{
          color: "rgba(255,255,255,.5)",
          marginLeft: 15,
          marginVertical: 10
        }}
      >
        Recent Updates
      </Text>
      {status}
    </ScrollView>
  );
};

export default StatusScreen;

const styles = StyleSheet.create({
  statusPrt: {
    flexDirection: "row",
    alignItems: "center",
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
    justifyContent: "center",
    borderRadius: 50
  }
});
