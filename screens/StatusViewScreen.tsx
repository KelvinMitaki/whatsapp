import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import inspect from "../inspect";
import { Image } from "react-native-elements/dist/image/Image";

const StatusViewScreen: NavigationStackScreenComponent = ({ navigation }) => {
  return (
    <>
      <StatusBar hidden />
      <View style={{ height: "100%", width: "100%" }}>
        <View>
          <Image
            source={require("../assets/1.jpg")}
            style={{
              height: Dimensions.get("screen").height,
              width: Dimensions.get("screen").width,
              backgroundColor: "#000"
            }}
          >
            <View
              style={{
                elevation: 2,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: 70,
                paddingHorizontal: 10
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableNativeFeedback
                  onPress={() => navigation.goBack()}
                  background={TouchableNativeFeedback.Ripple("#fff", true)}
                >
                  <View style={styles.back}>
                    <AntDesign name="arrowleft" size={25} color="#fff" />
                  </View>
                </TouchableNativeFeedback>
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
              </View>
              <TouchableNativeFeedback
                onPress={() => {}}
                background={TouchableNativeFeedback.Ripple("#fff", false)}
              >
                <View style={styles.mute}>
                  <Text style={{ color: "#fff", paddingHorizontal: 10 }}>Mute</Text>
                </View>
              </TouchableNativeFeedback>
              <View
                style={{
                  width: 60,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple("#fff", true)}
                  onPress={() => {}}
                >
                  <View style={styles.ellipsis}>
                    <Ionicons name="ellipsis-vertical-sharp" size={20} color={"#fff"} />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          </Image>
        </View>
      </View>
    </>
  );
};

export default StatusViewScreen;

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    width: "75%"
  },
  person: {
    borderRadius: 70,
    backgroundColor: "grey",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  back: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  ellipsis: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  mute: {
    height: 50,
    width: 150,
    backgroundColor: "#20272b",
    justifyContent: "center",
    position: "absolute",
    elevation: 1,
    right: 7
  }
});
