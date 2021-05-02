import React, { useCallback, useContext } from "react";
import { Alert, FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";
import { Badge, Text } from "react-native-elements";
import { Card, Avatar } from "react-native-elements";
import { TouchableNativeFeedback } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { isToday, isYesterday } from "date-fns";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";
import inspect from "../../inspect";
import { SetSearchModal } from "../../screens/HomeScreen";
import { MessageMeta } from "../../data/messages";
import { FETCH_CHATS, FETCH_CURRENT_USER } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { Chat, CurrentUser } from "../../interfaces/Chat";
import { format } from "date-fns/esm";

const HomeChat: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  const messages = useSelector((state: Redux) => state.chat.messages);
  const { data } = useQuery(FETCH_CHATS, { fetchPolicy: "cache-only" });
  const user = useQuery(FETCH_CURRENT_USER, { fetchPolicy: "cache-only" });
  const dispatch = useDispatch();
  const currentUser: CurrentUser = user.data.fetchCurrentUser;
  const renderItem = ({
    item: { message, sender, type, updatedAt, recipient, unread }
  }: ListRenderItemInfo<Chat>) => (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#FFFFFF", false)}
      onPress={() => {
        navigation.navigate("Chat", {
          recipient: recipient._id !== currentUser._id ? recipient : sender
        });
      }}
    >
      <View style={styles.contact}>
        {/* <Avatar
          rounded
          source={require("../assets/blank.png")}
          size={55}
        /> */}
        <View style={styles.person}>
          {type === "broadcast" ? (
            <FontAwesome5 name="broadcast-tower" size={25} color="rgba(241, 241, 242, 0.8)" />
          ) : (
            <Ionicons name="person" size={35} color="rgba(241, 241, 242, 0.8)" />
          )}
        </View>
        <View style={styles.contactTxt}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            {type === "broadcast" ? (
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "400",
                  color: "#fff",
                  width: "75%"
                }}
                numberOfLines={1}
              >
                {sender.name.split(",").join(", ")}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "400",
                  color: "#fff",
                  width: "75%"
                }}
                numberOfLines={1}
              >
                {currentUser._id === sender._id ? recipient.name : sender.name}
              </Text>
            )}
            <Text style={{ right: 1, color: "rgba(255,255,255,.6)" }}>
              {formatDate(new Date(parseInt(updatedAt)))}
            </Text>
          </View>
          <View style={styles.msg}>
            <Text
              numberOfLines={1}
              style={{
                marginTop: 5,
                color: "rgba(255,255,255,.6)",
                width: unread ? "90%" : "100%"
              }}
            >
              {message}
            </Text>
            {unread && currentUser._id !== sender._id ? (
              <Badge value={unread} badgeStyle={{ backgroundColor: "#00af9c" }} />
            ) : null}
          </View>
          <Card.Divider
            style={{
              marginTop: 15,
              backgroundColor: "rgba(255,255,255,.3)"
            }}
          />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
  const getItemLayout = useCallback(
    (data: any, i: number) => ({ length: 70, offset: 70 * i, index: i }),
    []
  );
  const keyExtractor = ({ _id }: Chat) => _id;
  const formatDate = (date: Date) => {
    if (isToday(date)) {
      return format(date, "p");
    }
    if (isYesterday(date)) {
      return "Yesterday";
    }
    return format(date, "P");
  };
  return (
    <View style={styles.prt}>
      {data && data.fetchChats && data.fetchChats.length ? (
        <FlatList
          data={data.fetchChats}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          onTouchStart={() => dispatch<SetSearchModal>({ type: "setSearchModal", payload: false })}
        />
      ) : (
        <View style={styles.noMsgs}>
          <Text
            style={{ color: "rgba(255,255,255,.7)", textAlign: "center", justifyContent: "center" }}
          >
            To start messaging contacts who have ChatApp, tap{" "}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="android-messages"
              size={20}
              color="rgba(255,255,255,.7)"
              style={styles.msgIcon}
            />
            <Text
              style={{
                color: "rgba(255,255,255,.7)",
                textAlign: "center",
                justifyContent: "center"
              }}
            >
              {" "}
              at the bottom right of your screen.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default withNavigation(HomeChat);

const styles = StyleSheet.create({
  prt: {},
  contact: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    paddingHorizontal: 10
  },
  contactTxt: {
    paddingLeft: 10,
    width: "85%",
    justifyContent: "space-between",
    height: "100%"
  },
  msg: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  person: {
    height: 50,
    width: 50,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey"
  },
  msgIcon: {
    transform: [{ scaleX: -1 }, { scaleY: 1 }]
  },
  noMsgs: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30
  }
});
