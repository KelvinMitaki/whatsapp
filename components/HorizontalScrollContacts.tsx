import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  FlatList,
  Animated,
  Easing
} from "react-native";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { SetContacts } from "../screens/NewGroupScreen";
import { NavigationEvents } from "react-navigation";
import Test from "./Test";

interface Props {
  Contacts: {
    id: number;
    name: string;
    avatar: string;
  }[];
}

const HorizontalScrollContacts: React.FC<Props> = ({ Contacts }) => {
  const height = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  useEffect(() => {
    if (Contacts.length) {
      Animated.timing(height, {
        toValue: 75,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.linear
      }).start();
    } else {
      Animated.timing(height, {
        toValue: 0,
        useNativeDriver: false,
        duration: 200,
        easing: Easing.linear
      }).start();
    }
  }, [Contacts]);
  return (
    <Animated.View
      style={{
        height: height
      }}
    >
      <FlatList
        data={Contacts}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toLocaleString()}
        renderItem={({ item }) => <Test item={item} dispatch={dispatch} Contacts={Contacts} />}
      />
    </Animated.View>
  );
};

export default HorizontalScrollContacts;

const styles = StyleSheet.create({});
