import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import HomeHeaderRight from "../components/HomeHeaderRight";
import inspect from "../inspect";

const StarredMessagesScreen: NavigationStackScreenComponent = () => {
  return (
    <View>
      <View style={styles.starredMsgPrt}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            height: 40,
            alignItems: "center"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              width: "75%"
            }}
          >
            <View style={styles.person}>
              <Ionicons
                name="person"
                size={25}
                color="rgba(241, 241, 242, 0.8)"
              />
            </View>
            <View
              style={{
                marginLeft: 10,
                flexDirection: "row",
                width: "80%",
                overflow: "hidden"
              }}
            >
              <Text style={{ color: "#fff" }} numberOfLines={1}>
                Kevin
              </Text>
              <MaterialIcons name="arrow-right" size={20} color="#fff" />
              <View style={{ maxWidth: "75%" }}>
                <Text style={{ color: "#fff" }} numberOfLines={1}>
                  You
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "rgba(255,255,255,.7)" }}>
              {new Date().toLocaleDateString()}
            </Text>
            <Entypo
              name="chevron-small-right"
              size={25}
              color="rgba(255,255,255,.7)"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

StarredMessagesScreen.navigationOptions = {
  headerTitle: "Starred messages",
  headerRight: () => <HomeHeaderRight />
};

export default StarredMessagesScreen;

const styles = StyleSheet.create({
  person: {
    height: 40,
    width: 40,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey"
  },
  starredMsgPrt: {
    minHeight: 90,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,.4)"
  }
});
