import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import HomeHeaderRight from "../components/HomeHeaderRight";
import StarredMessage from "../components/StarredMessage";
import inspect from "../inspect";

const StarredMessagesScreen: NavigationStackScreenComponent = () => {
  const starredMsgs = [];
  for (let i = 0; i < 50; i++) {
    starredMsgs.push("msg");
  }
  return (
    <View>
      <FlatList
        data={starredMsgs}
        keyExtractor={(_, i) => i.toString()}
        renderItem={() => <StarredMessage />}
      />
    </View>
  );
};

StarredMessagesScreen.navigationOptions = {
  headerTitle: "Starred messages",
  headerRight: () => <HomeHeaderRight />
};

export default StarredMessagesScreen;

const styles = StyleSheet.create({});
