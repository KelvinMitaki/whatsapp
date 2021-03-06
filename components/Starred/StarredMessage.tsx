import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import inspect from '../../inspect';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { formatDate } from '../Home/ChatComponent';
import { format } from 'date-fns';
import { FetchStarredMsgsQuery } from '../../generated/graphql';
import AppColors from '../../Colors/color';

interface props {
  starredMsg:
    | FetchStarredMsgsQuery['fetchStarredMsgs']['groupMsgs'][0]
    | FetchStarredMsgsQuery['fetchStarredMsgs']['messages'][0];
}

const StarredMessage: React.FC<NavigationInjectedProps & props> = React.memo(
  ({ navigation, starredMsg }) => {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(AppColors.tap_bg, false)}
        onPress={() => {
          // navigation.navigate("Chat",{recipient})
        }}
      >
        <View style={styles.starredMsgPrt}>
          <View style={styles.starredMsgHeader}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
                width: '75%',
              }}
            >
              <View style={styles.person}>
                <Ionicons name="person" size={25} color="rgba(241, 241, 242, 0.8)" />
              </View>
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: 'row',
                  width: '80%',
                  overflow: 'hidden',
                }}
              >
                <Text style={{ color: '#fff' }} numberOfLines={1}>
                  {
                    // @ts-ignore
                    starredMsg.sender.name
                  }
                </Text>
                <MaterialIcons name="arrow-right" size={20} color="#fff" />
                <View style={{ maxWidth: '75%' }}>
                  <Text style={{ color: '#fff' }} numberOfLines={1}>
                    {
                      // @ts-ignore
                      starredMsg.recipient ? starredMsg.recipient.name : starredMsg.group.name
                    }
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'rgba(255,255,255,.7)' }}>
                {' '}
                {formatDate(new Date(parseInt(starredMsg.createdAt)))}
              </Text>
              <Entypo name="chevron-small-right" size={25} color="rgba(255,255,255,.7)" />
            </View>
          </View>
          <View style={styles.me}>
            <Text style={{ color: '#fff' }}>{starredMsg.message}</Text>
            <Text style={styles.meta}>
              <Entypo name="star" size={15} />
              {format(new Date(parseInt(starredMsg.createdAt)), 'p')}{' '}
              <Ionicons name="checkmark-done" size={18} />
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
);

export default withNavigation(StarredMessage);

const styles = StyleSheet.create({
  person: {
    height: 40,
    width: 40,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  starredMsgPrt: {
    minHeight: 90,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,.4)',
  },
  starredMsgHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
  },
  me: {
    marginLeft: '15%',
    backgroundColor: '#00af9c',
    paddingHorizontal: 5,
    maxWidth: '70%',
    minWidth: '25%',
    alignSelf: 'flex-start',
    minHeight: 50,
    borderRadius: 5,
    paddingBottom: 20,
    marginBottom: 10,
    marginRight: 10,
  },
  meta: {
    color: 'rgba(255,255,255,.7)',
    fontSize: 12,
    position: 'absolute',
    bottom: 3,
    right: 5,
    paddingLeft: 10,
  },
});
