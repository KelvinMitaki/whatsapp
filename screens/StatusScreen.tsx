import React, { useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableNativeFeedback } from "react-native";
import { Ionicons, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import inspect from "../inspect";
import { NavigationMaterialTabScreenComponent } from "react-navigation-tabs";
import { DashedCircularIndicator } from "../components/Status/DashedCircularIndicator";
import StatusList from "../components/StatusList";
import { NavigationEvents } from "react-navigation";

const StatusScreen: NavigationMaterialTabScreenComponent = ({ navigation }) => {
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const status = [];

  for (let i = 0; i < 50; i++) {
    status.push("statusUpdate");
  }
  return (
    <View>
      <NavigationEvents
        onDidFocus={() => {
          Animated.timing(position, {
            toValue: { x: 0, y: -100 },
            useNativeDriver: false,
            duration: 300
          }).start();
        }}
        onWillBlur={() => {
          Animated.timing(position, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        }}
      />
      <ScrollView>
        <TouchableNativeFeedback
          onPress={() => {}}
          background={TouchableNativeFeedback.Ripple("#fff", false)}
        >
          <View style={styles.statusPrt}>
            <DashedCircularIndicator
              strokeWidth={2}
              radius={32.5}
              label={<Image source={require("../assets/1.jpg")} style={styles.statusImg} />}
              backgroundColor="#191f23"
            />
            <View style={styles.statusMetaData}>
              <Text style={{ color: "white", fontSize: 18 }}>My Status</Text>
              <Text style={{ color: "rgba(255,255,255,.5)" }}>Today, 7:44 PM</Text>
            </View>
            <View style={{ marginLeft: "-12%" }}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple("#fff", true)}
                onPress={() => navigation.navigate("MyStatus")}
              >
                <View style={styles.ellipsis}>
                  <Ionicons
                    name="ellipsis-horizontal-sharp"
                    size={20}
                    color="rgba(255,255,255,.5)"
                  />
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </TouchableNativeFeedback>
        <StatusList />
      </ScrollView>
      <Animated.View style={position.getLayout()}>
        <View style={styles.pencilPrt}>
          <TouchableNativeFeedback
            onPress={() => {}}
            background={TouchableNativeFeedback.Ripple("#fff", true)}
          >
            <View style={styles.pencil}>
              <MaterialCommunityIcons name="pencil" size={20} color="#fff" />
            </View>
          </TouchableNativeFeedback>
        </View>
      </Animated.View>
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
  cameraPrt: {
    position: "absolute",
    right: "5%",
    bottom: "3%",
    height: 55,
    width: 55,
    borderRadius: 55,
    borderColor: "transparent"
  },
  camera: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00af9c",
    height: 55,
    width: 55,
    borderRadius: 55
  },
  pencilPrt: {
    height: 45,
    width: 45,
    borderRadius: 45,
    position: "absolute",
    right: "5%",
    bottom: "15%"
  },
  pencil: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00af9c",
    height: 45,
    width: 45,
    borderRadius: 55
  }
});
