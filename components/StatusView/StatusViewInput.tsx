import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { Entypo, FontAwesome, Fontisto, Ionicons } from "@expo/vector-icons";
import { Input } from "react-native-elements";
import { genRandomNum } from "../Group/GroupMessage";
import inspect from "../../inspect";
const StatusViewInput = () => {
  const color = `rgb(${genRandomNum()},${genRandomNum()},${genRandomNum()})`;
  return (
    <View style={styles.prt}>
      <View style={styles.statusView}>
        <View style={[styles.meta, { borderLeftColor: color, borderLeftWidth: 2 }]}>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color }}>Kevin</Text>
              <Entypo name="dot-single" size={25} color={color} />
              <Text style={{ color }}>Status</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
              <FontAwesome name="photo" size={15} color="rgba(255,255,255,0.7)" />
              <Text style={{ color: "rgba(255,255,255,0.7)", marginLeft: 5 }}>Photo</Text>
            </View>
          </View>

          <Image source={require("../../assets/1.jpg")} style={{ height: "100%", width: "20%" }} />
        </View>
        <View style={styles.inp}>
          <View style={{ width: "12%", alignItems: "center" }}>
            <Fontisto name="smiley" size={25} color="#fff" />
          </View>
          <TextInput
            style={{
              width: "85%",
              height: 35,
              fontSize: 18,
              padding: 0,
              paddingHorizontal: 5
            }}
          />
        </View>
      </View>
      <View style={{ alignItems: "center", alignSelf: "flex-end" }}>
        <View style={styles.send}>
          <Ionicons name="send-sharp" size={25} color="#fff" style={{ marginLeft: "10%" }} />
        </View>
      </View>
    </View>
  );
};

export default StatusViewInput;

const styles = StyleSheet.create({
  prt: {
    position: "absolute",
    bottom: 70,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  statusView: {
    backgroundColor: "#20272b",
    width: "85%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    padding: 5
  },
  meta: {
    backgroundColor: "#191f23",
    paddingLeft: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
    overflow: "hidden"
  },
  inp: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15
  },
  send: {
    height: 45,
    width: 45,
    backgroundColor: "#00af9c",
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center"
  }
});
