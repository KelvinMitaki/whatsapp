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
        renderItem={({ item }) => (
          <TouchableNativeFeedback
            onPress={() =>
              dispatch<SetContacts>({
                type: "setContacts",
                payload: item
              })
            }
          >
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
          </TouchableNativeFeedback>
        )}
      />
    </Animated.View>
  );
};

export default HorizontalScrollContacts;

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
