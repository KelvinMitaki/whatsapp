import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import inspect from "../inspect";

const genRandomNum = () => Math.random() * (255 - 1) + 1;

const GroupMessage = () => {
  const messages = [] as JSX.Element[];
  for (let i = 0; i < 100; i++) {
    if (i === 0) {
      messages.push(<View style={{ marginTop: 25 }} />);
    }
    messages.push(
      <>
        <View style={styles.me}>
          <Text style={{ color: "#fff" }}>
            M Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            velit eum doloremque quo, animi blanditiis alias, amet voluptatem
            asperiores repellendus iusto quam eveniet quidem molestias id, illum
            rerum eligendi voluptate
          </Text>
          <Text style={styles.meta}>1:38 PM</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.person}>
            <Ionicons
              name="person"
              size={25}
              color="rgba(241, 241, 242, 0.8)"
            />
          </View>
          <View style={{ ...styles.sender }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  color: `rgb(${genRandomNum()},${genRandomNum()},${genRandomNum()})`
                }}
              >
                +2547 2155 9392
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  color: "rgba(255,255,255,.7)",
                  marginLeft: 10,
                  maxWidth: "55%"
                }}
              >
                ~Kevin
              </Text>
            </View>
            <Text style={{ color: "#fff" }}>Message Message</Text>
            <Text style={styles.meta}>1:39 PM</Text>
          </View>
        </View>
      </>
    );
    if (i === 99) {
      messages.push(<View style={{ marginBottom: 50 }} />);
    }
  }
  return (
    <FlatList
      data={messages}
      keyExtractor={(_, i) => i.toLocaleString()}
      renderItem={({ item }) => item}
    />
  );
};

export default GroupMessage;

const styles = StyleSheet.create({
  prt: {
    marginTop: 10,
    marginBottom: 50
  },
  me: {
    alignSelf: "flex-end",
    backgroundColor: "#00af9c",
    paddingHorizontal: 5,
    maxWidth: "70%",
    minWidth: "20%",
    minHeight: 50,
    borderRadius: 5,
    paddingBottom: 20,
    marginBottom: 10,
    marginRight: 10
  },
  sender: {
    alignSelf: "flex-start",
    backgroundColor: "#262d31",
    paddingHorizontal: 5,
    maxWidth: "70%",
    minWidth: "20%",
    minHeight: 50,
    borderRadius: 5,
    paddingBottom: 20,
    marginBottom: 10,
    marginLeft: 10
  },
  meta: {
    color: "rgba(255,255,255,.7)",
    fontSize: 12,
    position: "absolute",
    bottom: 3,
    right: 5,
    paddingLeft: 10
  },
  person: {
    borderRadius: 70,
    backgroundColor: "grey",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "1%"
  }
});
