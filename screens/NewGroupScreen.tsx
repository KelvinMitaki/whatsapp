import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
  View
} from "react-native";
import { Text } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import inspect from "../inspect";
import Contact from "../components/Contact";
import { ScrollView } from "react-native-gesture-handler";
import { users } from "../data";

const NewGroupScreen: NavigationStackScreenComponent = () => {
  const [grpContacts, setGrpContacts] = useState<
    {
      name: string;
      avatar: string;
      id: number;
    }[]
  >([]);
  return (
    <>
      {grpContacts.length !== 0 && (
        <View style={{ height: 85 }}>
          <FlatList
            data={grpContacts}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toLocaleString()}
            renderItem={({ item }) => (
              <TouchableNativeFeedback
                onPress={() =>
                  setGrpContacts(contacts =>
                    contacts.filter(ct => ct.id !== item.id)
                  )
                }
              >
                <View style={styles.selectedContact}>
                  <View style={styles.removeContact}>
                    <Feather name="x" size={15} color="#111" />
                  </View>
                  <View style={styles.person}>
                    <Ionicons
                      name="person"
                      size={35}
                      color="rgba(241, 241, 242, 0.8)"
                    />
                  </View>
                  <View>
                    <Text
                      style={{ color: "rgba(255,255,255,.7)" }}
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            )}
          />
        </View>
      )}
      <ScrollView>
        <Contact setGrpContacts={setGrpContacts} />
      </ScrollView>
    </>
  );
};

NewGroupScreen.navigationOptions = {
  headerTitle: () => (
    <View>
      <Text h4Style={{ color: "#fff" }} h4>
        New group
      </Text>
      <Text style={{ color: "#fff" }}>Add participants</Text>
    </View>
  ),
  headerRight: () => (
    <View style={{ width: "125%", alignItems: "center" }}>
      <View style={styles.searchBorder}>
        <TouchableNativeFeedback
          onPress={() => {}}
          background={TouchableNativeFeedback.Ripple("#fff", true)}
        >
          <View>
            <MaterialIcons name="search" size={25} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
};
{
  /* <HeaderButtons HeaderButtonComponent={props => <HeaderButton {...props} />}>
<Item
  title="search"
  iconName="search"
  IconComponent={MaterialIcons}
  iconSize={25}
/>
</HeaderButtons> */
}

export default NewGroupScreen;

const styles = StyleSheet.create({
  searchBorder: {
    borderRadius: 500,
    borderWidth: 1,
    borderColor: "transparent",
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  person: {
    height: 55,
    width: 55,
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey"
  },
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
  }
});
