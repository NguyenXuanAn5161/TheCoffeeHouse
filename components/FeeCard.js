import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fontSizes, globalStyles } from "@/styles/globalStyles";

const FeeCard = ({ fee, label }) => (
  <View style={[styles.feeContainer, globalStyles.shadow]}>
    <Text style={styles.feeText}>{label}:</Text>
    <Text style={styles.feePrice}>{fee.toLocaleString("vi-VN")}đ</Text>
  </View>
);

const styles = StyleSheet.create({
  feeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.pinkLight,
  },
  feeText: {
    fontSize: fontSizes.sz14,
    color: colors.primary,
    fontWeight: "700",
  },
  feePrice: {
    fontSize: 14,
    color: colors.primary,
  },
});

export default FeeCard;
