import React, { useEffect } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableNativeFeedback,
  ActivityIndicator
} from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import inspect from "../inspect";
import Message from "../components/Chat/Message";
import Input from "../components/Chat/Input";
import { useQuery } from "@apollo/client";
import { FETCH_MESSAGES } from "../graphql/queries";

interface Params {
  recipient: {
    _id: string;
    name: string;
  };
}

const ChatScreen: NavigationStackScreenComponent<Params> = ({ navigation }) => {
  const { data, loading } = useQuery(FETCH_MESSAGES, {
    variables: { recipient: navigation.getParam("recipient")._id },
    fetchPolicy: "cache-and-network"
  });
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackBtnPressAndroid);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackBtnPressAndroid);
    };
  }, []);
  const handleBackBtnPressAndroid = () => {
    if (!navigation.isFocused()) {
      return false;
    }
    navigation.navigate("Home");
    return true;
  };
  return (
    <View>
      {loading ? (
        <View
          style={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#00af9c" />
          <Text style={{ color: "rgba(255,255,255,.8)" }}>Fetching Messages...</Text>
        </View>
      ) : (
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
