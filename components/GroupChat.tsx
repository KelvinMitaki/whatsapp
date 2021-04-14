import React, { useCallback } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";
import { Badge, Text } from "react-native-elements";
import { Card, Avatar } from "react-native-elements";
import { TouchableNativeFeedback } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { NavigationMaterialTabScreenComponent } from "react-navigation-tabs";
import { users } from "../data/data";
import inspect from "../inspect";
import { NavigationInjectedProps, withNavigation } from "react-navigation";

const GroupChat: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  const renderItem = useCallback(
    (
      i: ListRenderItemInfo<{
        name: string;
        avatar: string;
      }>
    ) => (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#FFFFFF", false)}
        onPress={() => navigation.navigate("GroupChat")}
      >
        <View style={styles.contact}>
          {/* <Avatar
        rounded
        source={require("../assets/blank.png")}
        size={55}
      /> */}
          <View style={styles.group}>
            <FontAwesome name="group" size={35} color="rgba(241, 241, 242, 0.8)" />
          </View>
          <View style={styles.contactTxt}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "400",
                  color: "#fff",
                  width: "78%"
                }}
                numberOfLines={1}
              >
                Group {i.index + 1}
              </Text>
              <Text style={{ right: 1, color: "rgba(255,255,255,.6)" }}>Yesterday</Text>
            </View>
            <View style={styles.msg}>
              <Text
                numberOfLines={1}
                style={{
                  marginTop: 5,
                  color: "rgba(255,255,255,.6)",
                  width: "90%"
                }}
              >
                +2547 2155 9392: hello Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Commodi sed et vel fuga quibusdam nihil dolorum temporibus, veniam enim error? Saepe
                in vel enim, repellat dicta distinctio porro molestias alias?
              </Text>
              <Badge value="99" badgeStyle={{ backgroundColor: "#00af9c" }} />
            </View>
            <Card.Divider
              style={{
                marginTop: 15,
                backgroundColor: "rgba(255,255,255,.3)"
              }}
            />
          </View>
        </View>
      </TouchableNativeFeedback>
    ),
    []
  );
  const keyExtractor = useCallback((_: any, i: number) => i.toLocaleString(), []);
  const getItemLayout = useCallback(
    (data: any, i: number) => ({ length: 70, offset: 70 * i, index: i }),
    []
  );
  return (
    <View style={styles.prt}>
      <FlatList
        data={users}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

export default withNavigation(GroupChat);

const styles = StyleSheet.create({
  prt: {},
  contact: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    paddingHorizontal: 10
  },
  contactTxt: {
    paddingLeft: 10,
    width: "85%",
    justifyContent: "space-between",
    height: "100%"
  },
  msg: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  group: {
    borderRadius: 70,
    backgroundColor: "grey",
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  plus: {
    position: "absolute",
    right: "5%",
    bottom: "3%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00af9c",
    height: 55,
    width: 55,
    borderRadius: 55
  }
});
