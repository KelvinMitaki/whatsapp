import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { SetSearchModal } from '../../screens/HomeScreen';
import ChatComponent from './ChatComponent';
import { useHeaderHeight } from 'react-navigation-stack';
import { Redux } from '../../interfaces/Redux';
import { FetchChatsQuery, useFetchCurrentUserQuery } from '../../generated/graphql';

interface Props {
  chatSub: FetchChatsQuery['fetchChats'];
  chat: FetchChatsQuery['fetchChats'][0] | null;
  data: any;
}

const HomeChat: React.FC<NavigationInjectedProps & Props> = ({ chatSub, chat, data }) => {
  const user = useFetchCurrentUserQuery();
  const searchModal = useSelector((state: Redux) => state.chat.searchModal);
  const headerHeight = useHeaderHeight();
  const dispatch = useDispatch();
  const currentUser = user.data?.fetchCurrentUser;
  const renderItem = ({ item }: ListRenderItemInfo<FetchChatsQuery['fetchChats'][0]>) => (
    <ChatComponent item={item} currentUser={currentUser!} />
  );
  const getItemLayout = useCallback(
    (data: any, i: number) => ({ length: 70, offset: 70 * i, index: i }),
    []
  );
  const keyExtractor = ({ _id }: FetchChatsQuery['fetchChats'][0]) => _id;
  const renderChats = (): FetchChatsQuery['fetchChats'] => {
    if (!chat) {
      let existingChats: FetchChatsQuery['fetchChats'] = data.fetchChats;
      chatSub.forEach((c) => {
        const chatIndex = existingChats.findIndex((ch) => ch._id === c._id);
        if (chatIndex !== -1) {
          existingChats.splice(chatIndex, 1);
          existingChats = [c, ...existingChats];
        } else {
          existingChats = [c, ...existingChats];
        }
      });
      return existingChats;
    }
    if (chat) {
      return [...chatSub, ...(data.fetchChats as FetchChatsQuery['fetchChats'])].filter(
        (c, i, s) => i === s.findIndex((ch) => ch._id === c._id)
      );
    }
    return data.fetchChats;
  };
  return (
    <View>
      {searchModal && <View style={{ height: headerHeight / 2 }}></View>}
      {data && data.fetchChats && data.fetchChats.length ? (
        <FlatList
          data={renderChats()}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          onTouchStart={() => dispatch<SetSearchModal>({ type: 'setSearchModal', payload: false })}
        />
      ) : (
        <View style={styles.noMsgs}>
          <Text
            style={{ color: 'rgba(255,255,255,.7)', textAlign: 'center', justifyContent: 'center' }}
          >
            To start messaging contacts who have ChatApp, tap{' '}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons
              name="android-messages"
              size={20}
              color="rgba(255,255,255,.7)"
              style={styles.msgIcon}
            />
            <Text
              style={{
                color: 'rgba(255,255,255,.7)',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              {' '}
              at the bottom right of your screen.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default withNavigation(HomeChat);

const styles = StyleSheet.create({
  msgIcon: {
    transform: [{ scaleX: -1 }, { scaleY: 1 }],
  },
  noMsgs: {
    height: '80%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
});
