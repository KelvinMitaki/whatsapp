import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, BackHandler, ActivityIndicator, ToastAndroid } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import inspect from '../inspect';
import { TouchableNativeFeedback } from 'react-native';
import Input, { MESSAGE_LIMIT } from '../components/Chat/Input';
import GroupMessage from '../components/GroupChat/GroupMessage';
import AppColors from '../Colors/color';
import {
  MutationTuple,
  OperationVariables,
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from '@apollo/client';
import {
  FETCH_CURRENT_USER,
  FETCH_GROUP,
  FETCH_GROUP_MSGS,
  FETCH_GROUP_MSG_COUNT,
  FETCH_UNREAD_GROUP_MSGS,
} from '../graphql/queries';
import { GroupMsg, GroupWithParticipants, GroupUserTyping } from '../interfaces/GroupInterface';
import {
  ADD_STARRED_GROUP_MSGS,
  REMOVE_STARRED_GROUP_MESSAGES,
  UPDATE_GROUP_MESSAGES_READ,
  UPDATE_GROUP_TYPING,
} from '../graphql/mutations';
import { useDispatch, useSelector } from 'react-redux';
import { SetIncommingUnread } from '../components/Group/GroupChat';
import GroupChatScreenHeader from '../components/GroupChat/GroupChatScreenHeader';
import { UPDATE_GROUP_TYPING_SUB } from '../graphql/subscriptions';
import { SetShouldScrollToBottomOnNewMessages } from '../components/Chat/Message';
import { NavigationEvents } from 'react-navigation';
import { Redux } from '../interfaces/Redux';
import {
  FetchCurrentUserQuery,
  FetchGroupMsgsQuery,
  FetchGroupQuery,
  useFetchCurrentUserQuery,
  useFetchGroupMessageCountQuery,
  useFetchGroupMsgsLazyQuery,
  useFetchGroupQuery,
  useUpdateGroupMessagesReadMutation,
} from '../generated/graphql';

interface Params {
  groupID: string;
  group: FetchGroupQuery['fetchGroup'];
  typingData: GroupUserTyping | undefined;
  setSelectedMsgs: React.Dispatch<React.SetStateAction<FetchGroupMsgsQuery['fetchGroupMsgs']>>;
  selectedMsgs: FetchGroupMsgsQuery['fetchGroupMsgs'];
  addStarredGroupMessages: MutationTuple<any, OperationVariables>[0];
  removeStarredGroupMessages: MutationTuple<any, OperationVariables>[0];
  currentUser: FetchCurrentUserQuery['fetchCurrentUser'];
}

export interface SetGroupUserTyping {
  type: 'setGroupUserTyping';
  payload: GroupUserTyping;
}

const GroupChatScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [keyboardShown, setKeyboardShown] = useState<boolean>(false);
  const [selectedMsgs, setSelectedMsgs] = useState<FetchGroupMsgsQuery['fetchGroupMsgs']>([]);
  const shouldScrollToBottomOnNewMessages = useSelector(
    (state: Redux) => state.chat.shouldScrollToBottomOnNewMessages
  );
  const dispatch = useDispatch();
  const groupID = navigation.getParam('groupID');
  const [addStarredGroupMessages] = useMutation(ADD_STARRED_GROUP_MSGS, {
    update(cache, { data: { addStarredGroupMessages } }) {
      const incommingMessages: GroupMsg[] = addStarredGroupMessages;
      const msgs: { fetchGroupMsgs: GroupMsg[] } | null = cache.readQuery({
        query: FETCH_GROUP_MSGS,
      });

      let existingMessages = [...(msgs?.fetchGroupMsgs || [])];
      incommingMessages.forEach((msg) => {
        const index = existingMessages.findIndex((m) => m._id === msg._id);
        if (index !== -1) {
          existingMessages[index] = msg;
        }
      });
      dispatch<SetShouldScrollToBottomOnNewMessages>({
        type: 'setShouldScrollToBottomOnNewMessages',
        payload: false,
      });
      cache.writeQuery({ query: FETCH_GROUP_MSGS, data: { fetchGroupMsgs: existingMessages } });
      ToastAndroid.show(
        `Starred ${incommingMessages.length === 1 ? 'message' : 'messages'}`,
        ToastAndroid.LONG
      );
    },
  });
  const [removeStarredGroupMessages] = useMutation(REMOVE_STARRED_GROUP_MESSAGES, {
    update(cache, { data: { removeStarredGroupMessages } }) {
      const incommingMessages: GroupMsg[] = removeStarredGroupMessages;
      const msgs: { fetchGroupMsgs: GroupMsg[] } | null = cache.readQuery({
        query: FETCH_GROUP_MSGS,
      });

      let existingMessages = [...(msgs?.fetchGroupMsgs || [])];
      incommingMessages.forEach((msg) => {
        const index = existingMessages.findIndex((m) => m._id === msg._id);
        if (index !== -1) {
          existingMessages[index] = msg;
        }
      });
      dispatch<SetShouldScrollToBottomOnNewMessages>({
        type: 'setShouldScrollToBottomOnNewMessages',
        payload: false,
      });
      cache.writeQuery({ query: FETCH_GROUP_MSGS, data: { fetchGroupMsgs: existingMessages } });
      ToastAndroid.show(
        `Unstarred ${incommingMessages.length === 1 ? 'message' : 'messages'} `,
        ToastAndroid.LONG
      );
    },
  });
  const { data: userData } = useFetchCurrentUserQuery();
  const currentUser = userData?.fetchCurrentUser;
  const [updateGroupMessagesRead] = useUpdateGroupMessagesReadMutation({
    refetchQueries: [{ query: FETCH_UNREAD_GROUP_MSGS }],
    onCompleted() {
      dispatch<SetIncommingUnread>({ type: 'setIncommingUnread', payload: [] });
    },
  });
  const { loading, data: countData } = useFetchGroupMessageCountQuery({
    fetchPolicy: 'network-only',
    variables: { groupID },
    onCompleted(data) {
      fetchGroupMsgs({
        variables: {
          groupID,
          offset: 0,
          limit: MESSAGE_LIMIT,
          messageCount: data.fetchGroupMessageCount.count,
        },
      });
    },
  });
  const [fetchGroupMsgs, { data, fetchMore, loading: msgsLoading }] = useFetchGroupMsgsLazyQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted(incommingData) {
      const groupMsgs = incommingData.fetchGroupMsgs;
      const messageIDs = groupMsgs
        .filter(
          (msg) =>
            msg.sender._id !== currentUser?._id && !msg.read.some((id) => id === currentUser?._id)
        )
        .map((msg) => msg._id);
      if (groupID && messageIDs.length) {
        updateGroupMessagesRead({
          variables: {
            messageIDs,
            groupID,
          },
        });
      }
    },
  });
  const [updateGroupTyping] = useMutation(UPDATE_GROUP_TYPING);
  useSubscription(UPDATE_GROUP_TYPING_SUB, {
    variables: { groupID },
    onSubscriptionData({ subscriptionData: { data } }) {
      const parsedData: GroupUserTyping = data.updateGroupTyping;
      if (parsedData.typingUserID !== currentUser?._id) {
        dispatch<SetGroupUserTyping>({ type: 'setGroupUserTyping', payload: parsedData });
        navigation.setParams({ typingData: parsedData });
      }
    },
  });
  const group = useFetchGroupQuery({ variables: { groupID } });
  useEffect(() => {
    navigation.setParams({
      addStarredGroupMessages,
      removeStarredGroupMessages,
      setSelectedMsgs,
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
    if (group.data && group.data.fetchGroup) {
      navigation.setParams({ group: group.data.fetchGroup });
    }
  }, [group.data]);
  useEffect(() => {
    if (keyboardShown) {
      updateGroupTyping({ variables: { groupID, typing: true, typingUserID: currentUser?._id } });
    } else {
      updateGroupTyping({ variables: { groupID, typing: false, typingUserID: currentUser?._id } });
    }
  }, [keyboardShown]);
  const handleBackBtnPressAndroid = () => {
    if (!navigation.isFocused()) {
      return false;
    }
    navigation.navigate('Group');
    return true;
  };
  const loaders =
    (!(data && data.fetchGroupMsgs) ||
      !(group.data && group.data.fetchGroup) ||
      (msgsLoading && showLoading) ||
      loading) &&
    shouldScrollToBottomOnNewMessages;
  return (
    <View style={{ height: '100%' }}>
      <NavigationEvents
        onDidFocus={() =>
          dispatch<SetShouldScrollToBottomOnNewMessages>({
            type: 'setShouldScrollToBottomOnNewMessages',
            payload: true,
          })
        }
      />
      {loaders ? (
        <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={AppColors.secodary} />
          <Text style={{ color: 'rgba(255,255,255,.8)' }}>Fetching messages...</Text>
        </View>
      ) : (
        <>
          <GroupMessage
            messages={data!.fetchGroupMsgs}
            groupID={groupID}
            count={countData!.fetchGroupMessageCount.count}
            fetchMore={fetchMore}
            setShowLoading={setShowLoading}
            showLoading={showLoading}
            keyboardShown={keyboardShown}
            selectedMsgs={selectedMsgs}
            setSelectedMsgs={setSelectedMsgs}
          />
          <Input screen="group" group={groupID} setKeyboardShown={setKeyboardShown} />
        </>
      )}
    </View>
  );
};

GroupChatScreen.navigationOptions = GroupChatScreenHeader;

export default GroupChatScreen;

const styles = StyleSheet.create({});
