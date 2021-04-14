import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import inspect from "../inspect";

const Message = () => {
  const messages = [] as JSX.Element[];
  for (let i = 0; i < 100; i++) {
    if (i === 0) {
      messages.push(<View style={{ marginTop: 25 }} />);
    }
    messages.push(
      <>
        <View style={styles.me}>
          <Text style={{ color: "#fff" }}>
            M Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat velit eum doloremque
            quo, animi blanditiis alias, amet voluptatem asperiores repellendus iusto quam eveniet
            quidem molestias id, illum rerum eligendi voluptate
          </Text>
          <Text style={styles.meta}>
            1:38 PM <Ionicons name="checkmark-done" size={18} />
          </Text>
        </View>
        <View style={styles.sender}>
          <Text style={{ color: "#fff" }}>Message Message</Text>
          <Text style={styles.meta}>1:39 PM</Text>
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

export default Message;

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
  }
});
