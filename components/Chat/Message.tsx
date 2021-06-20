import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  NativeScrollEvent,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { LazyQueryResult, OperationVariables } from '@apollo/client';
import format from 'date-fns/format';
import AppColors from '../../Colors/color';
import { MESSAGE_LIMIT } from './Input';
import { useDispatch, useSelector } from 'react-redux';
import { Redux } from '../../interfaces/Redux';
import {
  FetchMessagesCountQuery,
  FetchMessagesQuery,
  useAddNewMessageSubSubscription,
  useFetchChatsQuery,
  useFetchCurrentUserQuery,
  useFetchMessagesCountQuery,
} from '../../generated/graphql';
import { FETCH_MESSAGES, FETCH_MESSAGES_COUNT } from '../../graphql/queries';

interface Props {
  messages: FetchMessagesQuery['fetchMessages'];
  recipient: string;
  fetchMore: LazyQueryResult<any, OperationVariables>['fetchMore'] | undefined;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showLoading: boolean;
  keyboardShown: boolean;
  setSelectedMsgs: React.Dispatch<React.SetStateAction<FetchMessagesQuery['fetchMessages']>>;
  selectedMsgs: FetchMessagesQuery['fetchMessages'];
  chatID: string;
}

export interface SetShouldScrollToBottomOnNewMessages {
  type: 'setShouldScrollToBottomOnNewMessages';
  payload: boolean;
}

