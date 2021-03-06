import React from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenComponent, useHeaderHeight } from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import AppColors from '../Colors/color';
import HomeHeaderRight from '../components/Home/HomeHeaderRight';
import StarredMessage from '../components/Starred/StarredMessage';
import { useFetchStarredMsgsQuery } from '../generated/graphql';
import { Redux } from '../interfaces/Redux';

const StarredMessagesScreen: NavigationStackScreenComponent = () => {
  const searchModal = useSelector((state: Redux) => state.chat.searchModal);
  const starredInput = useSelector((state: Redux) => state.chat.starredInput);
  const headerHeight = useHeaderHeight();
  const { data, loading } = useFetchStarredMsgsQuery();
  let starredMessages = null;
  if (data && data.fetchStarredMsgs) {
    starredMessages = data.fetchStarredMsgs;
  }
  const starredMsgs = starredMessages
    ? [...starredMessages.messages, ...starredMessages.groupMsgs]
        .sort((a, b) => parseInt(a.createdAt) - parseInt(b.createdAt))
        .map((msg) => ({ ...msg, id: msg._id }))
    : [];
  const screen = Dimensions.get('screen');
  return (
    <View>
      {searchModal && <View style={{ height: headerHeight }}></View>}
      {!loading ? (
        <FlatList
          data={starredMsgs.filter((msg) =>
            starredInput.trim().length
              ? msg.message.trim().toLowerCase().includes(starredInput.trim().toLowerCase())
              : true
          )}
          keyExtractor={(m) => m._id}
          renderItem={({ item }) => <StarredMessage starredMsg={item} key={item._id} />}
        />
      ) : (
        <View
          style={{
            height: screen.height,
            width: screen.width,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size="large" color="#00af9c" />
          <Text style={{ color: 'rgba(255,255,255,.8)' }}>Fetching Messages...</Text>
        </View>
      )}
      {!starredMsgs.length && !loading && (
        <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: AppColors.dull_white }}>No starred messages.</Text>
        </View>
      )}
    </View>
  );
};

StarredMessagesScreen.navigationOptions = {
  headerTitle: 'Starred messages',
  headerRight: () => <HomeHeaderRight starredMsgsScreen />,
};

export default StarredMessagesScreen;

const styles = StyleSheet.create({});
