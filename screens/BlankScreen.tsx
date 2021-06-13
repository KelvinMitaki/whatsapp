import { useLazyQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useFetchCurrentUserLazyQuery } from '../generated/graphql';
import {
  FETCH_CHATS,
  FETCH_CURRENT_USER,
  FETCH_GROUPS,
  FETCH_MESSAGES_COUNT,
  FETCH_UNREAD_GROUP_MSGS,
  FETCH_USERS,
} from '../graphql/queries';
import { Chat } from '../interfaces/ChatInterface';

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
  const [fetchChats, { data }] = useLazyQuery(FETCH_CHATS, {
    onCompleted() {
      fetchMessagesCount({
        variables: {
          userIDs: (data.fetchChats as Chat[]).map((c) =>
            c.sender._id === currentUser?.fetchCurrentUser._id ? c.recipient._id : c.sender._id
          ),
        },
      });
    },
  });
  const [fetchMessagesCount] = useLazyQuery(FETCH_MESSAGES_COUNT, {
    onCompleted() {
      navigation.replace('Tab');
    },
  });
  const [fetchUsers] = useLazyQuery(FETCH_USERS);
  const [fetchGroups] = useLazyQuery(FETCH_GROUPS);
  const [fetchUnreadGroupMsgs] = useLazyQuery(FETCH_UNREAD_GROUP_MSGS);
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
