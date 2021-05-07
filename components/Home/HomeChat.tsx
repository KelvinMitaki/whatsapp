import React, { useCallback } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { useDispatch } from "react-redux";
import { SetSearchModal } from "../../screens/HomeScreen";
import { FETCH_CHATS, FETCH_CURRENT_USER } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { Chat, CurrentUser } from "../../interfaces/ChatInterface";
import ChatComponent from "./ChatComponent";

interface Props {
  chatSub: Chat[];
  chat: Chat | null;
}

const HomeChat: React.FC<NavigationInjectedProps & Props> = ({ chatSub, chat }) => {
  const { data } = useQuery(FETCH_CHATS, { fetchPolicy: "cache-only" });
  const user = useQuery(FETCH_CURRENT_USER, { fetchPolicy: "cache-only" });
  const dispatch = useDispatch();
  const currentUser: CurrentUser = user.data.fetchCurrentUser;
  const renderItem = ({ item }: ListRenderItemInfo<Chat>) => (
    <ChatComponent item={item} currentUser={currentUser} />
  );
  const getItemLayout = useCallback(
    (data: any, i: number) => ({ length: 70, offset: 70 * i, index: i }),
    []
  );
  const keyExtractor = ({ _id }: Chat) => _id;

  const renderChats = (): Chat[] => {
    if (!chat) {
      let existingChats: Chat[] = data.fetchChats;
      chatSub.forEach(c => {
        const chatIndex = existingChats.findIndex(ch => ch._id === c._id);
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
      return [...chatSub, ...(data.fetchChats as Chat[])].filter(
        (c, i, s) => i === s.findIndex(ch => ch._id === c._id)
      );
    }
    return data.fetchChats;
  };
  return (
    <View>
      {data && data.fetchChats && data.fetchChats.length ? (
        <FlatList
          data={renderChats()}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          onTouchStart={() => dispatch<SetSearchModal>({ type: "setSearchModal", payload: false })}
        />
      ) : (
        <View style={styles.noMsgs}>
          <Text
            style={{ color: "rgba(255,255,255,.7)", textAlign: "center", justifyContent: "center" }}
          >
            To start messaging contacts who have ChatApp, tap{" "}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="android-messages"
              size={20}
              color="rgba(255,255,255,.7)"
              style={styles.msgIcon}
            />
            <Text
              style={{
                color: "rgba(255,255,255,.7)",
                textAlign: "center",
                justifyContent: "center"
              }}
            >
              {" "}
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
    transform: [{ scaleX: -1 }, { scaleY: 1 }]
  },
  noMsgs: {
    height: "80%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30
  }
});
