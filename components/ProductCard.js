import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Animated,
} from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, fontSizes, globalStyles } from "@/styles/globalStyles";

const ProductCard = ({ product, onPress, onAdd, loadingBtnPlus }) => {
  // Tạo một ref Animated để xoay vòng
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loadingBtnPlus) {
      // Bắt đầu xoay vòng khi loadingBtnPlus là true
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1, // Quay 1 vòng
          duration: 1000, // Thời gian hoàn thành 1 vòng quay
          useNativeDriver: true,
        })
      ).start();
    } else {
      // Dừng xoay vòng khi không còn loading
      rotateAnim.stopAnimation();
      rotateAnim.setValue(0); // Quay về vị trí ban đầu
    }
  }, [loadingBtnPlus, rotateAnim]);

  // Chuyển đổi giá trị của rotateAnim sang góc quay
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"], // Quay từ 0 độ đến 360 độ
  });

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
        {loadingBtnPlus ? (
          <Animated.View style={{ transform: [{ rotate }] }}>
            <MaterialCommunityIcons
              name="reload"
              size={fontSizes.sz18}
              color={colors.white}
              style={styles.iconReload}
            />
          </Animated.View>
        ) : (
          <FontAwesome5
            name="plus"
            size={fontSizes.sz18}
            color={colors.white}
            style={styles.iconPlus}
          />
        )}
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
  iconPlus: {
    fontSize: fontSizes.small,
    color: "#fff",
  },
});

export default ProductCard;
