import useUserData from "@/hooks/useUserData";
import { useWebSocket } from "@/hooks/websocket";
import { colors } from "@/styles/globalStyles";
import CardNotification from "@components/CardNotification";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";

// Dữ liệu mẫu với ngày và hình ảnh
const notification = [
  {
    createdAt: 1731950637195,
    items: [[Object]],
    orderId: 7,
    paymentMethod: "CASH_ON_DELIVERY",
    status: "SHIPPED",
    totalPrice: 60000,
    updatedAt: 1731986943198,
  },
  {
    createdAt: 1731950637195,
    items: [[Object]],
    orderId: 7,
    paymentMethod: "CASH_ON_DELIVERY",
    status: "DELIVERED",
    totalPrice: 60000,
    updatedAt: 1731986960067,
  },
];

export default function Notification({ navigation }) {
  const [notifications, setNotifications] = useState([]);

  // Hàm thêm thông báo mới vào danh sách
  const addNotification = (notification) => {
    console.log("notification nhận được: ", notification);

    // Kiểm tra nếu thông báo hợp lệ trước khi thêm vào state
    if (notification && notification !== "Connected") {
      try {
        // Kiểm tra xem dữ liệu có phải là chuỗi JSON hợp lệ không
        const data =
          typeof notification === "string"
            ? JSON.parse(notification)
            : notification;
        console.log("notification sau khi parse: ", data);

        // Chỉ thêm thông báo hợp lệ vào danh sách
        setNotifications((prevData) => [...prevData, data]);
      } catch (error) {
        console.error("Lỗi khi parse thông báo:", error);
      }
    }
  };

  useEffect(() => {
    console.log("notification trong useEffect: ", notifications);
  }, [notifications]);

  const user = useUserData();
  useWebSocket(user?.id, addNotification);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: colors.backgroundGrey }}>
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <CardNotification
              navigation={navigation}
              key={item.orderId}
              item={item}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  separator: {
    height: 1,
    backgroundColor: colors.white,
  },
});
