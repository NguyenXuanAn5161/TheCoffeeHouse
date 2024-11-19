import HistoryOrderCard from "@components/HistoryOrderCard";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

const PendingOrders = ({ pendingData }) => {
  const reversedData = [...pendingData].reverse();
  return (
    <FlatList
      data={reversedData}
      keyExtractor={(item) => item.orderId.toString()}
      renderItem={({ item }) => <HistoryOrderCard order={item} />}
    />
  );
};

const styles = StyleSheet.create({});

export default PendingOrders;
