import { cancelOrder } from "@/service/order";
import HistoryOrderCard from "@components/HistoryOrderCard";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button, Modal, Portal, Provider } from "react-native-paper";
import Toast from "react-native-toast-message";

const PendingOrders = ({ pendingData, getOrderData }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleCancelOrder = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const confirmCancelOrder = async () => {
    console.log(`Hủy đơn hàng: ${selectedOrder?.orderId}`);
    try {
      const res = await cancelOrder(selectedOrder?.orderId);
      if (res.success) {
        setModalVisible(false);
        setSelectedOrder(null);
        await getOrderData();
        Toast.show({
          type: "success",
          text1: "Thành công!",
          text2: res.message,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Thất bại!",
          text2: res.message,
        });
      }
    } catch (error) {
      console.log("Error file pending order: ", error);
    }
  };

  const cancelModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  const reversedData = [...pendingData].reverse();

  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <FlatList
          data={reversedData}
          keyExtractor={(item) => item.orderId.toString()}
          renderItem={({ item }) => (
            <HistoryOrderCard
              order={item}
              handleCancelOrder={() => handleCancelOrder(item)}
            />
          )}
        />

        {/* React Native Paper Modal */}
        <Portal>
          <Modal
            visible={isModalVisible}
            onDismiss={cancelModal}
            contentContainerStyle={styles.modalContainer}
          >
            <Text style={styles.modalText}>
              Bạn có chắc chắn muốn hủy đơn hàng #{selectedOrder?.orderId}{" "}
              không?
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={confirmCancelOrder}
                style={styles.cancelButton}
                color="red"
              >
                Hủy đơn hàng
              </Button>
              <Button mode="outlined" onPress={cancelModal}>
                Quay lại
              </Button>
            </View>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    marginRight: 10,
  },
});

export default PendingOrders;
