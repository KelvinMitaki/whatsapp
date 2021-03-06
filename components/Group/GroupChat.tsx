import React, { useCallback, useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Badge, Text, Card } from 'react-native-elements';
import { TouchableNativeFeedback } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { formatDate } from '../Home/ChatComponent';
import AppColors from '../../Colors/color';
import { useDispatch, useSelector } from 'react-redux';
import { Redux } from '../../interfaces/Redux';
import { useHeaderHeight } from 'react-navigation-stack';
import {
  FetchGroupsQuery,
  FetchUnreadGroupMsgsQuery,
  useAddNewGroupSubSubscription,
  useFetchCurrentUserQuery,
} from '../../generated/graphql';
import { FETCH_GROUPS } from '../../graphql/queries';

interface Props {
  groups: FetchGroupsQuery['fetchGroups'];
  unread: FetchUnreadGroupMsgsQuery['fetchUnreadGroupMsgs'];
}

export interface SetIncommingUnread {
  type: 'setIncommingUnread';
  payload: FetchUnreadGroupMsgsQuery['fetchUnreadGroupMsgs'];
}

export interface SetPreviousSelectedGroup {
  type: 'setPreviousSelectedGroup';
  payload: string;
}

const GroupChat: React.FC<NavigationInjectedProps & Props> = ({ navigation, groups, unread }) => {
  const dispatch = useDispatch();
  const { data } = useFetchCurrentUserQuery();
  const currentUser = data?.fetchCurrentUser;
  const headerHeight = useHeaderHeight();
  const incommingUnread = useSelector((state: Redux) => state.group.incommingUnread);
  const searchModal = useSelector((state: Redux) => state.chat.searchModal);
  useAddNewGroupSubSubscription({
    onSubscriptionData({ subscriptionData, client }) {
      if (subscriptionData.data) {
        const group = subscriptionData.data.addNewGroup;
        const existingGroupsReadOnly = client.readQuery<FetchGroupsQuery>({ query: FETCH_GROUPS });
        const groups = [group, ...(existingGroupsReadOnly?.fetchGroups || [])];
        client.writeQuery<FetchGroupsQuery>({ query: FETCH_GROUPS, data: { fetchGroups: groups } });
        if (group.message?.sender._id !== currentUser?._id) {
          let incommingUnreadGroups = [...incommingUnread];
          const groupExistIndex = incommingUnreadGroups.findIndex((g) => g.group === group._id);
          if (groupExistIndex !== -1) {
            const grp = incommingUnreadGroups[groupExistIndex];
            incommingUnreadGroups[groupExistIndex] = { ...grp, messageCount: grp.messageCount + 1 };
          } else {
            const count = unread.find((u) => u.group === group._id)?.messageCount;
            incommingUnreadGroups = [
              { group: group._id, messageCount: count ? count + 1 : 1 },
              ...incommingUnreadGroups,
            ];
          }
          dispatch<SetIncommingUnread>({
            type: 'setIncommingUnread',
            payload: incommingUnreadGroups,
          });
        }
      }
    },
    variables: { userID: currentUser!._id },
  });
  const syncGroups = (): FetchGroupsQuery['fetchGroups'] => {
    return groups.filter((g, i, s) => i === s.findIndex((gr) => gr._id === g._id));
  };
  const renderUnreadCount = (groupID: string): number => {
    const group = [...incommingUnread, ...unread].find((u) => u.group === groupID);
    if (group) {
      return group.messageCount;
    }
    return 0;
  };
  const renderGroupMessage = ({
    message,
    admin,
  }: FetchGroupsQuery['fetchGroups'][0]): string | JSX.Element => {
    if (message) {
      const {
        sender: { phoneNumber, countryCode, _id },
      } = message;
      if (currentUser?._id === _id) {
        return (
          <>
            <Ionicons name="checkmark" size={18} color={AppColors.dull_white} />
            <Text style={{ color: AppColors.dull_white }}>{message.message}</Text>
          </>
        );
      }
      return `${countryCode} ${phoneNumber}: ${message.message}`;
    }
    if (currentUser?._id === admin) {
      return 'You created this group';
    }
    return 'You were added';
  };
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<FetchGroupsQuery['fetchGroups'][0]>) => (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(AppColors.tap_bg, false)}
        onPress={() => navigation.navigate('GroupChat', { groupID: item._id })}
      >
        <View style={styles.contact}>
          {/* <Avatar
        rounded
        source={require("../assets/blank.png")}
        size={55}
      /> */}
          <View style={styles.group}>
            <FontAwesome name="group" size={35} color="rgba(241, 241, 242, 0.8)" />
          </View>
          <View style={styles.contactTxt}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '400',
                  color: '#fff',
                  width: '78%',
                }}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text style={{ right: 1, color: 'rgba(255,255,255,.6)' }}>
                {formatDate(new Date(parseInt(item.message?.createdAt || item.createdAt)))}
              </Text>
            </View>
            <View style={styles.msg}>
              <Text
                numberOfLines={1}
                style={{
                  marginTop: 5,
                  color: 'rgba(255,255,255,.6)',
                  width: '90%',
                }}
              >
                {renderGroupMessage(item)}
              </Text>
              {!!renderUnreadCount(item._id) && (
                <Badge
                  value={renderUnreadCount(item._id)}
                  badgeStyle={{ backgroundColor: '#00af9c' }}
                />
              )}
            </View>
            <View
              style={{
                marginTop: 15,
                backgroundColor: 'rgba(255,255,255,.2)',
                height: 0.5,
              }}
            />
          </View>
        </View>
      </TouchableNativeFeedback>
    ),
    [unread, incommingUnread]
  );
  const keyExtractor = useCallback((g: FetchGroupsQuery['fetchGroups'][0]) => g._id, []);
  const getItemLayout = useCallback(
    (data: any, i: number) => ({ length: 70, offset: 70 * i, index: i }),
    []
  );
  return (
    <View style={styles.prt}>
      {searchModal && <View style={{ height: headerHeight / 2 }}></View>}
      <FlatList
        data={syncGroups()}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

export default withNavigation(GroupChat);

const styles = StyleSheet.create({
  prt: {},
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    paddingHorizontal: 10,
  },
  contactTxt: {
    paddingLeft: 10,
    width: '85%',
    justifyContent: 'space-between',
    height: '100%',
  },
  msg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  group: {
    borderRadius: 70,
    backgroundColor: 'grey',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    position: 'absolute',
    right: '5%',
    bottom: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00af9c',
    height: 55,
    width: 55,
    borderRadius: 55,
  },
});
