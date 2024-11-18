import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import HistoryOrderCard from "@/components/HistoryOrderCard";

const Canceled = ({ canceledData }) => {
  return (
    <FlatList
      data={canceledData}
      keyExtractor={(item) => item.orderId.toString()}
      renderItem={({ item }) => <HistoryOrderCard order={item} />}
    />
  );
};

export default Canceled;

const styles = StyleSheet.create({});
