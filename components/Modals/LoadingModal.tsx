import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Overlay } from "react-native-elements";
import AppColors from "../../Colors/color";
interface Props {
  isVisible: boolean;
  text: string;
}
const LoadingModal: React.FC<Props> = ({ isVisible, text }) => {
  return (
    <Overlay
      isVisible={isVisible}
      animationType="fade"
      onBackdropPress={() => {}}
      overlayStyle={{ backgroundColor: AppColors.primary_light, width: "70%" }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ActivityIndicator size="large" color={AppColors.secodary} />
        <Text style={{ color: "#fff", marginLeft: 20 }}>{text}</Text>
      </View>
    </Overlay>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({});
