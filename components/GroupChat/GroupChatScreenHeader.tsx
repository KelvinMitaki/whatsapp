import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, BackHandler, ActivityIndicator } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { MaterialIcons, Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { TouchableNativeFeedback } from "react-native";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { GroupWithParticipants } from "../../interfaces/GroupInterface";

interface Params {
  groupID: string;
  group: GroupWithParticipants;
}

const GroupChatScreenHeader: NavigationStackScreenComponent<Params>["navigationOptions"] = ({
  navigation
}) => {
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

export default GroupChatScreenHeader;

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
