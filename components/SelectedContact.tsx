import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { users } from "../data/data";

export interface Data {
  name: string;
  avatar: string;
  id: number;
}
interface Props {
  setChecked: React.Dispatch<React.SetStateAction<Data[]>>;
  index: number;
  item: typeof users[0];
  checked: Data[];
}

const SelectedContact: React.FC<Props> = ({ setChecked, index, item, checked }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, { toValue: 1, useNativeDriver: false, duration: 150 }).start();
  };
  const fadeOut = () => {
    Animated.timing(fadeAnim, { toValue: 0, useNativeDriver: false, duration: 150 }).start();
  };
  useEffect(() => {
    if (checked.some(c => c.id === index)) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [checked]);
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#fff", false)}
      onPress={() =>
        setChecked(c => {
          const items = [...c];
          const itemIndex = c.findIndex(i => i.id === index);
          if (itemIndex !== -1) {
            items.splice(itemIndex, 1);
            return items;
          }
          return [...c, { ...item, id: index }];
        })
      }
    >
      <View style={styles.contact}>
        <View style={styles.person}>
          <Ionicons name="person" size={30} color="rgba(241, 241, 242, 0.8)" />
        </View>
        <View style={styles.info}>
          <Text numberOfLines={1} style={{ color: "#fff", width: "88%" }}>
            {item.name}
          </Text>
          <View style={styles.info_outline}>
            <Animated.View
              style={[
                styles.check,
                {
                  opacity: fadeAnim,
                  transform: [
                    {
                      scale: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] })
                    }
                  ]
                }
              ]}
            >
              <MaterialIcons name="check" size={18} color="#191f23" />
            </Animated.View>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default SelectedContact;

const styles = StyleSheet.create({
  contact: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50
  },
  person: {
    height: 40,
    width: 40,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey"
  },
  info: {
    borderBottomColor: "rgba(241, 241, 242, 0.7)",
    borderBottomWidth: 0.5,
    height: 50,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  check: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  info_outline: {
    height: 20,
    width: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
