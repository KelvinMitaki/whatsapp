import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableNativeFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationMaterialTabScreenComponent } from "react-navigation-tabs";
import inspect from "../inspect";
import GroupChat from "../components/Group/GroupChat";
import { useQuery } from "@apollo/client";
import { FETCH_GROUPS, FETCH_UNREAD_GROUP_MSGS } from "../graphql/queries";

const GroupScreen: NavigationMaterialTabScreenComponent = ({ navigation }) => {
  const { data } = useQuery(FETCH_GROUPS);
  const { data: data2 } = useQuery(FETCH_UNREAD_GROUP_MSGS);
  return (
    <View style={styles.prt}>
      <GroupChat
        groups={data ? data.fetchGroups : []}
        unread={data2 ? data2.fetchUnreadGroupMsgs : []}
      />
      <TouchableNativeFeedback onPress={() => navigation.navigate("Contact")}>
        <View style={styles.plus}>
          <MaterialCommunityIcons
            name="android-messages"
            size={30}
            color="#fff"
            style={styles.msgIcon}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

GroupScreen.navigationOptions = {
  title: "GROUPS"
};

export default GroupScreen;

const styles = StyleSheet.create({
  prt: {
    height: "100%"
  },
  plus: {
    position: "absolute",
    right: "5%",
    bottom: "3%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00af9c",
    height: 55,
    width: 55,
    borderRadius: 55
  },
  msgIcon: {
    transform: [{ scaleX: -1 }, { scaleY: 1 }]
  }
});
