import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { User } from "../../interfaces/ChatInterface";

interface Props {
  setChecked: React.Dispatch<React.SetStateAction<User[]>>;
  item: User;
  checked: boolean;
}

const SelectedContact: React.FC<Props> = ({ setChecked, item, checked }) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#fff", false)}
      onPress={() => {
        setChecked(c => {
          const items = [...c];
          const itemIndex = c.findIndex(i => i._id === item._id);
          if (itemIndex !== -1) {
            items.splice(itemIndex, 1);
            return items;
          }
          return [...c, item];
        });
      }}
    >
      <View style={styles.contact}>
        <View style={styles.person}>
          <Ionicons name="person" size={30} color="rgba(241, 241, 242, 0.8)" />
        </View>
        <View style={styles.info}>
          <Text
            numberOfLines={1}
            style={{ color: "#fff", width: "88%", fontSize: 18, fontWeight: "700" }}
          >
            {item.name}
          </Text>
          <View style={styles.info_outline}>
            <View style={{ ...(checked && styles.check) }}>
              <MaterialIcons name="check" size={18} color="#191f23" />
            </View>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default React.memo(SelectedContact);

const styles = StyleSheet.create({
  contact: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60
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
    borderBottomColor: "rgba(241, 241, 242, 0.5)",
    borderBottomWidth: 0.5,
    height: 60,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  check: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: "#00af9c",
    alignItems: "center",
    justifyContent: "center"
  },
  info_outline: {
    height: 20,
    width: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(241, 241, 242, 0.5)",
    alignItems: "center",
    justifyContent: "center"
  }
});
