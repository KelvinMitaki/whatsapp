import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import {
  useFetchChatsLazyQuery,
  useFetchCurrentUserLazyQuery,
  useFetchGroupsLazyQuery,
  useFetchMessagesCountLazyQuery,
  useFetchUnreadGroupMsgsLazyQuery,
  useFetchUsersLazyQuery,
} from '../generated/graphql';

const BlankScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [fetchCurrentUser, user] = useFetchCurrentUserLazyQuery({
    onCompleted() {
      fetchChats();
      fetchGroups();
      fetchUnreadGroupMsgs();
    },
    onError() {
      navigation.replace('Start');
    },
  });
  const currentUser = user.data;
  const [fetchChats] = useFetchChatsLazyQuery({
    onCompleted(chatData) {
      fetchMessagesCount({
        variables: {
          userIDs: chatData.fetchChats.map((c) =>
            c.sender._id === currentUser?.fetchCurrentUser._id ? c.recipient._id : c.sender._id
          ),
        },
      });
    },
  });
  const [fetchMessagesCount] = useFetchMessagesCountLazyQuery({
    onCompleted(data) {
      navigation.replace('Tab');
    },
  });
  const [fetchUsers] = useFetchUsersLazyQuery();
  const [fetchGroups] = useFetchGroupsLazyQuery();
  const [fetchUnreadGroupMsgs] = useFetchUnreadGroupMsgsLazyQuery();
  useEffect(() => {
    loginUser();
  }, []);
  const loginUser = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      navigation.replace('Start');
    } else {
      fetchCurrentUser();
      fetchUsers();
    }
  };
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <ActivityIndicator color="#00af9c" size="large" />
    </View>
  );
};

export default BlankScreen;

const styles = StyleSheet.create({});
