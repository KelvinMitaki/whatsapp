import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, View, BackHandler } from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { MaterialIcons, Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import inspect from "../inspect";
import { TouchableNativeFeedback } from "react-native";
import Input from "../components/Chat/Input";
import GroupMessage from "../components/Group/GroupMessage";

const GroupChatScreen: NavigationStackScreenComponent = ({ navigation }) => {
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
    navigation.navigate("Group");
    return true;
  };
  return (
    <View style={{ height: "100%" }}>
      <GroupMessage />
      <Input screen="group" />
    </View>
  );
};

GroupChatScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: () => (
      <View style={styles.headerLeft}>
        <View style={styles.group}>
          <FontAwesome name="group" size={25} color="rgba(241, 241, 242, 0.8)" />
        </View>
        <View style={{ width: "75%" }}>
          <Text numberOfLines={1} style={styles.grpName}>
            Group 1
          </Text>
          <Text numberOfLines={1} style={{ color: "white", marginLeft: 10 }}>
            Kevin, Brian, Jemo, Arnold, Blake, Amos
          </Text>
        </View>
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
