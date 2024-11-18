import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, fontSizes } from "@/styles/globalStyles";
import CartItemPayment from "./CartItemPayment";

const HistoryOrderCard = ({ order }) => {
  const getStatusText = (status) => {
    switch (status) {
      case "PENDING":
        return "Chờ xử lý";
      case "PROCESSING":
        return "Đang xử lý";
      case "SHIPPED":
        return "Đang giao hàng";
      case "DELIVERED":
        return "Đã giao hàng";
      case "CANCELED":
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Mã đơn hàng: #{order.orderId}</Text>
      <Text>Ngày tạo: {new Date(order.createdAt).toLocaleString()}</Text>
      <Text>
        Trạng thái:{" "}
        <Text style={styles.text}>{getStatusText(order?.status)}</Text>
      </Text>
      <Text>
        Phương thức thanh toán:{" "}
        <Text style={styles.text}>
          {order.paymentMethod === "CASH_ON_DELIVERY"
            ? "Thanh toán khi nhận hàng"
            : "Chưa xác định"}
        </Text>
      </Text>
      <Text style={styles.total}>
        Tổng tiền: {order.totalPrice.toLocaleString("vi-VN")}đ
      </Text>
      <FlatList
        data={order.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginTop: 10 }}>
            <CartItemPayment key={item.id} item={item} />
          </View>
        )}
      />
    </View>
  );
};

export default HistoryOrderCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: fontSizes.sz18,
    fontWeight: "bold",
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  text: {
    color: colors.primary,
    fontWeight: "700",
  },
});
