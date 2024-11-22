import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";
import { colors } from "@/styles/globalStyles";

const ProductCardSkeleton = () => {
  const imageHeight = 80; // Chiều cao hình ảnh
  const lineHeight = 12; // Chiều cao mỗi dòng (tiêu đề, mô tả, giá trị)

  const cardHeight = 160; // Tổng chiều cao của card

  const textY = imageHeight + 10; // Y của tiêu đề
  const descriptionY = textY + lineHeight + 5; // Y của mô tả
  const priceY = descriptionY + lineHeight + 5; // Y của giá trị
  return (
    <View style={[styles.card]}>
      <ContentLoader
        speed={2}
        width="100%"
        height={cardHeight}
        backgroundColor="#e0e0e0"
        foregroundColor="#c6c6c6"
      >
        {/* Placeholder for product image */}
        <Rect x="0" y="0" width="100%" height={imageHeight} rx="5" ry="5" />

        {/* Placeholder for product title */}
        <Rect x="0" y={textY} width="100%" height={lineHeight} rx="5" ry="5" />

        {/* Placeholder for product description */}
        <Rect
          x="0"
          y={descriptionY}
          width="100%"
          height={lineHeight}
          rx="5"
          ry="5"
        />
        <Rect x="0" y={priceY} width="100%" height={lineHeight} rx="5" ry="5" />
      </ContentLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 5,
    marginBottom: 15,
    padding: 15,
  },
});

export default ProductCardSkeleton;
