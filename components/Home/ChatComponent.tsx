import React from "react";
import { StyleSheet, View } from "react-native";
import { Badge, Text } from "react-native-elements";
import { Card } from "react-native-elements";
import { TouchableNativeFeedback } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { isToday, isYesterday } from "date-fns";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { Chat, CurrentUser } from "../../interfaces/ChatInterface";
import { format } from "date-fns/esm";
import AppColors from "../../Colors/color";
import { useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";

interface Props {
  item: Chat;
  currentUser: CurrentUser;
}
export const formatDate = (date: Date) => {
  if (isToday(date)) {
    return format(date, "p");
  }
  if (isYesterday(date)) {
    return "Yesterday";
  }
  return format(date, "P");
};

const ChatComponent: React.FC<Props & NavigationInjectedProps> = props => {
  const typingChats = useSelector((state: Redux) => state.chat.typingChats);
  const {
    item: { message, sender, type, updatedAt, recipient, unread, _id },
    currentUser,
    navigation
  } = props;
  const chat = typingChats.find(c => c.chatID === _id);
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#FFFFFF", false)}
      onPress={() => {
        navigation.navigate("Chat", {
          recipient: recipient._id !== currentUser._id ? recipient : sender,
          chatID: _id
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
              {chat && chat.typing ? (
                <Text style={{ color: AppColors.secodary }}>typing...</Text>
              ) : (
                <>
                  {currentUser._id === sender._id && !unread && (
                    <Ionicons name="checkmark-done" size={18} color={AppColors.blue_tick} />
                  )}
                  {currentUser._id === sender._id && unread && (
                    <Ionicons name="checkmark" size={18} />
                  )}

                  {message}
                </>
              )}
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
};

export default withNavigation(ChatComponent);

const styles = StyleSheet.create({
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
  person: {
    height: 50,
    width: 50,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey"
  },
  msg: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
