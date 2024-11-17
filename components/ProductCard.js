import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { colors, fontSizes, globalStyles } from "@/styles/globalStyles";

const ProductCard = ({ product, onPress, onAdd }) => {
  return (
    <View style={[styles.card, globalStyles.shadow]}>
      <Pressable onPress={onPress} style={styles.product}>
        <Image source={{ uri: product.imageUrl }} style={styles.img_product} />
        <View style={styles.info_product}>
          <Text style={styles.title_product}>{product.name}</Text>
          <Text style={styles.discount_product}>{product.description}</Text>
          <Text style={styles.price_product}>
            {product.sizePrice.S
              ? `${product.sizePrice.S.toLocaleString()}đ`
              : "Liên hệ"}
          </Text>
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
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 5,
    marginBottom: 15,
    paddingBottom: 15,
  },
  product: {
    alignItems: "center",
    paddingBottom: 10,
  },
  img_product: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    borderRadius: 8,
  },
  info_product: {
    alignItems: "center",
    marginTop: 5,
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
