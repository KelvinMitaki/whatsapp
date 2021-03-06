import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeScrollEvent,
  ScrollView,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { LazyQueryResult, OperationVariables } from '@apollo/client';
import { format } from 'date-fns';
import AppColors from '../../Colors/color';
import { MESSAGE_LIMIT } from '../Chat/Input';
import { SetShouldScrollToBottomOnNewMessages } from '../Chat/Message';
import { useDispatch, useSelector } from 'react-redux';
import { Redux } from '../../interfaces/Redux';
import {
  FetchGroupMsgsQuery,
  useAddNewGroupMsgSubSubscription,
  useFetchCurrentUserQuery,
} from '../../generated/graphql';

export const genRandomNum = () => Math.random() * (255 - 1) + 1;

interface Props {
  messages: FetchGroupMsgsQuery['fetchGroupMsgs'];
  groupID: string;
  fetchMore: LazyQueryResult<any, OperationVariables>['fetchMore'] | undefined;
  count: number;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showLoading: boolean;
  keyboardShown: boolean;
  setSelectedMsgs: React.Dispatch<React.SetStateAction<FetchGroupMsgsQuery['fetchGroupMsgs']>>;
  selectedMsgs: FetchGroupMsgsQuery['fetchGroupMsgs'];
}

const GroupMessage: React.FC<Props> = (props) => {
  const {
    messages,
    groupID,
    fetchMore,
    count,
    setShowLoading,
    showLoading,
    keyboardShown,
    selectedMsgs,
    setSelectedMsgs,
  } = props;
  const { data } = useFetchCurrentUserQuery();
  const scrollViewRef = useRef<ScrollView>(null);
  const [incommingMessages, setIncommingMessages] = useState<FetchGroupMsgsQuery['fetchGroupMsgs']>(
    []
  );
  const currentUser = data?.fetchCurrentUser;
  const dispatch = useDispatch();
  const shouldScrollToBottomOnNewMessages = useSelector(
    (state: Redux) => state.chat.shouldScrollToBottomOnNewMessages
  );
  useAddNewGroupMsgSubSubscription({
    variables: { groupID },
    onSubscriptionData(subData) {
      dispatch<SetShouldScrollToBottomOnNewMessages>({
        type: 'setShouldScrollToBottomOnNewMessages',
        payload: true,
      });
      if (subData.subscriptionData.data) {
        setIncommingMessages((m) => [...m, subData.subscriptionData.data!.addNewGroupMsg]);
      }
    },
  });
  useEffect(() => {
    if (messages && scrollViewRef.current && showLoading && shouldScrollToBottomOnNewMessages) {
      scrollViewRef.current.scrollToEnd();
    }
  }, [messages, incommingMessages, keyboardShown]);
  const isCloseToTop = ({ contentOffset }: NativeScrollEvent) => {
    return contentOffset.y === 0;
  };
  const genHue = (phoneNumber: number) => {
    const numString = phoneNumber.toString().slice(phoneNumber.toString().length - 3);
    if (parseInt(numString) > 360) {
      return -parseInt(numString);
    }
    return parseInt(numString);
  };
  const syncedMessages = [...messages, ...incommingMessages]
    .filter((m, i, s) => i === s.findIndex((ms) => ms._id === m._id))
    .filter((msg) => msg.group === groupID)
    .sort((a, b) => parseInt(a.createdAt) - parseInt(b.createdAt));
  return (
    <View style={{ height: keyboardShown ? '85%' : '90%' }}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={({ nativeEvent }) => {
          if (isCloseToTop(nativeEvent) && fetchMore && count > syncedMessages.length) {
            dispatch<SetShouldScrollToBottomOnNewMessages>({
              type: 'setShouldScrollToBottomOnNewMessages',
              payload: true,
            });
            setShowLoading(false);
            fetchMore({ variables: { offset: syncedMessages.length, limit: MESSAGE_LIMIT } });
          }
        }}
      >
        {syncedMessages.map((item, index) => (
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
            <View key={item._id} style={{ marginVertical: 5 }}>
              {index === 0 && count > syncedMessages.length && syncedMessages.length > 20 && (
                <ActivityIndicator size="large" color={AppColors.secodary} />
              )}
              {selectedMsgs.some((msg) => msg._id === item._id) && (
                <View style={styles.selectedMsgPrt}>
                  <View style={styles.selectedMsg}>
                    <Text style={{ color: 'transparent' }}>{item.message}</Text>
                  </View>
                </View>
              )}
              {currentUser?._id === item.sender._id ? (
                <View style={[styles.me, index === 0 && { marginTop: 10 }]}>
                  <Text style={{ color: AppColors.white }}>{item.message}</Text>
                  <Text style={styles.meta}>
                    {' '}
                    {item.starredBy?.some((id) => id === currentUser?._id) && (
                      <Entypo name="star" size={13} />
                    )}{' '}
                    {format(new Date(parseInt(item.createdAt)), 'p')}{' '}
                    <Ionicons name="checkmark" size={18} />
                  </Text>
                </View>
              ) : (
                <View style={[{ flexDirection: 'row' }, index === 0 && { marginTop: 10 }]}>
                  <View style={styles.person}>
                    <Ionicons name="person" size={25} color="rgba(241, 241, 242, 0.8)" />
                  </View>
                  <View style={{ ...styles.sender }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text
                        style={{
                          color: `hsl(${genHue(item.sender.phoneNumber)},80%,60%)`,
                        }}
                      >
                        +{item.sender.countryCode} {item.sender.phoneNumber}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: 'rgba(255,255,255,.7)',
                          marginLeft: 10,
                          maxWidth: '55%',
                        }}
                      >
                        ~{item.sender.name}
                      </Text>
                    </View>
                    <Text style={{ color: AppColors.white }}>{item.message}</Text>
                    <Text style={styles.meta}>
                      {' '}
                      {item.starredBy?.some((id) => id === currentUser?._id) && (
                        <Entypo name="star" size={13} />
                      )}{' '}
                      {format(new Date(parseInt(item.createdAt)), 'p')}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </TouchableNativeFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default GroupMessage;

const styles = StyleSheet.create({
  prt: {
    marginTop: 10,
    marginBottom: 10,
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
    marginVertical: 5,
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
    marginLeft: 5,
  },
  meta: {
    color: 'rgba(255,255,255,.7)',
    fontSize: 12,
    position: 'absolute',
    bottom: 3,
    right: 5,
    paddingLeft: 10,
  },
  person: {
    borderRadius: 70,
    backgroundColor: 'grey',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '1%',
  },
  selectedMsgPrt: {
    backgroundColor: AppColors.message_selection_highlight,
    position: 'absolute',
    elevation: 1000,
    width: '100%',
  },
  selectedMsg: {
    paddingHorizontal: 5,
    maxWidth: '70%',
    minWidth: '20%',
    minHeight: 50,
    borderRadius: 5,
    paddingBottom: 20,
    marginBottom: 10,
    marginRight: 10,
  },
});
