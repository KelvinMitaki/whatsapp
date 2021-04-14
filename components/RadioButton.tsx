import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";

interface Props {
  entries: { label: string; determinant: string }[];
}

const RadioButton: React.FC<Props> = ({ entries }) => {
  const [selected, setSelected] = useState<string>("");
  return (
    <View>
      {entries.map((e, i) => (
        <TouchableNativeFeedback onPress={() => setSelected(e.determinant)} key={i}>
          <View style={{ flexDirection: "row", paddingVertical: 15 }}>
            <View
              style={{
                ...styles.radioBtn,
                ...(selected === e.determinant && { borderColor: "#00af9c" })
              }}
            >
              {e.determinant === selected ? (
                <View
                  style={{ height: 10, width: 10, backgroundColor: "#00af9c", borderRadius: 500 }}
                ></View>
              ) : null}
            </View>
            <Text style={{ color: "#fff" }}>{e.label}</Text>
          </View>
        </TouchableNativeFeedback>
      ))}
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  radioBtn: {
    borderRadius: 500,
    borderWidth: 2,
    borderColor: "#fff",
    height: 20,
    width: 20,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center"
  }
});
