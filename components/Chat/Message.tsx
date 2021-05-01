import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import inspect from "../../inspect";
import { CurrentUser, MessageInterface } from "../../interfaces/Chat";
import { useQuery } from "@apollo/client";
import { FETCH_CURRENT_USER } from "../../graphql/queries";

interface Props {
  messages: MessageInterface[];
}

const Message: React.FC<Props> = ({ messages }) => {
  const { data } = useQuery(FETCH_CURRENT_USER);
  const currentUser: CurrentUser = data.fetchCurrentUser;
  return (
    <FlatList
      data={messages}
      keyExtractor={msg => msg._id}
      renderItem={({ item }) => (
        <>
          {currentUser._id === item.sender ? (
            <View style={styles.me}>
              <Text style={{ color: "#fff" }}>{item.message}</Text>
              <Text style={styles.meta}>
                1:38 PM <Ionicons name="checkmark-done" size={18} />
              </Text>
            </View>
          ) : (
            <View style={styles.sender}>
              <Text style={{ color: "#fff" }}>{item.message}</Text>
              <Text style={styles.meta}>1:39 PM</Text>
            </View>
          )}
        </>
      )}
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
    marginRight: 10,
    marginTop: 10
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
    marginLeft: 10,
    marginTop: 10
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
