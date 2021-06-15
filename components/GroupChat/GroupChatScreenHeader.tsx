import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import {
  MaterialIcons,
  Ionicons,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
} from '@expo/vector-icons';
import { TouchableNativeFeedback } from 'react-native';
import { GroupMsg, GroupUserTyping, GroupWithParticipants } from '../../interfaces/GroupInterface';
import { MutationTuple, OperationVariables } from '@apollo/client';
import AppColors from '../../Colors/color';
import { FetchCurrentUserQuery, FetchGroupMsgsQuery } from '../../generated/graphql';

interface Params {
  groupID: string;
  group: GroupWithParticipants | undefined;
  typingData: GroupUserTyping | undefined;
  setSelectedMsgs: React.Dispatch<React.SetStateAction<FetchGroupMsgsQuery['fetchGroupMsgs']>>;
  selectedMsgs: FetchGroupMsgsQuery['fetchGroupMsgs'];
  addStarredGroupMessages: MutationTuple<any, OperationVariables>[0];
  removeStarredGroupMessages: MutationTuple<any, OperationVariables>[0];
  currentUser: FetchCurrentUserQuery['fetchCurrentUser'];
}

const GroupChatScreenHeader: NavigationStackScreenComponent<Params>['navigationOptions'] = ({
  navigation,
}) => {
  const group = navigation.getParam('group');
  const typingData = navigation.getParam('typingData');
  const typingParticipant =
    group && group.participants.find((p) => p._id === typingData?.typingUserID);
  const selectedMsgs = navigation.getParam('selectedMsgs');
  const setSelectedMsgs = navigation.getParam('setSelectedMsgs');
  const addStarredGroupMessages = navigation.getParam('addStarredGroupMessages');
  const removeStarredGroupMessages = navigation.getParam('removeStarredGroupMessages');
  const currentUser = navigation.getParam('currentUser');
  const starred =
    selectedMsgs &&
    selectedMsgs.length ===
      selectedMsgs.filter((m) => m.starredBy?.some((id) => id === currentUser._id)).length;
  const starredMsgs =
    selectedMsgs &&
    selectedMsgs.filter((m) => m.starredBy?.some((id) => id === currentUser._id)).map((m) => m._id);
  const unstarredMsgs =
    selectedMsgs &&
    selectedMsgs
      .filter((m) => !m.starredBy?.some((id) => id === currentUser._id))
      .map((m) => m._id);
  if (!selectedMsgs || (selectedMsgs && !selectedMsgs.length)) {
    return {
      headerShown: !!group,
      ...(group && {
        headerTitle: () => (
          <View style={styles.headerLeft}>
            <View style={styles.group}>
              <FontAwesome name="group" size={25} color="rgba(241, 241, 242, 0.8)" />
            </View>
            <View style={{ width: '75%' }}>
              <Text numberOfLines={1} style={styles.grpName}>
                {group.name}
              </Text>
              <Text numberOfLines={1} style={{ color: 'white', marginLeft: 10 }}>
                {typingData && typingData.typing
                  ? `${typingParticipant?.name} is typing...`
                  : group.participants
                      .map((p) => p.name)
                      .toString()
                      .replace(/,/g, ', ')}
              </Text>
            </View>
          </View>
        ),
      }),
      headerRight: () => (
        <View style={styles.headerRight}>
          <View
            style={{
              alignSelf: 'center',
              ...styles.ellipsis,
            }}
          >
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#fff', true)}
              onPress={() => {}}
            >
              <View>
                <MaterialIcons name="add-ic-call" size={25} color={'#fff'} />
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.ellipsis}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#fff', true)}
              onPress={() => {}}
            >
              <View>
                <Ionicons name="ellipsis-vertical-sharp" size={20} color={'rgba(255,255,255,.5)'} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      ),
      headerBackImage: () => (
        <View>
          <AntDesign
            name="arrowleft"
            size={20}
            color="#fff"
            onPress={() => navigation.navigate('Group')}
          />
        </View>
      ),
    };
  }
  return {
    headerTitle: () => (
      <Text style={{ color: AppColors.dull_white, fontSize: 20 }}>{selectedMsgs.length}</Text>
    ),
    headerRight: () => (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: Dimensions.get('screen').width * 0.6,
        }}
      >
        <Ellipsis>
          <Entypo
            name="forward"
            size={20}
            color={AppColors.white}
            style={{ transform: [{ scaleX: -1 }] }}
          />
        </Ellipsis>
        <Ellipsis
          onPress={() => {
            if (starred) {
              removeStarredGroupMessages({ variables: { groupMsgIDs: starredMsgs } });
            } else {
              addStarredGroupMessages({ variables: { groupMsgIDs: unstarredMsgs } });
            }
            setSelectedMsgs([]);
          }}
        >
          {starred ? (
            <MaterialCommunityIcons name="star-off" size={20} color={AppColors.white} />
          ) : (
            <FontAwesome name="star" size={20} color={AppColors.white} />
          )}
        </Ellipsis>
        <Ellipsis>
          <FontAwesome5 name="trash" size={20} color={AppColors.white} />
        </Ellipsis>
        <Ellipsis>
          <Entypo name="forward" size={20} color={AppColors.white} />
        </Ellipsis>
        <View style={[styles.ellipsis]}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#fff', true)}
            onPress={() => {}}
          >
            <View>
              <Ionicons name="ellipsis-vertical-sharp" size={20} color={'rgba(255,255,255,.5)'} />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    ),
  };
};

export default GroupChatScreenHeader;

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '-10%',
  },
  headerRight: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-around',
  },
  group: {
    borderRadius: 70,
    backgroundColor: 'grey',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ellipsis: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  grpName: {
    color: 'white',
    marginLeft: 10,
    fontSize: 20,
    fontWeight: '400',
  },
});

interface Props {
  onPress?: () => void;
}

const Ellipsis: React.FC<Props> = ({ children, onPress }) => (
  <View style={styles.ellipsis}>
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('#fff', true)}
      onPress={(e) => onPress && onPress()}
    >
      <View style={{ height: 45, width: 45, alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </View>
    </TouchableNativeFeedback>
  </View>
);
