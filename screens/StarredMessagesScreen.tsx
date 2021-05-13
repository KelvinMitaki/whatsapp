import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { NavigationStackScreenComponent, useHeaderHeight } from "react-navigation-stack";
import { useSelector } from "react-redux";
import HomeHeaderRight from "../components/Home/HomeHeaderRight";
import StarredMessage from "../components/Starred/StarredMessage";
import inspect from "../inspect";
import { Redux } from "../interfaces/Redux";

const StarredMessagesScreen: NavigationStackScreenComponent = () => {
  const searchModal = useSelector((state: Redux) => state.chat.searchModal);
  const headerHeight = useHeaderHeight();
  const starredMsgs = [];
  for (let i = 0; i < 50; i++) {
    starredMsgs.push("msg");
  }
  return (
    <View>
      {searchModal && <View style={{ height: headerHeight }}></View>}
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
