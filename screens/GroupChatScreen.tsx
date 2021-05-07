import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, View, BackHandler, ActivityIndicator } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { MaterialIcons, Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import inspect from "../inspect";
import { TouchableNativeFeedback } from "react-native";
import Input, { MESSAGE_LIMIT } from "../components/Chat/Input";
import GroupMessage from "../components/Group/GroupMessage";
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

interface Params {
  groupID: string;
  group: GroupWithParticipants;
}

const GroupChatScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
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
  const { loading } = useQuery(FETCH_GROUP_MSG_COUNT, {
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
  const [fetchGroupMsgs, { data }] = useLazyQuery(FETCH_GROUP_MSGS, {
    fetchPolicy: "cache-and-network",
    onCompleted(data) {
      const groupMsgs: GroupMsg[] = data.fetchGroupMsgs;
      const messageIDs = groupMsgs
        .filter(
          msg => msg.sender._id !== currentUser._id && !msg.read.some(id => id === currentUser._id)
        )
        .map(msg => msg._id);
      updateGroupMessagesRead({
        variables: {
          messageIDs,
          groupID
        }
      });
    }
  });
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
  return (
    <View style={{ height: "100%" }}>
      {data && data.fetchGroupMsgs && group.data && group.data.fetchGroup && !loading ? (
        <>
          <GroupMessage messages={data.fetchGroupMsgs} groupID={groupID} />
          <Input screen="group" group={groupID} />
        </>
      ) : (
        <View style={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color={AppColors.secodary} />
        </View>
      )}
    </View>
  );
};

GroupChatScreen.navigationOptions = ({ navigation }) => {
  const group = navigation.getParam("group");
  return {
    headerShown: !!group,
    ...(group && {
      headerTitle: () => (
        <View style={styles.headerLeft}>
          <View style={styles.group}>
            <FontAwesome name="group" size={25} color="rgba(241, 241, 242, 0.8)" />
          </View>
          <View style={{ width: "75%" }}>
            <Text numberOfLines={1} style={styles.grpName}>
              {group.name}
            </Text>
            <Text numberOfLines={1} style={{ color: "white", marginLeft: 10 }}>
              {group.participants
                .map(p => p.name)
                .toString()
                .replace(/,/g, ", ")}
            </Text>
          </View>
        </View>
      )
    }),
    headerRight: () => (
      <View style={styles.headerRight}>
        <View
          style={{
            alignSelf: "center",
            ...styles.ellipsis
          }}
        >
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#fff", true)}
            onPress={() => {}}
          >
            <View>
              <MaterialIcons name="add-ic-call" size={25} color={"#fff"} />
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.ellipsis}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#fff", true)}
            onPress={() => {}}
          >
            <View>
              <Ionicons name="ellipsis-vertical-sharp" size={20} color={"rgba(255,255,255,.5)"} />
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
          onPress={() => navigation.navigate("Group")}
        />
      </View>
    )
  };
};

export default GroupChatScreen;

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "-10%"
  },
  headerRight: {
    flexDirection: "row",
    width: 100,
    justifyContent: "space-around"
  },
  group: {
    borderRadius: 70,
    backgroundColor: "grey",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  ellipsis: {
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "transparent"
  },
  grpName: {
    color: "white",
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "400"
  }
});
