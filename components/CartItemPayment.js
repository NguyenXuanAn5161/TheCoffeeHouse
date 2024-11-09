import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { globalStyles, colors, fontSizes } from "@/styles/globalStyles";

const CartItemPayment = ({ item }) => (
  <View style={[styles.cartItem, globalStyles.shadow]}>
    <Image source={item.image} style={styles.image} />
    <View style={styles.itemDetails}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemSize}>Size: {item.size}</Text>
      <Text style={styles.itemPrice}>{item.price.toLocaleString()} VND</Text>
    </View>
    <Text style={styles.itemQuantity}>Số lượng: {item.quantity}</Text>
  </View>
);

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.pinkLight,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemSize: {
    fontSize: 14,
    color: fontSizes.textSecondary,
  },
  itemQuantity: {
    fontSize: 14,
    color: fontSizes.textSecondary,
  },
  itemPrice: {
    fontSize: 14,
    color: colors.primary,
  },
});

export default CartItemPayment;
