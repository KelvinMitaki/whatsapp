import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, BackHandler, ActivityIndicator } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { MaterialIcons, Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import inspect from "../inspect";
import { TouchableNativeFeedback } from "react-native";
import Input, { MESSAGE_LIMIT } from "../components/Chat/Input";
import GroupMessage from "../components/GroupChat/GroupMessage";
import AppColors from "../Colors/color";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  FETCH_CURRENT_USER,
  FETCH_GROUP,
  FETCH_GROUP_MSGS,
  FETCH_GROUP_MSG_COUNT,
  FETCH_UNREAD_GROUP_MSGS
} from "../graphql/queries";
import { GroupMsg, GroupWithParticipants } from "../interfaces/GroupInterface";
import { UPDATE_GROUP_MESSAGES_READ } from "../graphql/mutations";
import { CurrentUser } from "../interfaces/ChatInterface";
import { useDispatch } from "react-redux";
import { SetIncommingUnread } from "../components/Group/GroupChat";
import GroupChatScreenHeader from "../components/GroupChat/GroupChatScreenHeader";

interface Params {
  groupID: string;
  group: GroupWithParticipants;
}

const GroupChatScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [keyboardShown, setKeyboardShown] = useState<boolean>(false);
  const groupID = navigation.getParam("groupID");
  const { data: userData } = useQuery(FETCH_CURRENT_USER, { fetchPolicy: "cache-only" });
  const currentUser: CurrentUser = userData.fetchCurrentUser;
  const dispatch = useDispatch();
  const [updateGroupMessagesRead] = useMutation(UPDATE_GROUP_MESSAGES_READ, {
    refetchQueries: [{ query: FETCH_UNREAD_GROUP_MSGS }],
    onCompleted() {
      dispatch<SetIncommingUnread>({ type: "setIncommingUnread", payload: [] });
    }
  });
  const { loading, data: countData } = useQuery(FETCH_GROUP_MSG_COUNT, {
    fetchPolicy: "network-only",
    variables: { groupID },
    onCompleted(data) {
      fetchGroupMsgs({
        variables: {
          groupID,
          offset: 0,
          limit: MESSAGE_LIMIT,
          messageCount: data.fetchGroupMessageCount.count
        }
      });
    }
  });
  const [fetchGroupMsgs, { data, fetchMore, loading: msgsLoading }] = useLazyQuery(
    FETCH_GROUP_MSGS,
    {
      fetchPolicy: "cache-and-network",
      onCompleted(data) {
        const groupMsgs: GroupMsg[] = data.fetchGroupMsgs;
        const messageIDs = groupMsgs
          .filter(
            msg =>
              msg.sender._id !== currentUser._id && !msg.read.some(id => id === currentUser._id)
          )
          .map(msg => msg._id);
        if (groupID && messageIDs.length) {
          updateGroupMessagesRead({
            variables: {
              messageIDs,
              groupID
            }
          });
        }
      }
    }
  );
  const group = useQuery(FETCH_GROUP, { variables: { groupID } });
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackBtnPressAndroid);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackBtnPressAndroid);
    };
  }, []);
  useEffect(() => {
    if (group.data && group.data.fetchGroup) {
      navigation.setParams({ group: group.data.fetchGroup });
    }
  }, [group.data]);
  const handleBackBtnPressAndroid = () => {
    if (!navigation.isFocused()) {
      return false;
    }
    navigation.navigate("Group");
    return true;
  };
  const loaders =
    !(data && data.fetchGroupMsgs) ||
    !(group.data && group.data.fetchGroup) ||
    (msgsLoading && showLoading) ||
    loading;
  return (
    <View style={{ height: "100%" }}>
      {loaders ? (
        <View style={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color={AppColors.secodary} />
          <Text style={{ color: "rgba(255,255,255,.8)" }}>Fetching messages...</Text>
        </View>
      ) : (
        <>
          <GroupMessage
            messages={data.fetchGroupMsgs}
            groupID={groupID}
            count={countData.fetchGroupMessageCount.count}
            fetchMore={fetchMore}
            setShowLoading={setShowLoading}
            showLoading={showLoading}
            keyboardShown={keyboardShown}
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
