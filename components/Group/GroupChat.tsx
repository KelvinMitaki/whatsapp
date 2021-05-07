import React, { useCallback, useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";
import { Badge, Text, Card } from "react-native-elements";
import { TouchableNativeFeedback } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import inspect from "../../inspect";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { Group, UnreadGroupMsg } from "../../interfaces/GroupInterface";
import { formatDate } from "../Home/ChatComponent";
import { useQuery, useSubscription } from "@apollo/client";
import { FETCH_CURRENT_USER } from "../../graphql/queries";
import { CurrentUser } from "../../interfaces/ChatInterface";
import { ADD_NEW_GROUP_SUB } from "../../graphql/subscriptions";
import AppColors from "../../Colors/color";

interface Props {
  groups: Group[];
  unread: UnreadGroupMsg[];
}

const GroupChat: React.FC<NavigationInjectedProps & Props> = ({ navigation, groups, unread }) => {
  const { data } = useQuery(FETCH_CURRENT_USER, { fetchPolicy: "cache-only" });
  const currentUser: CurrentUser = data.fetchCurrentUser;
  const [incommingUnread, setIncommingUnread] = useState<UnreadGroupMsg[]>([]);
  const [subscriptionGroups, setSubscriptionGroups] = useState<Group[]>([]);
  useSubscription(ADD_NEW_GROUP_SUB, {
    onSubscriptionData(subdata) {
      const group: Group = subdata.subscriptionData.data.addNewGroup;
      setSubscriptionGroups(g => [group, ...g]);
      if (group.message?.sender._id !== currentUser._id) {
        let incommingUnreadGroups = [...incommingUnread];
        const groupExistIndex = incommingUnreadGroups.findIndex(g => g.group === group._id);
        if (groupExistIndex !== -1) {
          const grp = incommingUnreadGroups[groupExistIndex];
          incommingUnreadGroups[groupExistIndex] = { ...grp, messageCount: grp.messageCount + 1 };
        } else {
          const count = unread.find(u => u.group === group._id)?.messageCount;
          incommingUnreadGroups = [
            { group: group._id, messageCount: count ? count + 1 : 1 },
            ...incommingUnreadGroups
          ];
        }
        setIncommingUnread(incommingUnreadGroups);
      }
    },
    variables: { userID: currentUser._id }
  });
  const syncGroups = (): Group[] => {
    return [...subscriptionGroups, ...groups].filter(
      (g, i, s) => i === s.findIndex(gr => gr._id === g._id)
    );
  };
  const renderUnreadCount = (groupID: string): number => {
    const group = [...incommingUnread, ...unread].find(u => u.group === groupID);
    if (group) {
      return group.messageCount;
    }
    return 0;
  };
  const renderGroupMessage = ({ message, admin }: Group): string | JSX.Element => {
    if (message) {
      const {
        sender: { phoneNumber, countryCode, _id }
      } = message;
      if (currentUser._id === _id) {
        return (
          <>
            <Ionicons name="checkmark" size={18} color={AppColors.dull_white} />
            <Text style={{ color: AppColors.dull_white }}>{message.message}</Text>
          </>
        );
      }
      return `${countryCode} ${phoneNumber}: ${message.message}`;
    }
    if (currentUser._id === admin) {
      return "You created this group";
    }
    return "You were added";
  };
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Group>) => (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#FFFFFF", false)}
        onPress={() => navigation.navigate("GroupChat", { groupID: item._id })}
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
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "400",
                  color: "#fff",
                  width: "78%"
                }}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text style={{ right: 1, color: "rgba(255,255,255,.6)" }}>
                {formatDate(new Date(parseInt(item.message?.createdAt || item.createdAt)))}
              </Text>
            </View>
            <View style={styles.msg}>
              <Text
                numberOfLines={1}
                style={{
                  marginTop: 5,
                  color: "rgba(255,255,255,.6)",
                  width: "90%"
                }}
              >
                {renderGroupMessage(item)}
              </Text>
              {!!renderUnreadCount(item._id) && (
                <Badge
                  value={renderUnreadCount(item._id)}
                  badgeStyle={{ backgroundColor: "#00af9c" }}
                />
              )}
            </View>
            <Card.Divider
              style={{
                marginTop: 15,
                backgroundColor: "rgba(255,255,255,.3)"
              }}
            />
          </View>
        </View>
      </TouchableNativeFeedback>
    ),
    []
  );
  const keyExtractor = useCallback((g: Group) => g._id, []);
  const getItemLayout = useCallback(
    (data: any, i: number) => ({ length: 70, offset: 70 * i, index: i }),
    []
  );
  return (
    <View style={styles.prt}>
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
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    paddingHorizontal: 10
  },
  contactTxt: {
    paddingLeft: 10,
    width: "85%",
    justifyContent: "space-between",
    height: "100%"
  },
  msg: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  group: {
    borderRadius: 70,
    backgroundColor: "grey",
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  plus: {
    position: "absolute",
    right: "5%",
    bottom: "3%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00af9c",
    height: 55,
    width: 55,
    borderRadius: 55
  }
});
