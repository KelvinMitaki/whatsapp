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
  FetchMessagesCountQuery,
  FetchMessagesQuery,
  useAddNewChatSubSubscription,
  useFetchChatsQuery,
  useFetchCurrentUserQuery,
  useFetchMessagesCountQuery,
  useUpdateUserOnlineMutation,
  useUpdateUserOnlineSubSubscription,
} from '../generated/graphql';
import { MESSAGE_LIMIT } from '../components/Chat/Input';
import { FETCH_CHATS, FETCH_MESSAGES, FETCH_MESSAGES_COUNT } from '../graphql/queries';

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
  const currentUser = user.data?.fetchCurrentUser;
  const count = useFetchMessagesCountQuery({
    variables: {
      userIDs:
        data?.fetchChats.map((ch) =>
          ch.sender._id !== currentUser?._id ? ch.sender._id : ch.recipient._id
        ) || [],
    },
  });
  const [updateUserOnline] = useUpdateUserOnlineMutation();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  useAddNewChatSubSubscription({
    variables: { userID: currentUser!._id },
    onSubscriptionData({ subscriptionData, client }) {
      if (subscriptionData.data && subscriptionData.data.addNewChat) {
        const { chat, message } = subscriptionData.data.addNewChat;
        const variables = {
          recipient: chat.recipient._id,
          offset: count.data?.fetchMessagesCount.find((mc) => mc.chatID === chat._id) || 0,
          limit: MESSAGE_LIMIT,
          messageCount:
            count.data?.fetchMessagesCount.find((mc) => mc.chatID === chat._id)?.messageCount ||
            MESSAGE_LIMIT,
        };
        const msgsCountReadOnly = client.readQuery<FetchMessagesCountQuery>({
          query: FETCH_MESSAGES_COUNT,
          variables: {
            userIDs:
              data?.fetchChats.map((ch) =>
                ch.sender._id !== currentUser?._id ? ch.sender._id : ch.recipient._id
              ) || [],
          },
        });
        let msgsCount = [...(msgsCountReadOnly?.fetchMessagesCount || [])];
        const countIndex = msgsCount.findIndex((c) => c.chatID === chat._id);
        let msgCount: FetchMessagesCountQuery['fetchMessagesCount'] = [];
        if (countIndex !== -1) {
          let count = msgsCount[countIndex];
          count = { ...count, messageCount: count.messageCount + 1 };
          msgCount = [count];
        } else {
          msgCount = [{ __typename: 'MessageCount', chatID: chat._id, messageCount: 1 }];
        }
        client.writeQuery<FetchMessagesCountQuery>({
          query: FETCH_MESSAGES_COUNT,
          data: { fetchMessagesCount: msgCount },
        });
        client.writeQuery<FetchMessagesQuery>({
          query: FETCH_MESSAGES,
          data: { fetchMessages: [message] },
          variables,
        });

        const existingChatsReadOnly = client.readQuery<FetchChatsQuery>({ query: FETCH_CHATS });
        let existingChats = [...(existingChatsReadOnly?.fetchChats || [])];
        const chatIndex = existingChats.findIndex((ch) => ch._id === chat._id);
        if (chatIndex !== -1) {
          existingChats[chatIndex] = chat;
        } else {
          existingChats = [...existingChats, chat];
        }
        client.writeQuery<FetchChatsQuery>({
          query: FETCH_CHATS,
          data: { fetchChats: existingChats },
        });
      }
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
      <HomeChat data={renderData()} />
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
