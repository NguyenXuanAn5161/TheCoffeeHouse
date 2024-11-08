import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Checkbox } from "react-native-paper"; // Import Checkbox from react-native-paper
import { colors } from "@/styles/globalStyles";

// CartItemCard component
const CartItemCard = ({ product, onRemove, isChecked, onCheck }) => {
  return (
    <View style={styles.cardContainer}>
      {/* Checkbox */}
      <Checkbox
        status={isChecked ? "checked" : "unchecked"}
        onPress={onCheck}
        color={colors.primary}
      />

      {/* Product image */}
      <Image source={product.img} style={styles.productImage} />

      {/* Product info */}
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>
        <Text style={styles.productSize}>Size: {product.selectedSize}</Text>
      </View>

      {/* Remove button */}
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartItemCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: colors.cartItemCard,
    alignItems: "center",
    justifyContent: "space-between",
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "#2e7d32",
  },
  productSize: {
    fontSize: 14,
    color: "#757575",
  },
  removeButton: {
    backgroundColor: "#ff5722",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
