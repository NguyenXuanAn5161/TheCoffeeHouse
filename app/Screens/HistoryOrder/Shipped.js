import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import HistoryOrderCard from "@/components/HistoryOrderCard";

const Shipped = ({ shippedData }) => {
  return (
    <FlatList
      data={shippedData}
      keyExtractor={(item) => item.orderId.toString()}
      renderItem={({ item }) => <HistoryOrderCard order={item} />}
    />
  );
};

export default Shipped;

const styles = StyleSheet.create({});
