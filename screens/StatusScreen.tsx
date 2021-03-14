import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import inspect from "../inspect";

const StatusScreen = () => {
  const status = [];
  for (let i = 0; i < 100; i++) {
    status.push(
      <>
        <View style={styles.statusPrt}>
          <View style={styles.statusImgPrt}>
            <Image
              source={require("../assets/1.jpg")}
              style={styles.statusImg}
            />
          </View>
          <View style={styles.statusMetaData}>
            <TouchableNativeFeedback style={{ ...inspect() }}>
              <Text style={{ color: "white", fontSize: 18 }}>Kevin</Text>
              <Text style={{ color: "rgba(255,255,255,.5)" }}>
                Today, 7:44 PM
              </Text>
            </TouchableNativeFeedback>
          </View>
        </View>
      </>
    );
  }
  return (
    <View>
      <Text
        style={{
          color: "rgba(255,255,255,.5)",
          marginLeft: 15,
          marginVertical: 10
        }}
      >
        Recent Updates
      </Text>
      <FlatList
        data={status}
        keyExtractor={(_, i) => i.toLocaleString()}
        renderItem={({ item }) => item}
      />
    </View>
  );
};

export default StatusScreen;

const styles = StyleSheet.create({
  statusPrt: {
    flexDirection: "row",
    alignItems: "center",
    height: 85
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
  }
});
