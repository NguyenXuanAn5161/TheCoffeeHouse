import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import HistoryOrderCard from "@/components/HistoryOrderCard";

const Canceled = ({ canceledData }) => {
  const reversedData = [...canceledData].reverse();
  return (
    <FlatList
      data={reversedData}
      keyExtractor={(item) => item.orderId.toString()}
      renderItem={({ item }) => <HistoryOrderCard order={item} />}
    />
  );
};

export default Canceled;

const styles = StyleSheet.create({});
