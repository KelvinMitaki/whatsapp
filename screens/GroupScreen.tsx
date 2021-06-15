import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationMaterialTabScreenComponent } from 'react-navigation-tabs';
import GroupChat from '../components/Group/GroupChat';
import AppColors from '../Colors/color';
import { useFetchGroupsQuery, useFetchUnreadGroupMsgsQuery } from '../generated/graphql';

const GroupScreen: NavigationMaterialTabScreenComponent = ({ navigation }) => {
  const { data, loading } = useFetchGroupsQuery();
  const { data: data2 } = useFetchUnreadGroupMsgsQuery();
  return (
    <View style={styles.prt}>
      <GroupChat
        groups={data ? data.fetchGroups : []}
        unread={data2 ? data2.fetchUnreadGroupMsgs : []}
      />
      {!data ||
        (data && !data.fetchGroups && !loading && (
          <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: AppColors.dull_white }}>
              You are currently not in any groups.
            </Text>
          </View>
        ))}
      <View style={styles.withChatsPrt}>
        <View style={styles.messageNavPrt}>
          <TouchableNativeFeedback
            onPress={() => navigation.navigate('Contact')}
            background={TouchableNativeFeedback.Ripple('#fff', true)}
          >
            <View style={styles.message}>
              <MaterialCommunityIcons
                name="android-messages"
                size={30}
                color="#fff"
                style={styles.msgIcon}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </View>
  );
};

GroupScreen.navigationOptions = {
  title: 'GROUPS',
};

export default GroupScreen;

const styles = StyleSheet.create({
  prt: {
    height: '100%',
  },
  withChatsPrt: {
    width: '100%',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 10,
  },
  messageNavPrt: {
    height: 55,
    width: 55,
    borderRadius: 55,
    borderColor: 'transparent',
  },
  message: {
    right: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00af9c',
    height: 55,
    width: 55,
    borderRadius: 55,
  },
  msgIcon: {
    transform: [{ scaleX: -1 }, { scaleY: 1 }],
  },
});
