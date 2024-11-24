import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { colors, fontSizes } from "@/styles/globalStyles";
import CartItemPayment from "./CartItemPayment";
import { formatTime } from "@/utils/formatTime";
import { MaterialIcons } from "@expo/vector-icons";

const HistoryOrderCard = ({ order, handleCancelOrder }) => {
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>Mã đơn hàng: #{order.orderId}</Text>
        {order?.status === "PENDING" ? (
          <Pressable onPress={handleCancelOrder}>
            <MaterialIcons name="cancel" size={26} color={colors.danger} />
          </Pressable>
        ) : null}
      </View>
      <Text>Ngày tạo: {formatTime(order.createdAt)}</Text>
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
    marginVertical: 10,
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
