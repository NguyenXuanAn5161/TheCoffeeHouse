import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fontSizes, globalStyles } from "@/styles/globalStyles";

const OrderDetails = ({ totalPrice, shippingFee, totalWithShipping }) => (
  <View style={[styles.orderDetailsContainer, globalStyles.shadow]}>
    <Text style={styles.orderDetailsText}>Chi tiết đơn hàng:</Text>
    <View style={styles.orderItem}>
      <Text>Tổng giá sản phẩm:</Text>
      <Text>{totalPrice.toLocaleString()} VND</Text>
    </View>
    <View style={styles.orderItem}>
      <Text>Phí giao hàng:</Text>
      <Text>{shippingFee.toLocaleString()} VND</Text>
    </View>
    <View style={styles.orderItem}>
      <Text style={styles.orderTotal}>Tổng cộng:</Text>
      <Text style={styles.orderTotal}>
        {totalWithShipping.toLocaleString()} VND
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  orderDetailsContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.pinkLight,
  },
  orderDetailsText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "700",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
});

export default OrderDetails;
