import React from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { formatRelative } from "date-fns";

interface Params {
  recipient: {
    _id: string;
    name: string;
    typing: string;
    lastSeen: string;
    online: boolean;
  };
  chatID: string;
}

const ChatScreenHeader: NavigationStackScreenComponent<Params>["navigationOptions"] = ({
  navigation
}) => {
  const recipient = navigation.getParam("recipient");
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
            {recipient.online ? "Online" : formatRelative(new Date(recipient.lastSeen), new Date())}
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
