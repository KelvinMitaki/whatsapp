import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableNativeFeedback,
  View
} from "react-native";
import { Input, Text } from "react-native-elements";
import { FontAwesome, Fontisto, Ionicons } from "@expo/vector-icons";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import inspect from "../inspect";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";
import { NavigationEvents } from "react-navigation";
import AppColors from "../Colors/color";
import LoadingModal from "../components/Modals/LoadingModal";

export interface ResetContacts {
  type: "resetContacts";
}

const NewGroupInfoScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [subject, setSubject] = useState<string>("");
  const Contacts = useSelector((state: Redux) => state.chat.Contacts);
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1 }}>
      <NavigationEvents onDidBlur={() => dispatch<ResetContacts>({ type: "resetContacts" })} />
      <LoadingModal isVisible text="Creating group..." />
      <View
        style={{
          height: 125,
          justifyContent: "center",
          backgroundColor: AppColors.primary
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <TouchableNativeFeedback onPress={() => {}}>
            <View style={styles.camera}>
              <FontAwesome name="camera" size={25} color={AppColors.white} />
            </View>
          </TouchableNativeFeedback>
          <View
            style={{
              width: "70%"
            }}
          >
            <Input
              placeholder="Type group subject here..."
              onChangeText={setSubject}
              value={subject}
            />
          </View>
          <View style={styles.smileyPrt}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(AppColors.white, true)}
              onPress={() => {}}
            >
              <View style={styles.smiley}>
                <Fontisto name="smiley" color={AppColors.white} size={25} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <Text style={{ color: "rgba(255,255,255,.5)", paddingLeft: 10 }}>
          Provide a group subject and optional group icon
        </Text>
      </View>
      <View style={styles.selectedContact}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(AppColors.white, true)}
          onPress={() => {
            if (!subject.trim().length) {
              ToastAndroid.show("Group subject is required", ToastAndroid.LONG);
            } else {
              navigation.navigate("GroupChat");
            }
          }}
        >
          <View style={styles.checkMark}>
            <Ionicons name="checkmark-sharp" size={25} color={AppColors.white} />
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "rgba(255,255,255,.5)", margin: 20 }}>
          Participants: {Contacts.length}
        </Text>
        <View style={{ flex: 1, alignItems: "center" }}>
          <FlatList
            data={Contacts}
            keyExtractor={u => u._id}
            numColumns={Math.floor(Dimensions.get("screen").width / 60)}
            renderItem={({ item }) => (
              <View
                style={{
                  width: 60,
                  height: 70,
                  alignItems: "center"
                }}
              >
                <View style={styles.person}>
                  <Ionicons name="person" size={35} color="rgba(241, 241, 242, 0.8)" />
                </View>
                <Text numberOfLines={1} style={{ color: "rgba(255,255,255,.8)" }}>
                  {item.name}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

NewGroupInfoScreen.navigationOptions = {
  headerTitle: () => (
    <View>
      <Text style={{ color: AppColors.white }} h4>
        New Group
      </Text>
      <Text style={{ color: AppColors.white }}>Add subject</Text>
    </View>
  )
};

export default NewGroupInfoScreen;

const styles = StyleSheet.create({
  camera: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc",
    height: 55,
    width: 55,
    borderRadius: 55
  },
  selectedContact: {
    position: "absolute",
    right: "2%",
    top: "14.5%",
    backgroundColor: "#00af9c",
    borderRadius: 500,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 10
  },
  smiley: {
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center"
  },
  smileyPrt: {
    height: 40,
    width: 40,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center"
  },
  checkMark: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  person: {
    height: 45,
    width: 45,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey"
  }
});
