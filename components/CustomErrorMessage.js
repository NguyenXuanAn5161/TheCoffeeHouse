import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CustomErrorMessage = ({ msg, style }) => {
  if (!msg) return null;

  return (
    <View style={[styles.container, style]}>
      <MaterialIcons
        name="error-outline"
        size={16}
        color="red"
        style={styles.icon}
      />
      <Text style={styles.text}>{msg}</Text>
    </View>
  );
};

export default CustomErrorMessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFE5E5",
    padding: 5,
    borderRadius: 5,
  },
  icon: {
    marginRight: 5,
  },
  text: {
    color: "red",
    fontSize: 12,
  },
});
