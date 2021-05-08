import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  NativeScrollEvent,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import inspect from "../../inspect";
import { GroupMsg } from "../../interfaces/GroupInterface";
import { LazyQueryResult, OperationVariables, useQuery, useSubscription } from "@apollo/client";
import { FETCH_CURRENT_USER } from "../../graphql/queries";
import { CurrentUser } from "../../interfaces/ChatInterface";
import { format } from "date-fns";
import AppColors from "../../Colors/color";
import { ADD_NEW_GROUP_MSG_SUB } from "../../graphql/subscriptions";
import { MESSAGE_LIMIT } from "../Chat/Input";

export const genRandomNum = () => Math.random() * (255 - 1) + 1;

interface Props {
  messages: GroupMsg[];
  groupID: string;
  fetchMore: LazyQueryResult<any, OperationVariables>["fetchMore"] | undefined;
  count: number;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showLoading: boolean;
}

const GroupMessage: React.FC<Props> = ({
  messages,
  groupID,
  fetchMore,
  count,
  setShowLoading,
  showLoading
}) => {
  const { data } = useQuery(FETCH_CURRENT_USER);
  const scrollViewRef = useRef<ScrollView>(null);
  const [incommingMessages, setIncommingMessages] = useState<GroupMsg[]>([]);
  const currentUser: CurrentUser = data.fetchCurrentUser;
  useSubscription(ADD_NEW_GROUP_MSG_SUB, {
    variables: { groupID },
    onSubscriptionData(data) {
      setIncommingMessages(m => [...m, data.subscriptionData.data.addNewGroupMsg]);
    }
  });
  useEffect(() => {
    if (messages && scrollViewRef.current && showLoading) {
      scrollViewRef.current.scrollToEnd();
    }
  }, [messages, incommingMessages]);
  const isCloseToTop = ({ contentOffset }: NativeScrollEvent) => {
    return contentOffset.y === 0;
  };
  const genHue = (phoneNumber: number) => {
    const numString = phoneNumber.toString().slice(phoneNumber.toString().length - 3);
    if (parseInt(numString) > 360) {
      return -parseInt(numString);
    }
    return parseInt(numString);
  };
  const syncedMessages: GroupMsg[] = [...messages, ...incommingMessages]
    .filter((m, i, s) => i === s.findIndex(ms => ms._id === m._id))
    .filter(msg => msg.group === groupID)
    .sort((a, b) => parseInt(a.createdAt) - parseInt(b.createdAt));
  return (
    <View style={{ height: "90%" }}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={({ nativeEvent }) => {
          if (isCloseToTop(nativeEvent) && fetchMore && count > syncedMessages.length) {
            setShowLoading(false);
            fetchMore({ variables: { offset: syncedMessages.length, limit: MESSAGE_LIMIT } });
          }
        }}
      >
        {syncedMessages.map((item, index) => (
          <View key={item._id}>
            {index === 0 && count > syncedMessages.length && (
              <ActivityIndicator size="large" color={AppColors.secodary} />
            )}
            {currentUser._id === item.sender._id ? (
              <View style={[styles.me, index === 0 && { marginTop: 10 }]}>
                <Text style={{ color: AppColors.white }}>{item.message}</Text>
                <Text style={styles.meta}>
                  {format(new Date(parseInt(item.createdAt)), "p")}{" "}
                  <Ionicons name="checkmark" size={18} />
                </Text>
              </View>
            ) : (
              <View style={[{ flexDirection: "row" }, index === 0 && { marginTop: 10 }]}>
                <View style={styles.person}>
                  <Ionicons name="person" size={25} color="rgba(241, 241, 242, 0.8)" />
                </View>
                <View style={{ ...styles.sender }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text
                      style={{
                        color: `hsl(${genHue(item.sender.phoneNumber)},80%,60%)`
                      }}
                    >
                      +{item.sender.countryCode} {item.sender.phoneNumber}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: "rgba(255,255,255,.7)",
                        marginLeft: 10,
                        maxWidth: "55%"
                      }}
                    >
                      ~{item.sender.name}
                    </Text>
                  </View>
                  <Text style={{ color: AppColors.white }}>{item.message}</Text>
                  <Text style={styles.meta}>{format(new Date(parseInt(item.createdAt)), "p")}</Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default GroupMessage;

const styles = StyleSheet.create({
  prt: {
    marginTop: 10,
    marginBottom: 10
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
    marginLeft: 5
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
