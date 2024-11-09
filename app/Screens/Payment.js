import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { globalStyles, colors, fontSizes } from "@/styles/globalStyles";

// Dữ liệu mẫu cho các sản phẩm trong giỏ hàng
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

// Phương thức thanh toán mẫu
const paymentMethods = ["Tiền mặt", "Chuyển khoản", "Ví điện tử"];

const SHIPPING_FEE = 15000; // Phí giao hàng mẫu

// Component CartItem
const CartItem = ({ item }) => (
  <View style={[styles.cartItem, globalStyles.shadow]}>
    <Image source={item.image} style={styles.image} />
    <View style={styles.itemDetails}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemSize}>Size: {item.size}</Text>
      <Text style={styles.itemPrice}>{item.price.toLocaleString()} VND</Text>
    </View>
    <Text style={styles.itemQuantity}>Số lượng: {item.quantity}</Text>
  </View>
);

const Payment = () => {
  const [note, setNote] = useState("");

  // Tính tổng giá chỉ khi `cartItems` thay đổi
  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const totalWithShipping = totalPrice + SHIPPING_FEE;

  return (
    <View style={globalStyles.container}>
      {/* Nội dung chính */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={{ rowGap: 10 }}>
          {/* Danh sách sản phẩm */}
          <View style={{ rowGap: 10, marginTop: 10 }}>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </View>

          {/* Card phí giao hàng */}
          <View style={[styles.feeContainer, globalStyles.shadow]}>
            <Text style={styles.feeText}>Phí giao hàng:</Text>
            <Text style={styles.feePrice}>
              {SHIPPING_FEE.toLocaleString()} VND
            </Text>
          </View>

          {/* Card ghi chú cho người bán */}
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>Ghi chú cho người bán:</Text>
            <TextInput
              style={styles.noteInput}
              placeholder="Nhập ghi chú (tuỳ chọn)"
              value={note}
              onChangeText={setNote}
            />
          </View>

          {/* Card chi tiết đơn hàng */}
          <View style={[styles.orderDetailsContainer, globalStyles.shadow]}>
            <Text style={styles.orderDetailsText}>Chi tiết đơn hàng:</Text>
            <View style={styles.orderItem}>
              <Text>Tổng giá sản phẩm:</Text>
              <Text>{totalPrice.toLocaleString()} VND</Text>
            </View>
            <View style={styles.orderItem}>
              <Text>Phí giao hàng:</Text>
              <Text>{SHIPPING_FEE.toLocaleString()} VND</Text>
            </View>
            <View style={styles.orderItem}>
              <Text style={styles.orderTotal}>Tổng cộng:</Text>
              <Text style={styles.orderTotal}>
                {totalWithShipping.toLocaleString()} VND
              </Text>
            </View>
          </View>

          {/* Chọn phương thức thanh toán */}
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.paymentMethodText}>
              Phương thức thanh toán:
            </Text>
            {paymentMethods.map((method, index) => (
              <TouchableOpacity key={index} style={styles.paymentMethodButton}>
                <Text style={styles.paymentMethodButtonText}>{method}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Nút xác nhận thanh toán */}
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Xác nhận thanh toán</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.pinkLight,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemSize: {
    fontSize: 14,
    color: fontSizes.textSecondary,
  },
  itemQuantity: {
    fontSize: 14,
    color: fontSizes.textSecondary,
  },
  itemPrice: {
    fontSize: 14,
    color: colors.primary,
  },
  feeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.pinkLight,
  },
  feeText: {
    fontSize: fontSizes.sz14,
    color: colors.primary,
    fontWeight: "700",
  },
  feePrice: {
    fontSize: 14,
    color: colors.primary,
  },
  noteContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.pinkLight,
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
  orderDetailsContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.pinkLight,
  },
  orderDetailsText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "700",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
  paymentMethodText: {
    fontSize: 16,
    marginTop: 16,
    color: colors.primary,
    fontWeight: "700",
  },
  paymentMethodButton: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.greyLight,
  },
  paymentMethodButtonText: {
    fontSize: 14,
    color: fontSizes.textSecondary,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  confirmButtonText: {
    textAlign: "center",
    color: colors.white,
    fontWeight: "bold",
  },
});
