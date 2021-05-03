import React, { useEffect, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableNativeFeedback,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import inspect from "../inspect";
import Message from "../components/Chat/Message";
import Input from "../components/Chat/Input";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { FETCH_CHATS, FETCH_CURRENT_USER, FETCH_MESSAGES } from "../graphql/queries";
import { UPDATE_READ_MESSAGES } from "../graphql/mutations";
import { CurrentUser, MessageInterface } from "../interfaces/Chat";

interface Params {
  recipient: {
    _id: string;
    name: string;
  };
  chatID: string;
}

const ChatScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const { data, loading } = useQuery(FETCH_MESSAGES, {
    variables: { recipient: navigation.getParam("recipient")._id, offset: 0, limit: 20 },
    fetchPolicy: "network-only"
  });
  const [fetchChats] = useLazyQuery(FETCH_CHATS, {
    fetchPolicy: "network-only"
  });
  const user = useQuery(FETCH_CURRENT_USER);
  const currentUser: CurrentUser = user.data.fetchCurrentUser;
  const chatID = navigation.getParam("chatID");
  const [updateReadMessages] = useMutation(UPDATE_READ_MESSAGES, {
    onCompleted() {
      setShowLoading(false);
      fetchChats();
    }
  });
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackBtnPressAndroid);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackBtnPressAndroid);
    };
  }, []);
  useEffect(() => {
    setShowLoading(true);
    if (data && data.fetchMessages && data.fetchMessages.length) {
      const messageIDs = (data.fetchMessages as MessageInterface[])
        .filter(m => !m.read && m.sender !== currentUser._id)
        .map(m => m._id);
      messageIDs.length &&
        chatID &&
        updateReadMessages({
          variables: {
            messageIDs,
            chatID
          }
        });
    }
  }, [data]);
  const handleBackBtnPressAndroid = () => {
    if (!navigation.isFocused()) {
      return false;
    }
    navigation.navigate("Home");
    return true;
  };
  const screen = Dimensions.get("screen");
  return (
    <View>
      {loading && showLoading && (
        <View
          style={{
            height: screen.height,
            width: screen.width,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" color="#00af9c" />
          <Text style={{ color: "rgba(255,255,255,.8)" }}>Fetching Messages...</Text>
        </View>
      )}
      {data && (
        <View style={{ height: "100%" }}>
          <Message messages={data.fetchMessages} recipient={navigation.getParam("recipient")._id} />
          <Input screen="chat" recipient={navigation.getParam("recipient")._id} />
        </View>
      )}
    </View>
  );
};

ChatScreen.navigationOptions = ({ navigation }) => {
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
        <Text
          numberOfLines={1}
          style={{
            color: "white",
            marginLeft: 10,
            fontSize: 20,
            fontWeight: "400",
            width: "75%"
          }}
        >
          {navigation.getParam("recipient").name}
        </Text>
      </View>
    ),
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
              <MaterialIcons name="call" size={25} color={"#fff"} />
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
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    )
  };
};

export default ChatScreen;

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
  person: {
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
  }
});
