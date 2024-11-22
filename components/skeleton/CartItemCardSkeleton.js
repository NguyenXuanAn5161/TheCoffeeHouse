import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "@/styles/globalStyles";
import ContentLoader, { Rect } from "react-content-loader/native";

const CartItemCardSkeleton = () => {
  return (
    <View style={styles.cardContainer}>
      <ContentLoader
        speed={1}
        width={400}
        height={100}
        viewBox="0 0 400 100"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <Rect x="0" y={"40"} rx="5" ry="5" width="20" height="20" />
        <Rect x="25" y="10" rx="5" ry="5" width="80" height="80" />
        <Rect x="115" y="10" rx="5" ry="5" width="195" height="20" />
        <Rect x="115" y="40" rx="5" ry="5" width="150" height="15" />
        <Rect x="115" y="65" rx="5" ry="5" width="100" height="20" />
        <Rect x="320" y="35" rx="5" ry="5" width="30" height="30" />
      </ContentLoader>
    </View>
  );
};

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
});

export default CartItemCardSkeleton;
