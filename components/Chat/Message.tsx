import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  NativeScrollEvent,
  ActivityIndicator,
  Dimensions,
  LayoutChangeEvent
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import inspect from "../../inspect";
import { CurrentUser, MessageInterface } from "../../interfaces/Chat";
import { LazyQueryResult, OperationVariables, useQuery, useSubscription } from "@apollo/client";
import { FETCH_CURRENT_USER, FETCH_MESSAGE_COUNT } from "../../graphql/queries";
import format from "date-fns/format";
import { ADD_NEW_MESSAGE_SUB } from "../../graphql/subscriptions";
import AppColors from "../../Colors/color";
import { MESSAGE_LIMIT } from "./Input";
import { NavigationEvents } from "react-navigation";

interface Props {
  messages: MessageInterface[];
  recipient: string;
  fetchMore: LazyQueryResult<any, OperationVariables>["fetchMore"] | undefined;
}

const Message: React.FC<Props> = ({ messages, recipient, fetchMore }) => {
  const { data } = useQuery(FETCH_CURRENT_USER);
  const count = useQuery(FETCH_MESSAGE_COUNT, { variables: { recipient } });
  const currentUser: CurrentUser = data.fetchCurrentUser;
  const [subScriptionMsgs, setSubScriptionMsgs] = useState<MessageInterface[]>([]);
  useSubscription(ADD_NEW_MESSAGE_SUB, {
    onSubscriptionData(data) {
      setSubScriptionMsgs(m => [...m, data.subscriptionData.data.addNewMessage]);
    },
    variables: { sender: currentUser._id, recipient }
  });
  const [currentRender, setCurrentRender] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [view, setView] = useState<number | null>(null);
  useEffect(() => {
    setCurrentRender(c => c + 1);
    if (scrollViewRef.current && view) {
      if (currentRender < 2) {
        scrollViewRef.current.scrollToEnd();
      } else {
        scrollViewRef.current.scrollTo({ x: 0, y: view, animated: false });
      }
    }
  }, [messages, view]);
  const isCloseToTop = ({ contentOffset }: NativeScrollEvent) => {
    return contentOffset.y === 0;
  };
  const filteredMsgs = [...messages, ...subScriptionMsgs]
    .filter((m, i, s) => i === s.findIndex(ms => ms._id === m._id))
    .filter(
      msg =>
        (msg.sender === currentUser._id && msg.recipient === recipient) ||
        (msg.sender === recipient && msg.recipient === currentUser._id)
    )
    .sort((a, b) => parseInt(a.createdAt) - parseInt(b.createdAt));
  return (
    <View style={{ height: "90%" }}>
      <NavigationEvents onDidBlur={() => setCurrentRender(0)} />
      <ScrollView
        ref={scrollViewRef}
        onScroll={({ nativeEvent }) => {
          if (
            isCloseToTop(nativeEvent) &&
            fetchMore &&
            count.data &&
            count.data.fetchMessageCount.count > filteredMsgs.length
          ) {
            fetchMore({ variables: { offset: filteredMsgs.length, limit: MESSAGE_LIMIT } });
          }
        }}
      >
        {filteredMsgs.map((item, index) => (
          <View
            key={item._id}
            onLayout={e => {
              if (filteredMsgs.length === MESSAGE_LIMIT && index === filteredMsgs.length - 1) {
                setView(e.nativeEvent.layout.y);
              }
              if (
                index ===
                  filteredMsgs.length -
                    MESSAGE_LIMIT * Math.floor(filteredMsgs.length / MESSAGE_LIMIT) &&
                filteredMsgs.length > MESSAGE_LIMIT
              ) {
                setView(e.nativeEvent.layout.y);
              }
            }}
          >
            {index === 0 &&
              count.data &&
              count.data.fetchMessageCount.count > filteredMsgs.length && (
                <ActivityIndicator size="large" color={AppColors.secodary} />
              )}
            {currentUser._id === item.sender ? (
              <View style={styles.me}>
                <Text style={{ color: "#fff" }}>{item.message}</Text>
                <Text style={styles.meta}>
                  {format(new Date(parseInt(item.createdAt)), "p")}{" "}
                  <Ionicons name="checkmark-done" size={18} />
                </Text>
              </View>
            ) : (
              <View style={styles.sender}>
                <Text style={{ color: "#fff" }}>{item.message}</Text>
                <Text style={styles.meta}>{format(new Date(parseInt(item.createdAt)), "p")}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
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
