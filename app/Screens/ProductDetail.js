import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { colors, globalStyles } from "@/styles/globalStyles";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome6,
  FontAwesome5,
} from "@expo/vector-icons";

const product = [
  {
    id: 4,
    img: require("@/assets/images/vanilla.png"),
    title: "Vanilla",
    price: "đ35.000",
    discount: "With chocolate and milk",
    categoryId: 1,
    sizes: [
      { size: "S", price: "30.000đ" },
      { size: "M", price: "35.000đ" },
      { size: "L", price: "40.000đ" },
    ],
  },
];

const ProductDetail = () => {
  const { img, title, price, discount, sizes, id } = product[0];
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const handleAddCart = (id) => {
    Alert.alert(`Thêm thành công! ${id}`);
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Image */}
        <View
          style={{
            backgroundColor: colors.primary,
            width: "100%",
            justifyContent: "flex-end",
            height: "30%",
          }}
        >
          <View
            style={{
              backgroundColor: colors.white,
              borderTopLeftRadius: 900,
              borderTopRightRadius: 900,
              justifyContent: "center",
              alignItems: "center",
              height: "50%",
            }}
          >
            <Image source={img} style={styles.productImage} />
          </View>
        </View>

        {/* Title and Icons */}
        <View style={{ paddingHorizontal: 16, rowGap: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.productTitle}>{title}</Text>
            {/* Quantity and Add to Cart */}
            <View style={styles.quantityContainer}>
              <Pressable
                onPress={handleDecrement}
                style={styles.quantityButton}
              >
                <FontAwesome6 name="minus" size={20} color={colors.primary} />
              </Pressable>
              <Text style={styles.quantityText}>{quantity}</Text>
              <Pressable
                onPress={handleIncrement}
                style={styles.quantityButton}
              >
                <FontAwesome6 name="plus" size={20} color={colors.primary} />
              </Pressable>
            </View>
          </View>
          <Text style={styles.productDiscount}>{discount}</Text>
          <View style={styles.iconsContainer}>
            <Pressable style={[styles.iconButton]}>
              <MaterialIcons name="share" size={24} color={colors.primary} />
            </Pressable>
            <Pressable style={[styles.iconButton]}>
              <Ionicons name="heart" size={24} color={colors.primary} />
            </Pressable>
          </View>

          {/* Size Selection */}
          <View style={styles.sizeContainer}>
            <Text style={styles.sizeTitle}>Chọn Size:</Text>
            <View style={styles.sizeOptions}>
              {sizes.map((sizeOption, index) => {
                // Logic thay đổi kích thước ảnh tùy theo size
                const imageSize =
                  sizeOption.size === "S"
                    ? 40
                    : sizeOption.size === "M"
                    ? 50
                    : 60;

                return (
                  <Pressable
                    key={index}
                    onPress={() => setSelectedSize(sizeOption)}
                    style={[
                      styles.sizeButton,
                      selectedSize.size === sizeOption.size &&
                        styles.selectedSize,
                    ]}
                  >
                    <Image
                      source={require("@/assets/images/icon_ly_cafe2.png")}
                      style={{
                        width: imageSize,
                        height: imageSize,
                        marginBottom: 8,
                      }}
                    />
                    <Text>Size {sizeOption.size}</Text>
                    <Text style={styles.selectedSizePrice}>
                      {sizeOption.price}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Pressable
            style={styles.addToCartButton}
            onPress={() => handleAddCart(id)}
          >
            <FontAwesome5
              name="shopping-cart"
              size={24}
              color={colors.white}
              style={styles.shopping_card}
            />
            <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    rowGap: 10,
  },
  productImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    bottom: 80,
    zIndex: 1000,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  iconsContainer: {
    flexDirection: "row",
    columnGap: 10,
  },
  iconButton: {
    borderWidth: 1,
    borderRadius: 90,
    padding: 5,
    borderColor: colors.primary,
  },
  sizeContainer: {
    width: "100%",
  },
  sizeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sizeOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  sizeButton: {
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: "center",
  },
  selectedSize: {
    backgroundColor: "#e0e0e0",
  },
  selectedSizePrice: {
    fontSize: 16,
    color: "#333",
    marginTop: 8,
  },
  productDiscount: {
    fontSize: 16,
    color: "gray",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 16,
  },
  addToCartButton: {
    marginTop: 50,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: colors.primary,
    borderRadius: 8,
    flexDirection: "row",
    columnGap: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
  addToCartText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
