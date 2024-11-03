// components/CustomInput.js
import React from "react";
import { TextInput, StyleSheet } from "react-native";

const CustomInput = ({ placeholder, secureTextEntry, style }) => (
  <TextInput
    style={[styles.input, style]}
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
  />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    width: "90%",
    height: 50,
    borderRadius: 50,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    fontSize: 20,
    fontWeight: "400",
    color: "#834637",
  },
});

export default CustomInput;
