import React, { useEffect, useRef } from "react";
import { StyleSheet, FlatList, Animated, Easing } from "react-native";
import { useDispatch } from "react-redux";
import { User } from "../../interfaces/ChatInterface";
import HorizontalContact from "./HorizontalContact";

interface Props {
  Contacts: User[];
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
        renderItem={({ item }) => <HorizontalContact item={item} dispatch={dispatch} />}
      />
    </Animated.View>
  );
};

export default HorizontalScrollContacts;

const styles = StyleSheet.create({});
