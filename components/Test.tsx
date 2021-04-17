import React, { useEffect } from "react";
import { Animated, Easing, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Dispatch } from "redux";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SetContacts } from "../screens/NewGroupScreen";
import { NavigationEvents } from "react-navigation";

interface Props {
  dispatch: Dispatch<SetContacts>;
  scale: Animated.Value;
  item: {
    id: number;
    name: string;
    avatar: string;
  };
  Contacts: {
    id: number;
    name: string;
    avatar: string;
  }[];
}

const Test: React.FC<Props> = ({ dispatch, scale, item, Contacts }) => {
  useEffect(() => {
    if (Contacts[Contacts.length - 1].id === item.id) {
      Animated.timing(scale, {
        toValue: 1,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.linear
      }).start();
    }

    return () => {
      Animated.timing(scale, {
        toValue: 0,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.linear
      }).start();
    };
  }, []);
  return (
    <TouchableNativeFeedback
      onPress={() =>
        dispatch<SetContacts>({
          type: "setContacts",
          payload: item
        })
      }
    >
      <Animated.View
        style={{
          transform: [{ scale }]
        }}
      >
        <NavigationEvents onDidFocus={() => console.log("focused")} />
        <View style={styles.selectedContact}>
          <View style={styles.removeContact}>
            <Feather name="x" size={15} color="#111" />
          </View>
          <View style={styles.person}>
            <Ionicons name="person" size={35} color="rgba(241, 241, 242, 0.8)" />
          </View>
          <View>
            <Text style={{ color: "rgba(255,255,255,.7)" }} numberOfLines={1}>
              {item.name}
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableNativeFeedback>
  );
};

export default Test;

const styles = StyleSheet.create({
  selectedContact: {
    width: 75,
    marginHorizontal: 2.5,
    alignItems: "center",
    justifyContent: "center"
  },
  removeContact: {
    position: "absolute",
    right: "2%",
    bottom: "30%",
    zIndex: 100,
    backgroundColor: "grey",
    borderRadius: 50,
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#111",
    borderWidth: 1.5
  },
  person: {
    height: 55,
    width: 55,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey"
  }
});
