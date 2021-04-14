import React, { useCallback } from "react";
import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View
} from "react-native";
import { Badge, Text } from "react-native-elements";
import { Card, Avatar } from "react-native-elements";
import { TouchableNativeFeedback } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { NavigationMaterialTabScreenComponent } from "react-navigation-tabs";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";

const HomeChat: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  const messages = useSelector((state: Redux) => state.chat.messages);
  const renderItem = ({
    item: { message, messageNumber, type, time, name }
  }: ListRenderItemInfo<typeof messages[0]>) => (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#FFFFFF", false)}
      onPress={() => navigation.navigate("Chat")}
    >
      <View style={styles.contact}>
        {/* <Avatar
          rounded
          source={require("../assets/blank.png")}
          size={55}
        /> */}
        <View style={styles.person}>
          {type === "broadcast" ? (
            <FontAwesome5
              name="broadcast-tower"
              size={25}
              color="rgba(241, 241, 242, 0.8)"
            />
          ) : (
            <Ionicons
              name="person"
              size={35}
              color="rgba(241, 241, 242, 0.8)"
            />
          )}
        </View>
        <View style={styles.contactTxt}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
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
                {name.split(",").join(", ")}
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
                {name}
              </Text>
            )}
            <Text style={{ right: 1, color: "rgba(255,255,255,.6)" }}>
              {time}
            </Text>
          </View>
          <View style={styles.msg}>
            <Text
              numberOfLines={1}
              style={{
                marginTop: 5,
                color: "rgba(255,255,255,.6)",
                width: messageNumber ? "90%" : "100%"
              }}
            >
              {message}
            </Text>
            {messageNumber ? (
              <Badge
                value={messageNumber}
                badgeStyle={{ backgroundColor: "#00af9c" }}
              />
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
  return (
    <View style={styles.prt}>
      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toLocaleString()}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
      />
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
  }
});
