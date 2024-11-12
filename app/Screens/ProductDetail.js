import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { colors, fontSizes } from "@/styles/globalStyles";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome6,
  FontAwesome5,
} from "@expo/vector-icons";
import { getProductById } from "@/service/product";
import Toast from "react-native-toast-message";

const ProductDetail = ({ route }) => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = route.params;

  useEffect(() => {
    getProduct(id);
  }, [id]);

  const getProduct = async (id) => {
    setLoading(true);
    try {
      const res = await getProductById(id);
      if (res.success) {
        const { sizePrice } = res.data;
        const sortedSizes = ["S", "M", "L"].map((size) => ({
          size,
          price: `${sizePrice[size].toLocaleString()}đ`,
        }));
        setProduct(res.data);
        setSizes(sortedSizes);
        setSelectedSize(sortedSizes[0]);
      } else {
        Toast.show({
          type: "error",
          text1: "Chi tiết sản phẩm",
          text2: res.message,
        });
      }
    } catch (error) {
      console.log("Error file product detail: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (type) => {
    setQuantity((prevQuantity) =>
      type === "increment" ? prevQuantity + 1 : Math.max(1, prevQuantity - 1)
    );
  };

  const handleAddCart = () => {
    Alert.alert("Success", `Thêm thành công ${product.name}!`);
  };

  const renderSizeOptions = () =>
    sizes.map((sizeOption, index) => {
      const imageSize =
        sizeOption.size === "S" ? 40 : sizeOption.size === "M" ? 50 : 60;
      const isSelected = selectedSize?.size === sizeOption.size;
      return (
        <Pressable
          key={index}
          onPress={() => setSelectedSize(sizeOption)}
          style={[styles.sizeButton, isSelected && styles.selectedSize]}
        >
          <Image
            source={require("@/assets/images/icon_ly_cafe2.png")}
            style={{ width: imageSize, height: imageSize, marginBottom: 8 }}
          />
          <Text>Size {sizeOption.size}</Text>
          <Text style={styles.selectedSizePrice}>{sizeOption.price}</Text>
        </Pressable>
      );
    });

  if (!product) return null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={{ rowGap: 10 }}>
          {/* Image Section */}
          <View style={[styles.imageWrapper, { flex: 3 / 5 }]}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: product.imageUrl }}
                style={styles.productImage}
              />
            </View>
          </View>

          {/* Product Info */}
          <View style={[styles.infoContainer, { flex: 2 / 5 }]}>
            <View style={styles.titleContainer}>
              <Text style={styles.productTitle}>{product.name}</Text>
              <View style={styles.quantityContainer}>
                <Pressable
                  onPress={() => handleQuantityChange("decrement")}
                  style={styles.quantityButton}
                >
                  <FontAwesome6 name="minus" size={20} color={colors.primary} />
                </Pressable>
                <Text style={styles.quantityText}>{quantity}</Text>
                <Pressable
                  onPress={() => handleQuantityChange("increment")}
                  style={styles.quantityButton}
                >
                  <FontAwesome6 name="plus" size={20} color={colors.primary} />
                </Pressable>
              </View>
            </View>

            <Text style={styles.productDiscount}>{product.description}</Text>

            {/* Action Icons */}
            <View style={styles.iconsContainer}>
              {["share", "heart"].map((icon, idx) => (
                <Pressable key={idx} style={styles.iconButton}>
                  {icon === "share" ? (
                    <MaterialIcons
                      name={icon}
                      size={24}
                      color={colors.primary}
                    />
                  ) : (
                    <Ionicons name={icon} size={24} color={colors.primary} />
                  )}
                </Pressable>
              ))}
            </View>

            {/* Size Selection */}
            <View style={styles.sizeContainer}>
              <Text style={styles.sizeTitle}>Chọn Size:</Text>
              <View style={styles.sizeOptions}>{renderSizeOptions()}</View>
            </View>

            {/* Add to Cart Button */}
            <Pressable style={styles.addToCartButton} onPress={handleAddCart}>
              <FontAwesome5
                name="shopping-cart"
                size={24}
                color={colors.white}
              />
              <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  imageWrapper: {
    backgroundColor: colors.primary,
    height: "30%",
    width: "100%",
    justifyContent: "flex-end",
  },
  imageContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 900,
    borderTopRightRadius: 900,
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
  },
  productImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    bottom: 80,
  },
  infoContainer: {
    paddingHorizontal: 16,
    rowGap: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  productDiscount: {
    fontSize: fontSizes.sz16,
    color: "gray",
  },
  iconsContainer: {
    flexDirection: "row",
    columnGap: 10,
  },
  iconButton: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 50,
    borderColor: colors.primary,
  },
  sizeContainer: {
    rowGap: 10,
  },
  sizeTitle: {
    fontSize: fontSizes.sz18,
    fontWeight: "bold",
  },
  sizeOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  sizeButton: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "flex-end",
  },
  selectedSize: {
    backgroundColor: "#e0e0e0",
  },
  selectedSizePrice: {
    marginTop: 8,
    fontSize: 16,
    color: "#333",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.primary,
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 18,
  },
  addToCartButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: colors.primary,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
