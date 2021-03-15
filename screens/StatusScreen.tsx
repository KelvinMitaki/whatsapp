import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableNativeFeedback } from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import inspect from "../inspect";
import { NavigationMaterialTabScreenComponent } from "react-navigation-tabs";

const StatusScreen: NavigationMaterialTabScreenComponent = ({ navigation }) => {
  const status = [];

  for (let i = 0; i < 50; i++) {
    status.push("statusUpdate");
  }
  return (
    <View>
      <ScrollView>
        <TouchableNativeFeedback onPress={() => {}}>
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
        <Text style={styles.title}>Recent Updates</Text>
        {status.map((_, i) => (
          <TouchableNativeFeedback key={i} onPress={() => {}}>
            <View style={styles.statusPrt}>
              <View style={styles.statusImgPrt}>
                <Image
                  source={require("../assets/1.jpg")}
                  style={styles.statusImg}
                />
              </View>
              <View style={styles.statusMetaData}>
                <Text
                  style={{ color: "white", fontSize: 18 }}
                  numberOfLines={1}
                >
                  Kevin
                </Text>
                <Text style={{ color: "rgba(255,255,255,.5)" }}>
                  Today, 7:44 PM
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        ))}
        <Text style={styles.title}>Viewed Updates</Text>
        {status.map((_, i) => (
          <TouchableNativeFeedback key={i} onPress={() => {}}>
            <View style={styles.statusPrt}>
              <View
                style={{
                  ...styles.statusImgPrt,
                  borderColor: "rgba(255,255,255,.5)"
                }}
              >
                <Image
                  source={require("../assets/1.jpg")}
                  style={styles.statusImg}
                />
              </View>
              <View style={styles.statusMetaData}>
                <Text
                  style={{ color: "white", fontSize: 18 }}
                  numberOfLines={1}
                >
                  Kevin
                </Text>
                <Text style={{ color: "rgba(255,255,255,.5)" }}>
                  Today, 7:44 PM
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        ))}
      </ScrollView>
      <TouchableNativeFeedback onPress={() => {}}>
        <View style={styles.pencil}>
          <MaterialCommunityIcons name="pencil" size={20} color="#fff" />
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={() => {}}>
        <View style={styles.camera}>
          <FontAwesome name="camera" size={20} color="#fff" />
        </View>
      </TouchableNativeFeedback>
    </View>
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
  },
  title: {
    color: "rgba(255,255,255,.5)",
    marginLeft: 15,
    marginVertical: 10
  },
  camera: {
    position: "absolute",
    right: "5%",
    bottom: "3%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00af9c",
    height: 55,
    width: 55,
    borderRadius: 55
  },
  pencil: {
    position: "absolute",
    right: "5%",
    bottom: "15%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00af9c",
    height: 45,
    width: 45,
    borderRadius: 55
  }
});
