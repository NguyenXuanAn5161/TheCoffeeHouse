import { colors, globalStyles } from "@/styles/globalStyles";
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const CustomButton = ({ title, onPress }) => (
  <Button
    buttonColor={colors.primary}
    contentStyle={styles.buttonContent}
    labelStyle={styles.buttonText}
    style={[styles.button, globalStyles.shadow]}
    mode="contained"
    onPress={onPress}
  >
    {title}
  </Button>
);

const styles = StyleSheet.create({
  button: { borderRadius: 8 },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CustomButton;
