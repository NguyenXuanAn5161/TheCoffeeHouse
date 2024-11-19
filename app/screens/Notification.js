<<<<<<< HEAD
import { colors } from "@/styles/globalStyles";
import CardNotification from "@components/CardNotification";
import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

// Dữ liệu mẫu với ngày và hình ảnh
const notifications = [
  {
    id: "1",
    title: "Thông báo 1",
    description: "Đây là thông báo đầu tiên.",
    date: "2024-11-09",
    image: require("@/assets/images/mocha.png"),
  },
  {
    id: "2",
    title: "Thông báo 2",
    description: "Đây là thông báo thứ hai.",
    date: "2024-11-08",
    image: require("@/assets/images/mocha.png"),
  },
  {
    id: "3",
    title: "Thông báo 3",
    description: "Đây là thông báo thứ ba.",
    date: "2024-11-07",
    image: require("@/assets/images/mocha.png"),
=======
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
>>>>>>> 882e75b3f58a7a0dc3de4348e8332e3f951ddcb0
  },
];

export default function Notification({ navigation }) {
<<<<<<< HEAD
=======
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

>>>>>>> 882e75b3f58a7a0dc3de4348e8332e3f951ddcb0
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: colors.backgroundGrey }}>
        <FlatList
<<<<<<< HEAD
          data={notifications}
          renderItem={({ item }) => (
            <CardNotification
              title={item.title}
              description={item.description}
              date={item.date}
              image={item.image}
            />
          )}
          keyExtractor={(item) => item.id}
=======
          data={notifications.reverse()}
          renderItem={({ item }) => (
            <CardNotification
              navigation={navigation}
              key={item.orderId}
              item={item}
            />
          )}
          keyExtractor={(item) => item.orderId.toString()}
>>>>>>> 882e75b3f58a7a0dc3de4348e8332e3f951ddcb0
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
