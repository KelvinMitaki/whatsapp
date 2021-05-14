import { useQuery } from "@apollo/client";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { NavigationStackScreenComponent, useHeaderHeight } from "react-navigation-stack";
import { useSelector } from "react-redux";
import HomeHeaderRight from "../components/Home/HomeHeaderRight";
import StarredMessage from "../components/Starred/StarredMessage";
import { FETCH_STARRED_MESSAGES } from "../graphql/queries";
import inspect from "../inspect";
import { StarredMessagesInterface } from "../interfaces/ChatInterface";
import { Redux } from "../interfaces/Redux";

const StarredMessagesScreen: NavigationStackScreenComponent = () => {
  const searchModal = useSelector((state: Redux) => state.chat.searchModal);
  const headerHeight = useHeaderHeight();
  const { data, loading } = useQuery(FETCH_STARRED_MESSAGES);
  let starredMessages: StarredMessagesInterface | null = null;
  if (data && data.fetchStarredMsgs) {
    starredMessages = data.fetchStarredMsgs;
  }
  const starredMsgs = starredMessages
    ? [...starredMessages.messages, ...starredMessages.groupMsgs].sort(
        (a, b) => parseInt(a.createdAt) - parseInt(b.createdAt)
      )
    : [];
  return (
    <View>
      {searchModal && <View style={{ height: headerHeight }}></View>}
      <FlatList
        data={starredMsgs}
        keyExtractor={m => m._id}
        renderItem={({ item }) => <StarredMessage starredMsg={item} key={item._id} />}
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
