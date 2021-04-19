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
              width: Dimensions.get("screen").width
            }}
          >
            <View
              style={{
                elevation: 2,
                flexDirection: "row",
                alignItems: "center",
                height: 70,
                paddingHorizontal: 10
              }}
            >
              <View
                style={{ height: 40, width: 40, alignItems: "center", justifyContent: "center" }}
              >
                <AntDesign name="arrowleft" size={25} color="#fff" />
              </View>
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
              <View
                style={{
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple("#fff", true)}
                  onPress={() => {}}
                >
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
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
  }
});
