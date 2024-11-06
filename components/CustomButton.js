import { colors } from "@/styles/globalStyles";
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const CustomButton = ({ title, onPress }) => (
  <Button
    buttonColor={colors.primary}
    contentStyle={styles.buttonContent}
    labelStyle={styles.buttonText}
    mode="contained"
    onPress={onPress}
  >
    {title}
  </Button>
);

const styles = StyleSheet.create({
  buttonContent: {
    minWidth: "90%",
    height: 50,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CustomButton;
