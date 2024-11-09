// src/components/PaymentMethodDialog.js
import { colors } from "@/styles/globalStyles";
import React from "react";
import { Text } from "react-native";
import { Dialog, Portal, Button } from "react-native-paper";

const PaymentMethodDialog = ({
  visible,
  hideDialog,
  handleSelect,
  paymentMethods,
}) => (
  <Portal>
    <Dialog visible={visible} onDismiss={hideDialog}>
      <Dialog.Title style={{ color: colors.text }}>
        Phương thức thanh toán
      </Dialog.Title>
      <Dialog.Content>
        {paymentMethods.map((method, index) => (
          <Button
            key={index}
            mode="text"
            onPress={() => handleSelect(method)}
            style={{ marginBottom: 8 }}
          >
            <Text style={{ color: colors.text }}>{method}</Text>
          </Button>
        ))}
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={hideDialog}>
          <Text style={{ color: colors.danger }}>Huỷ</Text>
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

export default PaymentMethodDialog;
