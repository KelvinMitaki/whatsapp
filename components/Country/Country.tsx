import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { SvgUri } from "react-native-svg";
import { NavigationInjectedProps, withNavigation } from "react-navigation";
import { useDispatch } from "react-redux";
import { countries } from "../../data/countries";
import { SetCountry } from "../PhoneNumber/PhoneNumberComponent";

interface Props {
  item: typeof countries[0];
}

const Country: React.FC<Props & NavigationInjectedProps> = ({ item, navigation }) => {
  const dispatch = useDispatch();
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("#fff", false)}
      onPress={() => {
        dispatch<SetCountry>({ type: "setCountry", payload: item.dial_code });
        navigation.goBack();
      }}
    >
      <View style={styles.country}>
        <View style={{ flexDirection: "row" }}>
          <SvgUri
            uri={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${item.code}.svg`}
            style={{ width: 20, height: 20 }}
          />

          <Text style={{ color: "#fff", marginLeft: 10 }}>{item.name}</Text>
        </View>
        <Text style={{ color: "rgba(255,255,255,.5)", fontWeight: "bold" }}>+{item.dial_code}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default React.memo(withNavigation(Country), () => true);

const styles = StyleSheet.create({
  country: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 10,
    borderTopColor: "rgba(255,255,255,.2)",
    borderTopWidth: 0.5
  }
});
