import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Dispatch } from "redux";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SetContacts } from "../../screens/NewGroupScreen";
import { NavigationEvents } from "react-navigation";
import { useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";
import { User } from "../../interfaces/Chat";

interface Props {
  dispatch: Dispatch<SetContacts>;
  item: User;
}

const HorizontalContact: React.FC<Props> = ({ dispatch, item }) => {
  const indexToAnimate = useSelector((state: Redux) => state.chat.indexToAnimate);
  const scaleNum = useSelector((state: Redux) => state.chat.scaleNum);
  const scale = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    Animated.timing(scale, {
      toValue: scaleNum,
      useNativeDriver: false,
      duration: 100,
      easing: Easing.linear
    }).start();
  }, [scaleNum]);
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
          ...(indexToAnimate === item._id && {
            transform: [{ scale }]
          })
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

export default HorizontalContact;

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
