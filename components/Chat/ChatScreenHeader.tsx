import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, Dimensions } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { formatRelative } from 'date-fns';
import AppColors from '../../Colors/color';
import inspect from '../../inspect';
import { MutationTuple, OperationVariables } from '@apollo/client';
import { Exact, FetchCurrentUserQuery, FetchMessagesQuery } from '../../generated/graphql';

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

const ChatScreenHeader: NavigationStackScreenComponent<Params>['navigationOptions'] = ({
  navigation,
}) => {
  const recipient = navigation.getParam('recipient');
  const selectedMsgs = navigation.getParam('selectedMsgs');
  const setSelectedMsgs = navigation.getParam('setSelectedMsgs');
  const addStarredMessages = navigation.getParam('addStarredMessages');
  const removeStarredMessages = navigation.getParam('removeStarredMessages');
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
      headerTitle: () => (
        <View style={styles.headerLeft}>
          {/* <Avatar
                rounded
                source={require("../assets/blank.png")}
                containerStyle={{ marginLeft: "-8%" }}
                size={40}
              /> */}
          <View style={styles.person}>
            <Ionicons name="person" size={25} color="rgba(241, 241, 242, 0.8)" />
          </View>
          <View
            style={{
              marginLeft: 10,
              width: '75%',
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '400',
              }}
            >
              {recipient.name}
            </Text>
            <Text style={{ color: '#fff' }} numberOfLines={1}>
              {recipient.typing
                ? 'typing...'
                : recipient.online
                ? 'online'
                : `last seen ${formatRelative(new Date(recipient.lastSeen), new Date())}`}
            </Text>
          </View>
        </View>
      ),
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
                <MaterialIcons name="call" size={25} color={'#fff'} />
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
            onPress={() => navigation.navigate('Home')}
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
              removeStarredMessages({ variables: { messageIDs: starredMsgs } });
            } else {
              addStarredMessages({ variables: { messageIDs: unstarredMsgs } });
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

export default ChatScreenHeader;

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
  person: {
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
