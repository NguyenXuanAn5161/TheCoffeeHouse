import React, { useState, useMemo } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Button, Provider } from "react-native-paper";
import { globalStyles, colors, fontSizes } from "@/styles/globalStyles";
import CartItemPayment from "@components/CartItemPayment";
import FeeCard from "@components/FeeCard";
import OrderDetail from "@components/OrderDetail";
import PaymentMethodDialog from "@components/PaymentMethodDialog";
import { MaterialIcons } from "@expo/vector-icons";

const cartItems = [
  {
    id: "1",
    name: "Cà phê Mocha",
    size: "S",
    price: 50000,
    quantity: 1,
    image: require("@/assets/images/mocha.png"),
  },
  {
    id: "2",
    name: "Cà phê Latte",
    size: "L",
    price: 45000,
    quantity: 2,
    image: require("@/assets/images/latte.png"),
  },
];

const paymentMethods = ["Tiền mặt", "Chuyển khoản", "Ví điện tử"];
const SHIPPING_FEE = 15000;

const Payment = () => {
  const [note, setNote] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );
  const totalWithShipping = totalPrice + SHIPPING_FEE;

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleSelect = (method) => {
    setSelectedMethod(method);
    hideDialog();
  };

  const handleOrder = () => {
    alert("Đặt hàng thành công!");
  };

  return (
    <Provider>
      <View style={globalStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 16 }}
        >
          <View style={{ rowGap: 10, marginTop: 10 }}>
            {cartItems.map((item) => (
              <CartItemPayment key={item.id} item={item} />
            ))}
            <FeeCard fee={SHIPPING_FEE} label="Phí giao hàng" />

            <View style={[globalStyles.shadow, styles.noteContainer]}>
              <Text style={styles.noteText}>Ghi chú cho người bán:</Text>
              <TextInput
                style={styles.noteInput}
                placeholder="Nhập ghi chú (tuỳ chọn)"
                value={note}
                onChangeText={setNote}
              />
            </View>

            <OrderDetail
              totalPrice={totalPrice}
              shippingFee={SHIPPING_FEE}
              totalWithShipping={totalWithShipping}
            />
            <View style={styles.paymentMethods}>
              <Text style={styles.paymentMethodText}>
                Phương thức thanh toán:
              </Text>
              <TouchableOpacity style={styles.btnPayment} onPress={showDialog}>
                <Text style={styles.paymentMethodText}>{selectedMethod}</Text>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => handleOrder()}
              style={styles.button}
            >
              <Text style={styles.btnText}>Đặt hàng</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <PaymentMethodDialog
          visible={visible}
          hideDialog={hideDialog}
          handleSelect={handleSelect}
          paymentMethods={paymentMethods}
        />
      </View>
    </Provider>
  );
};

export default Payment;

const styles = StyleSheet.create({
  noteContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.pinkLight,
  },
  paymentMethods: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.pinkLight,
    borderRadius: 8,
    padding: 16,
  },
  paymentMethodText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: fontSizes.sz16,
  },
  btnPayment: {
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    columnGap: 5,
  },
  button: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 5,
    marginTop: 10,
  },
  btnText: {
    fontSize: fontSizes.medium,
    color: colors.white,
    fontWeight: "700",
  },
  noteText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "700",
  },
  noteInput: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
});
