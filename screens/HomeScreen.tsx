import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, AppState, AppStateStatus } from 'react-native';
import { NavigationMaterialTabScreenComponent } from 'react-navigation-tabs';
import HomeChat from '../components/Home/HomeChat';
import { useHeaderHeight } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import StartChat from '../components/Home/StartChat';
import {
  FetchChatsQuery,
  useAddNewChatSubSubscription,
  useFetchChatsQuery,
  useFetchCurrentUserQuery,
  useUpdateUserOnlineMutation,
  useUpdateUserOnlineSubSubscription,
} from '../generated/graphql';

export interface SetHeaderHeight {
  type: 'setHeaderHeight';
  payload: number;
}

export interface SetSearchModal {
  type: 'setSearchModal';
  payload: boolean;
}

const HomeScreen: NavigationMaterialTabScreenComponent = () => {
  const { data } = useFetchChatsQuery();
  const userOnlineSub = useUpdateUserOnlineSubSubscription();
  const user = useFetchCurrentUserQuery();
  const [updateUserOnline] = useUpdateUserOnlineMutation();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [chatSub, setChatSub] = useState<FetchChatsQuery['fetchChats']>([]);
  const currentUser = user.data?.fetchCurrentUser;
  const chat = useAddNewChatSubSubscription({
    variables: { userID: currentUser!._id },
    onSubscriptionData({ subscriptionData }) {
      console.log(subscriptionData.data!.addNewChat);
      //   if (subscriptionData.data && subscriptionData.data.addNewChat) {
      //   const variables = {
      //     recipient: subscriptionData.data.addNewChat.recipient._id,
      //     offset: count.data?.fetchMessagesCount.find(mc=>mc.chatID===subscriptionData.data!.addNewChat._id) || 0,
      //     limit: MESSAGE_LIMIT,
      //     messageCount:
      //       count.data?.fetchMessagesCount.find((mc) => mc.chatID === subscriptionData.data!.addNewChat._id)?.messageCount ||
      //       MESSAGE_LIMIT,
      //   };
      //   const existingMessages = client.readQuery<FetchMessagesQuery>({
      //     query: FETCH_MESSAGES,
      //     variables,
      //   });
      //   const newMsgs = [
      //     ...(existingMessages?.fetchMessages || []),
      //     subscriptionData.data!.addNewMessage,
      //   ];
      //   client.writeQuery<FetchMessagesQuery>({
      //     query: FETCH_MESSAGES,
      //     data: { fetchMessages: newMsgs },
      //     variables,
      //   });
      // }
    },
  });
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
      setChatSub((c) => [chat.data!.addNewChat, ...c]);
    }
  }, [chat.data]);
  const renderData = (): { fetchChats: FetchChatsQuery['fetchChats'] } => {
    if (data && data.fetchChats && userOnlineSub.data && userOnlineSub.data.updateUserOnline) {
      const onlineData = userOnlineSub.data.updateUserOnline;
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
