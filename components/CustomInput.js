import { colors } from "@/styles/globalStyles";
import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const CustomInput = ({ field, form, label, secureTextEntry, rightIcon }) => (
  <TextInput
    theme={{
      colors: {
        text: colors.primary,
        background: colors.white,
        primary: colors.primary,
      },
    }}
    label={label}
    value={field.value}
    onChangeText={form.handleChange(field.name)}
    mode="outlined"
    outlineStyle={styles.outlineStyle}
    style={[styles.input]}
    secureTextEntry={secureTextEntry}
    right={rightIcon && <TextInput.Icon {...rightIcon} />}
  />
);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "#fff",
    fontWeight: "400",
    color: "#834637",
  },
});

export default CustomInput;
