import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Checkbox } from "react-native-paper";
import { FontAwesome6, Feather } from "@expo/vector-icons";
import { colors } from "@/styles/globalStyles";

const CartItemCard = ({ product, onRemove, isChecked, onCheck }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (type) => {
    setQuantity((prevQuantity) =>
      type === "increment" ? prevQuantity + 1 : Math.max(1, prevQuantity - 1)
    );
  };

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

        {/* Quantity control */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => handleQuantityChange("decrement")}
            style={styles.quantityButton}
          >
            <FontAwesome6 name="minus" size={20} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => handleQuantityChange("increment")}
            style={styles.quantityButton}
          >
            <FontAwesome6 name="plus" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Remove button */}
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Feather name="trash-2" size={24} color={colors.danger} />
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
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.primary,
  },
  quantityText: {
    fontSize: 18,
  },
  removeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
