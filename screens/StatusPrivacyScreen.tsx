import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import RadioButton from "../components/CustomInputs/RadioButton";

const StatusPrivacyScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const [selected, setSelected] = useState<"myContacts" | "myContactsExc" | "onlyShareWith">(
    "myContacts"
  );
  return (
    <View style={styles.prt}>
      <View>
        <Text style={{ color: "#00af9c" }}>Who can see my status updates</Text>
        <View style={{ paddingHorizontal: 15 }}>
          <RadioButton
            defaultDeterminant={"myContacts"}
            entries={[
              { label: "My Contacts", determinant: "myContacts" },
              { label: "My Contacts except...", determinant: "myContactsExc" },
              { label: "Only share with...", determinant: "onlyShareWith" }
            ]}
            onSelect={slctn => {
              if (slctn === "myContactsExc" || slctn === "onlyShareWith") {
                navigation.navigate("SelectContacts", { slctn });
              }
              setSelected(slctn as typeof selected);
            }}
          />
        </View>
        <Text style={{ color: "rgba(241, 241, 242, 0.7)" }}>
          Changes to your privacy settings won't affect status updates that you've sent already
        </Text>
      </View>
      <Button
        title="Done"
        buttonStyle={styles.btn}
        titleStyle={{ color: "#191f23" }}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

StatusPrivacyScreen.navigationOptions = {
  headerTitle: "Status Privacy"
};

export default StatusPrivacyScreen;

const styles = StyleSheet.create({
  prt: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1
  },
  btn: {
    backgroundColor: "#00af9c",
    width: 100,
    alignSelf: "center"
  }
});
