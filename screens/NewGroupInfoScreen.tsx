import React from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  View
} from "react-native";
import { Input, Text } from "react-native-elements";
import { FontAwesome, Fontisto, Ionicons } from "@expo/vector-icons";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import inspect from "../inspect";

const NewGroupInfoScreen: NavigationStackScreenComponent = ({}) => {
  const contacts = [];
  for (let i = 0; i < 100; i++) {
    contacts.push(i);
  }
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 125,
          justifyContent: "center",
          backgroundColor: "#191f23"
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
              <FontAwesome name="camera" size={25} color="#fff" />
            </View>
          </TouchableNativeFeedback>
          <View
            style={{
              width: "70%"
            }}
          >
            <Input placeholder="Type group subject here..." />
          </View>
          <View style={styles.smileyPrt}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#fff", true)}
              onPress={() => {}}
            >
              <View style={styles.smiley}>
                <Fontisto name="smiley" color="#fff" size={25} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <Text style={{ color: "rgba(255,255,255,.5)", paddingLeft: 10 }}>
          Provide a group subject and optional group icon
        </Text>
        <View style={styles.selectedContact}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#fff", true)}
            onPress={() => {}}
          >
            <View style={styles.checkMark}>
              <Ionicons name="checkmark-sharp" size={25} color="#fff" />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "rgba(255,255,255,.5)", margin: 20 }}>
          Participants: 25
        </Text>
        <View style={{ flex: 1, alignItems: "center" }}>
          <FlatList
            data={contacts}
            keyExtractor={(_, i) => i.toLocaleString()}
            numColumns={Math.floor(Dimensions.get("screen").width / 60)}
            renderItem={() => (
              <View
                style={{
                  width: 60,
                  height: 70
                }}
              >
                <View style={styles.person}>
                  <Ionicons
                    name="person"
                    size={35}
                    color="rgba(241, 241, 242, 0.8)"
                  />
                </View>
                <Text
                  numberOfLines={1}
                  style={{ color: "rgba(255,255,255,.8)" }}
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Deleniti, voluptas saepe tempora tenetur accusamus culpa, est
                  soluta pariatur expedita a officiis corrupti doloribus numquam
                  temporibus dignissimos consectetur amet nulla maiores?
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
      <Text style={{ color: "#fff" }} h4>
        New Group
      </Text>
      <Text style={{ color: "#fff" }}>Add subject</Text>
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
    bottom: "-20%",
    backgroundColor: "#00af9c",
    borderRadius: 500,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10
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
