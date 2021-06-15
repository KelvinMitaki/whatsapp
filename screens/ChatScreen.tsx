import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import Message, { SetShouldScrollToBottomOnNewMessages } from '../components/Chat/Message';
import Input, { MESSAGE_LIMIT } from '../components/Chat/Input';
import {
  MutationTuple,
  OperationVariables,
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from '@apollo/client';
import { FETCH_MESSAGES } from '../graphql/queries';
import { ADD_STARRED_MESSAGES, REMOVE_STARRED_MESSAGES } from '../graphql/mutations';
import { Chat, MessageInterface, UserOnline, UserTyping } from '../interfaces/ChatInterface';
import ChatScreenHeader from '../components/Chat/ChatScreenHeader';
import {
  UPDATE_READ_MESSAGES_SUB,
  UPDATE_USER_ONLINE_SUB,
  UPDATE_USER_TYPING_SUB,
} from '../graphql/subscriptions';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { Redux } from '../interfaces/Redux';
import {
  Exact,
  FetchCurrentUserQuery,
  FetchMessagesCountQuery,
  FetchMessagesQuery,
  useAddStarredMessagesMutation,
  useFetchChatsQuery,
  useFetchCurrentUserQuery,
  useFetchMessagesCountQuery,
  useFetchMessagesLazyQuery,
  useRemoveStarredMessagesMutation,
  useUpdateReadMessagesMutation,
  useUpdateReadMessagesSubSubscription,
  useUpdateUserOnlineSubSubscription,
  useUpdateUserTypingMutation,
  useUpdateUserTypingSubSubscription,
} from '../generated/graphql';

interface Params {
  recipient: {
    _id: string;
    name: string;
    typing: boolean;
    lastSeen: string;
    online: boolean;
  };
  chatID: string;
  setSelectedMsgs: React.Dispatch<React.SetStateAction<FetchMessagesQuery['fetchMessages']>>;
  selectedMsgs: FetchMessagesQuery['fetchMessages'];
  addStarredMessages: MutationTuple<any, Exact<{ messageIDs: string | string[] }>>[0];
  removeStarredMessages: MutationTuple<any, Exact<{ messageIDs: string | string[] }>>[0];
  currentUser: FetchCurrentUserQuery['fetchCurrentUser'];
}

export interface SetUserTyping {
  type: 'setUserTyping';
  payload: UserTyping;
}

export interface SetPreviousSelectedChat {
  type: 'setPreviousSelectedChat';
  payload: string;
}

const ChatScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [keyboardShown, setKeyboardShown] = useState<boolean>(false);
  const [selectedMsgs, setSelectedMsgs] = useState<FetchMessagesQuery['fetchMessages']>([]);
  const previousSelectedChatIds = useSelector((state: Redux) => state.chat.previousSelectedChatIds);
  const user = useFetchCurrentUserQuery();
  const currentUser = user.data?.fetchCurrentUser;
  const dispatch = useDispatch();
  const chatID = navigation.getParam('chatID');
  const recipient = navigation.getParam('recipient');
  useUpdateUserOnlineSubSubscription({
    onSubscriptionData(subData) {
      if (subData.subscriptionData.data) {
        const onlineData = subData.subscriptionData.data.updateUserOnline;
        if (onlineData.userID === recipient._id) {
          navigation.setParams({
            recipient: { ...recipient, online: onlineData.online, lastSeen: new Date().toString() },
          });
        }
      }
    },
  });
  useUpdateUserTypingSubSubscription({
    variables: { chatID },
    onSubscriptionData(subData) {
      if (subData.subscriptionData.data) {
        const userTyping = subData.subscriptionData.data.updateUserTyping;
        if (chatID === userTyping.chatID && userTyping.typingUserID !== currentUser?._id) {
          dispatch<SetUserTyping>({ type: 'setUserTyping', payload: userTyping });
          navigation.setParams({ recipient: { ...recipient, typing: userTyping.typing } });
        }
      }
    },
  });
  useUpdateReadMessagesSubSubscription({
    variables: { sender: currentUser!._id, recipient: recipient._id },
    onSubscriptionData({ client: { writeQuery, readQuery }, subscriptionData: { data } }) {
      if (data) {
        const incommingMsgs = data.updateReadMessages;
        const msgs: FetchMessagesQuery | null = readQuery({
          query: FETCH_MESSAGES,
        });
        let existingMessages = [...(msgs?.fetchMessages || [])];
        incommingMsgs.forEach((msg) => {
          const index = existingMessages.findIndex((m) => m._id === msg._id);
          if (index !== -1) {
            existingMessages[index] = msg;
          }
        });
        dispatch<SetShouldScrollToBottomOnNewMessages>({
          type: 'setShouldScrollToBottomOnNewMessages',
          payload: false,
        });
        writeQuery({
          query: FETCH_MESSAGES,
          data: { fetchMessages: existingMessages },
        });
      }
    },
  });
  const { data: chatsData } = useFetchChatsQuery();
  const count = useFetchMessagesCountQuery({
    variables: {
      userIDs: (chatsData?.fetchChats as Chat[]).map((c) =>
        c.sender._id === currentUser?._id ? c.recipient._id : c.sender._id
      ),
    },
    onCompleted() {
      fetchMessages({
        variables: {
          recipient: recipient._id,
          offset: 0,
          limit: MESSAGE_LIMIT,
          messageCount:
            (count.data?.fetchMessagesCount as FetchMessagesCountQuery['fetchMessagesCount']).find(
              (mc) => mc.chatID === chatID
            )?.messageCount || MESSAGE_LIMIT,
        },
      });
    },
  });

  const [fetchMessages, { loading, data, fetchMore }] = useFetchMessagesLazyQuery({
    fetchPolicy:
      previousSelectedChatIds.length && previousSelectedChatIds.find((id) => id === chatID)
        ? 'cache-first'
        : 'network-only',
    onCompleted() {
      if (!previousSelectedChatIds.find((id) => id === chatID)) {
        dispatch<SetPreviousSelectedChat>({ type: 'setPreviousSelectedChat', payload: chatID });
      }
    },
  });
  const [updateReadMessages] = useUpdateReadMessagesMutation();
  const [updateUserTyping] = useUpdateUserTypingMutation();
  const [addStarredMessages] = useAddStarredMessagesMutation({
    update(cache, { data }) {
      if (data) {
        const incommingMsgs = data.addStarredMessages;
        const msgs: FetchMessagesQuery | null = cache.readQuery({
          query: FETCH_MESSAGES,
        });
        let existingMessages = [...(msgs?.fetchMessages || [])];
        incommingMsgs.forEach((msg) => {
          const index = existingMessages.findIndex((m) => m._id === msg._id);
          if (index !== -1) {
            existingMessages[index] = msg;
          }
        });
        dispatch<SetShouldScrollToBottomOnNewMessages>({
          type: 'setShouldScrollToBottomOnNewMessages',
          payload: false,
        });
        cache.writeQuery({ query: FETCH_MESSAGES, data: { fetchMessages: existingMessages } });
        ToastAndroid.show(
          `Starred ${incommingMsgs.length === 1 ? 'message' : 'messages'}`,
          ToastAndroid.LONG
        );
      }
    },
  });
  const [removeStarredMessages] = useRemoveStarredMessagesMutation({
    update(cache, { data }) {
      if (data) {
        const incommingMsgs = data.removeStarredMessages;
        const msgs: FetchMessagesQuery | null = cache.readQuery({
          query: FETCH_MESSAGES,
        });
        let existingMessages = [...(msgs?.fetchMessages || [])];
        incommingMsgs.forEach((msg) => {
          const index = existingMessages.findIndex((m) => m._id === msg._id);
          if (index !== -1) {
            existingMessages[index] = msg;
          }
        });
        dispatch<SetShouldScrollToBottomOnNewMessages>({
          type: 'setShouldScrollToBottomOnNewMessages',
          payload: false,
        });
        cache.writeQuery({ query: FETCH_MESSAGES, data: { fetchMessages: existingMessages } });
        ToastAndroid.show(
          `Unstarred ${incommingMsgs.length === 1 ? 'message' : 'messages'}`,
          ToastAndroid.LONG
        );
      }
    },
  });
  useEffect(() => {
    navigation.setParams({
      setSelectedMsgs,
      addStarredMessages,
      removeStarredMessages,
      currentUser,
    });
    BackHandler.addEventListener('hardwareBackPress', handleBackBtnPressAndroid);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackBtnPressAndroid);
    };
  }, []);
  useEffect(() => {
    navigation.setParams({ selectedMsgs });
  }, [selectedMsgs]);
  useEffect(() => {
    if (data && data.fetchMessages && data.fetchMessages.length) {
      const messageIDs = (data.fetchMessages as MessageInterface[])
        .filter((m) => !m.read && m.sender !== currentUser?._id)
        .map((m) => m._id);
      messageIDs.length &&
        chatID &&
        updateReadMessages({
          variables: {
            messageIDs,
            chatID,
          },
        });
    }
  }, [data]);
  useEffect(() => {
    if (keyboardShown) {
      updateUserTyping({ variables: { typing: true, chatID, typingUserID: currentUser!._id } });
    } else {
      updateUserTyping({ variables: { typing: false, chatID, typingUserID: currentUser!._id } });
    }
  }, [keyboardShown]);
  const handleBackBtnPressAndroid = () => {
    if (!navigation.isFocused()) {
      return false;
    }
    navigation.navigate('Home');
    return true;
  };
  const screen = Dimensions.get('screen');
  return (
    <View>
      <NavigationEvents
        onWillBlur={() =>
          updateUserTyping({ variables: { typing: false, chatID, typingUserID: currentUser!._id } })
        }
        onDidFocus={() =>
          dispatch<SetShouldScrollToBottomOnNewMessages>({
            type: 'setShouldScrollToBottomOnNewMessages',
            payload: true,
          })
        }
      />
      {((loading && showLoading) || count.loading) && (
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
      {data && (
        <View style={{ height: '100%' }}>
          <Message
            messages={data.fetchMessages}
            recipient={navigation.getParam('recipient')._id}
            fetchMore={fetchMore}
            setShowLoading={setShowLoading}
            showLoading={showLoading}
            keyboardShown={keyboardShown}
            selectedMsgs={selectedMsgs}
            setSelectedMsgs={setSelectedMsgs}
            chatID={chatID}
          />
          <Input
            screen="chat"
            recipient={navigation.getParam('recipient')._id}
            setKeyboardShown={setKeyboardShown}
          />
        </View>
      )}
    </View>
  );
};

ChatScreen.navigationOptions = ChatScreenHeader;

export default ChatScreen;

const styles = StyleSheet.create({});
