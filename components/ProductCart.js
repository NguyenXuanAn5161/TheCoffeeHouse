// components/ProductCard.js
import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { colors, fontSizes } from "@/styles/globalStyles";

const ProductCard = ({ product, onPress, onAdd }) => {
  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={styles.product}>
        <Image source={product.img} style={styles.img_product} />
        <View style={styles.info_product}>
          <Text style={styles.title_product}>{product.title}</Text>
          <Text style={styles.discount_product}>{product.discount}</Text>
          <Text style={styles.price_product}>{product.price}</Text>
        </View>
      </Pressable>
      <Pressable onPress={onAdd} style={styles.btn_add}>
        <FontAwesome5
          name="plus"
          size={18}
          color="white"
          style={styles.icon_plus}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "45%",
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 15,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  product: {
    alignItems: "center",
    paddingVertical: 10,
  },
  img_product: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    borderRadius: 8,
  },
  info_product: {
    alignItems: "center",
    marginTop: 12,
  },
  title_product: {
    fontSize: fontSizes.small,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 5,
  },
  discount_product: {
    fontSize: fontSizes.sz14,
    color: "#6d6d6d",
    marginBottom: 5,
    textAlign: "center",
  },
  price_product: {
    fontSize: fontSizes.small,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
  },
  btn_add: {
    width: 40,
    height: 30,
    borderRadius: 5,
    backgroundColor: colors.primary,
    position: "absolute",
    bottom: -15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  icon_plus: {
    fontSize: fontSizes.small,
    color: "#fff",
  },
});

export default ProductCard;
