import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";
import inspect from "../inspect";

const MyStatusScreen: NavigationStackScreenComponent = () => {
  const statusUpdate = (
    <TouchableNativeFeedback>
      <View style={styles.statusPrt}>
        <View style={styles.statusImgPrt}>
          <Image source={require("../assets/1.jpg")} style={styles.statusImg} />
        </View>
        <View style={styles.statusMetaData}>
          <Text style={{ color: "white", fontSize: 18 }}>20 views</Text>
          <Text style={{ color: "rgba(255,255,255,.5)" }}>Today, 7:44 PM</Text>
        </View>
        <View style={{ marginLeft: "-10%" }}>
          <TouchableNativeFeedback
            background={
              //@ts-ignore
              TouchableNativeFeedback.Ripple("#fff", true)
            }
            style={styles.ellipsis}
          >
            <View style={styles.ellipsis}>
              <Ionicons
                name="ellipsis-vertical"
                size={25}
                color="rgba(255,255,255,.5)"
                style={{}}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
  const status = [];
  for (let i = 0; i < 5; i++) {
    status.push(statusUpdate);
  }
  return (
    <ScrollView>
      {status}
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