// components/CustomInput.js
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { colors } from "@/styles/globalStyles";

const CustomSearch = ({ placeholder }) => (
  <View style={styles.btn_search}>
    <FontAwesome5
      name="search"
      size={18}
      color="#834637"
      style={styles.icon_search}
    />
    <TextInput placeholder={"Bạn muốn tìm gì?"} style={[styles.input_search]} />
  </View>
);

const styles = StyleSheet.create({
  btn_search: {
    flexDirection: "row",
    width: "85%",
    backgroundColor: colors.white,
    height: 40,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    marginVertical: 15,
  },
  icon_search: {
    shadowColor: "#f1f1f1",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    padding: 10,
  },
  input_search: {
    color: "#834637",
    marginLeft: 10,
    width: "85%",
    outlineStyle: "none", //ẩn đường viền
  },
});

export default CustomSearch;
