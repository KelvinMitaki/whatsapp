import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, AppState, AppStateStatus, Text } from 'react-native';
import { NavigationMaterialTabScreenComponent } from 'react-navigation-tabs';
import { users } from '../data/data';
import inspect from '../inspect';
import HomeChat from '../components/Home/HomeChat';
import { useHeaderHeight } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { FETCH_CHATS, FETCH_CURRENT_USER } from '../graphql/queries';
import StartChat from '../components/Home/StartChat';
import {
  ADD_NEW_CHAT_SUB,
  UPDATE_USER_ONLINE_SUB,
  UPDATE_USER_TYPING_SUB,
} from '../graphql/subscriptions';
import { Chat, CurrentUser, UserOnline } from '../interfaces/ChatInterface';
import { UPDATE_USER_ONLINE } from '../graphql/mutations';
import {
  FetchChatsQuery,
  useFetchChatsQuery,
  useFetchCurrentUserQuery,
} from '../generated/graphql';

export interface SetHeaderHeight {
  type: 'setHeaderHeight';
  payload: number;
}

export interface SetSearchModal {
  type: 'setSearchModal';
  payload: boolean;
}

const HomeScreen: NavigationMaterialTabScreenComponent = ({ navigation }) => {
  const { data } = useFetchChatsQuery();
  const userOnlineSub = useSubscription(UPDATE_USER_ONLINE_SUB);
  const user = useFetchCurrentUserQuery();
  const [updateUserOnline] = useMutation(UPDATE_USER_ONLINE);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [chatSub, setChatSub] = useState<Chat[]>([]);
  const currentUser = user.data?.fetchCurrentUser;
  const chat = useSubscription(ADD_NEW_CHAT_SUB, { variables: { userID: currentUser?._id } });
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    dispatch<SetHeaderHeight>({ type: 'setHeaderHeight', payload: headerHeight });
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);
  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      updateUserOnline({ variables: { online: true } });
    } else {
      updateUserOnline({ variables: { online: false } });
    }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };
  useEffect(() => {
    if (chat.data && chat.data.addNewChat) {
      setChatSub((c) => [chat.data.addNewChat, ...c]);
    }
  }, [chat.data]);
  const renderData = (): { fetchChats: FetchChatsQuery['fetchChats'] } => {
    if (data && data.fetchChats && userOnlineSub.data && userOnlineSub.data.updateUserOnline) {
      const onlineData: UserOnline = userOnlineSub.data.updateUserOnline;
      const chats = data.fetchChats;
      return {
        ...data,
        fetchChats: chats.map((ch) => {
          if (ch.sender._id === onlineData.userID) {
            return {
              ...ch,
              sender: { ...ch.sender, online: onlineData.online, lastSeen: new Date().toString() },
            };
          }
          if (ch.recipient._id === onlineData.userID) {
            return {
              ...ch,
              recipient: {
                ...ch.recipient,
                online: onlineData.online,
                lastSeen: new Date().toString(),
              },
            };
          }
          return ch;
        }),
      };
    }
    return data!;
  };
  return (
    <View style={styles.prt}>
      <NavigationEvents
        onDidBlur={() => dispatch<SetSearchModal>({ type: 'setSearchModal', payload: false })}
        onWillFocus={() => dispatch<SetSearchModal>({ type: 'setSearchModal', payload: false })}
      />
      <HomeChat
        chatSub={chatSub}
        chat={chat.data && chat.data.addNewChat ? chat.data.addNewChat : null}
        data={renderData()}
      />
      {data && data.fetchChats && (
        <View
          style={{ ...(!data.fetchChats.length && { height: '100%', justifyContent: 'flex-end' }) }}
        >
          <StartChat chats={data.fetchChats} />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  prt: {
    height: '100%',
    justifyContent: 'space-between',
  },
});
