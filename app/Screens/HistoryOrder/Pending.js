import HistoryOrderCard from "@components/HistoryOrderCard";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

// Mẫu dữ liệu đơn hàng
const orders = [
  {
    orderId: 3,
    totalPrice: 100000.0,
    status: "PENDING",
    createdAt: "2024-11-17T02:10:29.533+00:00",
    items: [
      {
        productName: "Cà phê sữa",
        size: "M",
        quantity: 2,
        price: 30000.0,
        imageUrl: "https://i.imgur.com/8RCOQoW.png",
      },
      {
        productName: "Bánh mì",
        size: "L",
        quantity: 1,
        price: 40000.0,
        imageUrl: "https://i.imgur.com/2qksgxF.png",
      },
    ],
    paymentMethod: "CASH_ON_DELIVERY",
  },
  {
    orderId: 4,
    totalPrice: 100000.0,
    status: "PENDING",
    createdAt: "2024-11-17T07:58:58.133+00:00",
    items: [
      {
        productName: "Cà phê sữa",
        size: "M",
        quantity: 2,
        price: 30000.0,
        imageUrl: "https://i.imgur.com/8RCOQoW.png",
      },
      {
        productName: "Bánh mì",
        size: "L",
        quantity: 1,
        price: 40000.0,
        imageUrl: "https://i.imgur.com/2qksgxF.png",
      },
    ],
    paymentMethod: "CASH_ON_DELIVERY",
  },
];

const PendingOrders = ({ pendingData }) => {
  return (
    <FlatList
      data={pendingData}
      keyExtractor={(item) => item.orderId.toString()}
      renderItem={({ item }) => <HistoryOrderCard order={item} />}
    />
  );
};

const styles = StyleSheet.create({});

export default PendingOrders;