const Message: React.FC<Props> = (props) => {
  const {
    messages,
    recipient,
    fetchMore,
    setShowLoading,
    showLoading,
    keyboardShown,
    selectedMsgs,
    setSelectedMsgs,
    chatID,
  } = props;
  const { data } = useFetchCurrentUserQuery();
  const currentUser = data?.fetchCurrentUser;
  const { data: chatsData } = useFetchChatsQuery();
  const count = useFetchMessagesCountQuery({
    variables: {
      userIDs: (chatsData?.fetchChats || []).map((c) =>
        c.sender._id === (currentUser && currentUser._id) ? c.recipient._id : c.sender._id
      ),
    },
  });
  const shouldScrollToBottomOnNewMessages = useSelector(
    (state: Redux) => state.chat.shouldScrollToBottomOnNewMessages
  );
  const dispatch = useDispatch();
  useAddNewMessageSubSubscription({
    variables: { sender: currentUser!._id, recipient },
    onSubscriptionData({ client, subscriptionData }) {
      if (!shouldScrollToBottomOnNewMessages) {
        dispatch<SetShouldScrollToBottomOnNewMessages>({
          type: 'setShouldScrollToBottomOnNewMessages',
          payload: true,
        });
      }
      if (subscriptionData.data && subscriptionData.data.addNewMessage) {
        const { addNewMessage: newMessage } = subscriptionData.data;
        const variables = {
          recipient,
          offset: messages.length || 0,
          limit: MESSAGE_LIMIT,
          messageCount:
            count.data?.fetchMessagesCount.find((mc) => mc.chatID === chatID)?.messageCount ||
            MESSAGE_LIMIT,
        };
        const existingMessagesReadOnly = client.readQuery<FetchMessagesQuery>({
          query: FETCH_MESSAGES,
          variables,
        });
        let existingMessages = [...(existingMessagesReadOnly?.fetchMessages || [])];
        const msgIndex = existingMessages.findIndex((m) => m._id === newMessage._id);
        console.log(existingMessages.length);
        if (msgIndex === -1) {
          existingMessages = [...existingMessages, newMessage];
          const msgsCountReadOnly = client.readQuery<FetchMessagesCountQuery>({
            query: FETCH_MESSAGES_COUNT,
            variables: {
              userIDs: [recipient],
            },
          });
          console.log(msgsCountReadOnly?.fetchMessagesCount);
          // let msgsCount = [...(msgsCountReadOnly?.fetchMessagesCount || [])];
          //   const countIndex = msgsCount.findIndex((c) => c.chatID === chat._id);
          //   if (countIndex !== -1) {
          //     let count = msgsCount[countIndex];
          //     count = { ...count, messageCount: count.messageCount + 1 };
          //   } else {
          //     msgsCount = [
          //       ...msgsCount,
          //       { __typename: 'MessageCount', chatID: chat._id, messageCount: 1 },
          //     ];
          //   }
          //   client.writeQuery<FetchMessagesCountQuery>({
          //     query: FETCH_MESSAGES_COUNT,
          //     data: { fetchMessagesCount: msgsCount },
          //   });
        }
        client.writeQuery<FetchMessagesQuery>({
          query: FETCH_MESSAGES,
          data: { fetchMessages: existingMessages },
          variables,
        });
      }
    },
  });
  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    if (scrollViewRef.current && showLoading && shouldScrollToBottomOnNewMessages) {
      scrollViewRef.current.scrollToEnd();
    }
  }, [messages, keyboardShown]);
  const isCloseToTop = ({ contentOffset }: NativeScrollEvent) => {
    return contentOffset.y === 0;
  };
  const filteredMsgs = messages
    .filter((m, i, s) => i === s.findIndex((ms) => ms._id === m._id))
    .filter(
      (msg) =>
        (msg.sender === currentUser?._id && msg.recipient === recipient) ||
        (msg.sender === recipient && msg.recipient === currentUser?._id)
    )
    .sort((a, b) => parseInt(a.createdAt) - parseInt(b.createdAt));
  return (
    <View style={{ height: keyboardShown ? '85%' : '90%' }}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={({ nativeEvent }) => {
          if (
            isCloseToTop(nativeEvent) &&
            fetchMore &&
            count.data &&
            (count.data.fetchMessagesCount.find((mc) => mc.chatID === chatID)?.messageCount || 0) >
              filteredMsgs.length
          ) {
            if (!shouldScrollToBottomOnNewMessages) {
              dispatch<SetShouldScrollToBottomOnNewMessages>({
                type: 'setShouldScrollToBottomOnNewMessages',
                payload: true,
              });
            }
            setShowLoading(false);
            fetchMore({ variables: { offset: filteredMsgs.length, limit: MESSAGE_LIMIT } });
          }
        }}
      >
        {filteredMsgs.map((item, index) => (
          <TouchableNativeFeedback
            onLongPress={() => !selectedMsgs.length && setSelectedMsgs((msgs) => [item, ...msgs])}
            onPress={() =>
              selectedMsgs.length &&
              setSelectedMsgs((msgs) => {
                let selectedMsgs = [...msgs];
                const selectedMsgIndex = selectedMsgs.findIndex((msg) => msg._id === item._id);
                if (selectedMsgIndex !== -1) {
                  selectedMsgs.splice(selectedMsgIndex, 1);
                } else {
                  selectedMsgs = [item, ...selectedMsgs];
                }
                return selectedMsgs;
              })
            }
            key={item._id}
            touchSoundDisabled={selectedMsgs.length === 0}
          >
            <View style={{ marginVertical: 5 }}>
              {index === 0 &&
                count.data &&
                (count.data.fetchMessagesCount.find((mc) => mc.chatID === chatID)?.messageCount ||
                  0) > filteredMsgs.length &&
                filteredMsgs.length > 20 && (
                  <ActivityIndicator size="large" color={AppColors.secodary} />
                )}
              {selectedMsgs.some((msg) => msg._id === item._id) && (
                <View style={styles.selectedMsgPrt}>
                  <View style={styles.selectedMsg}>
                    <Text style={{ color: 'transparent' }}>{item.message}</Text>
                  </View>
                </View>
              )}
              {currentUser?._id === item.sender ? (
                <View style={styles.me}>
                  <Text style={{ color: '#fff' }}>{item.message}</Text>
                  <Text style={styles.meta}>
                    {item.starredBy?.some((id) => id === currentUser?._id) && (
                      <Entypo name="star" size={13} />
                    )}{' '}
                    {format(new Date(parseInt(item.createdAt)), 'p')}{' '}
                    {item.read ? (
                      <Ionicons name="checkmark-done" size={18} color={AppColors.blue_tick} />
                    ) : (
                      <Ionicons name="checkmark" size={18} />
                    )}
                  </Text>
                </View>
              ) : (
                <View style={styles.sender}>
                  <Text style={{ color: '#fff' }}>{item.message}</Text>
                  <Text style={styles.meta}>
                    {item.starredBy?.some((id) => id === currentUser?._id) && (
                      <Entypo name="star" size={13} />
                    )}{' '}
                    {format(new Date(parseInt(item.createdAt)), 'p')}
                  </Text>
                </View>
              )}
            </View>
          </TouchableNativeFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  prt: {
    marginTop: 10,
    marginBottom: 50,
  },
  me: {
    alignSelf: 'flex-end',
    backgroundColor: '#00af9c',
    paddingHorizontal: 5,
    maxWidth: '70%',
    minWidth: '25%',
    minHeight: 50,
    borderRadius: 5,
    paddingBottom: 20,
    marginRight: 10,
  },
  sender: {
    alignSelf: 'flex-start',
    backgroundColor: '#262d31',
    paddingHorizontal: 5,
    maxWidth: '70%',
    minWidth: '25%',
    minHeight: 50,
    borderRadius: 5,
    paddingBottom: 20,
    marginLeft: 10,
  },
  meta: {
    color: 'rgba(255,255,255,.7)',
    fontSize: 12,
    position: 'absolute',
    bottom: 3,
    right: 5,
    paddingLeft: 10,
  },
  selectedMsgPrt: {
    backgroundColor: AppColors.message_selection_highlight,
    position: 'absolute',
    elevation: 1000,
    bottom: 0,
    width: '100%',
  },
  selectedMsg: {
    paddingHorizontal: 5,
    maxWidth: '70%',
    minWidth: '20%',
    minHeight: 50,
    borderRadius: 5,
    paddingBottom: 20,
    marginRight: 10,
  },
});
