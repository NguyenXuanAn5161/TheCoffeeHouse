import { colors, globalStyles } from "@/styles/globalStyles";
import React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import image from "@/assets/images/donhang.png";
import { formatTime } from "@/utils/formatTime";

const CardNotification = ({ item, navigation }) => {
  const orderStatusMessages = {
    PENDING: "đang chờ xử lý, hãy kiên nhẫn một chút nhé!",
    PROCESSING: "đang được xử lý, chúng tôi đang chuẩn bị để giao cho bạn.",
    SHIPPED: "đã được gửi đi, chỉ một chút nữa là đến tay bạn!",
    DELIVERED: "đã được giao thành công.",
    CANCELED: "của bạn đã bị hủy.",
  };

  const getOrderStatusMessage = (status) => {
    return orderStatusMessages[status] || "Trạng thái không xác định.";
  };

  const handleHistoryOrder = (status) => {
    navigation.navigate("HistoryOrder", { status });
  };

  return (
    <Pressable
      onPress={() => handleHistoryOrder(item.status)}
      style={[styles.card, globalStyles.shadow]}
    >
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.orderId}>Đơn hàng #{item.orderId}</Text>
        <Text style={styles.status}>
          Đơn hàng #{item.orderId} {getOrderStatusMessage(item.status)}
        </Text>
        <Text style={styles.date}>
          Đặt hàng lúc: {formatTime(item.createdAt)}
        </Text>
        <Text style={styles.date}>
          Cập nhật lúc: {formatTime(item.updatedAt)}
        </Text>
      </View>
    </Pressable>
  );
};

export default CardNotification;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.pinkLight,
    padding: 12,
    columnGap: 12,
    margin: 5,
    borderRadius: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: colors.text,
    marginVertical: 4,
    fontWeight: "500",
  },
  status: {
    fontSize: 14,
    color: colors.text,
  },
});
