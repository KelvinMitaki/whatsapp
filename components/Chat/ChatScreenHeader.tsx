import React from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback, Dimensions } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5
} from "@expo/vector-icons";
import { formatRelative } from "date-fns";
import { MessageInterface } from "../../interfaces/ChatInterface";
import AppColors from "../../Colors/color";
import inspect from "../../inspect";

interface Params {
  recipient: {
    _id: string;
    name: string;
    typing: boolean;
    lastSeen: string;
    online: boolean;
  };
  chatID: string;
  setSelectedMsgs: React.Dispatch<React.SetStateAction<MessageInterface[]>>;
  selectedMsgs: MessageInterface[];
}

const ChatScreenHeader: NavigationStackScreenComponent<Params>["navigationOptions"] = ({
  navigation
}) => {
  const recipient = navigation.getParam("recipient");
  const selectedMsgs = navigation.getParam("selectedMsgs");
  const setSelectedMsgs = navigation.getParam("setSelectedMsgs");
  if (!selectedMsgs || (selectedMsgs && !selectedMsgs.length)) {
    return {
      headerTitle: () => (
        <View style={styles.headerLeft}>
          {/* <Avatar
                rounded
                source={require("../assets/blank.png")}
                containerStyle={{ marginLeft: "-8%" }}
                size={40}
              /> */}
          <View style={styles.person}>
            <Ionicons name="person" size={25} color="rgba(241, 241, 242, 0.8)" />
          </View>
          <View
            style={{
              marginLeft: 10,
              width: "75%"
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "400"
              }}
            >
              {recipient.name}
            </Text>
            <Text style={{ color: "#fff" }}>
              {recipient.typing
                ? "typing..."
                : recipient.online
                ? "Online"
                : formatRelative(new Date(recipient.lastSeen), new Date())}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <View
            style={{
              alignSelf: "center",
              ...styles.ellipsis
            }}
          >
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#fff", true)}
              onPress={() => {}}
            >
              <View>
                <MaterialIcons name="call" size={25} color={"#fff"} />
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.ellipsis}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#fff", true)}
              onPress={() => {}}
            >
              <View>
                <Ionicons name="ellipsis-vertical-sharp" size={20} color={"rgba(255,255,255,.5)"} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      ),
      headerBackImage: () => (
        <View>
          <AntDesign
            name="arrowleft"
            size={20}
            color="#fff"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      )
    };
  }
  return {
    headerTitle: () => (
      <Text style={{ color: AppColors.dull_white, fontSize: 20 }}>{selectedMsgs.length}</Text>
    ),
    headerRight: () => (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: Dimensions.get("screen").width * 0.6
        }}
      >
        <Ellipsis>
          <Entypo
            name="forward"
            size={20}
            color={AppColors.white}
            style={{ transform: [{ scaleX: -1 }] }}
          />
        </Ellipsis>
        <Ellipsis>
          <FontAwesome name="star" size={20} color={AppColors.white} />
        </Ellipsis>
        <Ellipsis>
          <FontAwesome5 name="trash" size={20} color={AppColors.white} />
        </Ellipsis>
        <Ellipsis>
          <Entypo name="forward" size={20} color={AppColors.white} />
        </Ellipsis>
        <View style={[styles.ellipsis]}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#fff", true)}
            onPress={() => {}}
          >
            <View>
              <Ionicons name="ellipsis-vertical-sharp" size={20} color={"rgba(255,255,255,.5)"} />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  };
};

export default ChatScreenHeader;

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "-10%"
  },
  headerRight: {
    flexDirection: "row",
    width: 100,
    justifyContent: "space-around"
  },
  person: {
    borderRadius: 70,
    backgroundColor: "grey",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  ellipsis: {
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "transparent"
  }
});

const Ellipsis: React.FC = ({ children }) => (
  <View style={styles.ellipsis}>
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#fff", true)}
      onPress={() => {}}
    >
      <View style={{ height: 45, width: 45, alignItems: "center", justifyContent: "center" }}>
        {children}
      </View>
    </TouchableNativeFeedback>
  </View>
);
