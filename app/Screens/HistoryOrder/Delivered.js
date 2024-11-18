import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import HistoryOrderCard from "@/components/HistoryOrderCard";

const Delivered = ({ deliveredData }) => {
  return (
    <FlatList
      data={deliveredData}
      keyExtractor={(item) => item.orderId.toString()}
      renderItem={({ item }) => <HistoryOrderCard order={item} />}
    />
  );
};

export default Delivered;

const styles = StyleSheet.create({});
