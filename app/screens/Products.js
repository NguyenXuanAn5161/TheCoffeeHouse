import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomSearch from "@/components/CustomSearch";
import { colors, fontSizes, globalStyles } from "@/styles/globalStyles";
import ProductCard from "@/components/ProductCard";
import { getAllproduct, getAllProduct } from "@/service/product";
import { addShoppingCart } from "@/service/shoppingCart";
import Toast from "react-native-toast-message";
import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton";
import useUserData from "@/hooks/useUserData";
import { FlatList } from "react-native";

const category = [
  { id: 1, name: "Coffee" },
  { id: 2, name: "Food" },
];

const Products = ({ navigation }) => {
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category[0].name);
  const [loading, setLoading] = useState(false);
  const [loadingBtnPlus, setLoadingBtnPlus] = useState({});
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalElement, setTotalElement] = useState();

  const user = useUserData();

  const handleProductPress = (id) => {
    navigation.navigate("ProductDetail", { id });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await getAllproduct(page, size, "", null, "");

      if (res.success) {
        setProduct(res.data);
        setTotalElement(res.totalElements);
      }
    } catch (error) {
      console.log("Error file Product: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    // Tìm sản phẩm trong danh sách sản phẩm
    const selectedProduct = product.find((p) => p.id === productId);

    // Kiểm tra số lượng
    if (selectedProduct.quantity <= 0) {
      Toast.show({
        type: "error",
        text1: "Thất bại",
        text2: "Sản phẩm này đã hết hàng.",
      });
      return;
    }

    setLoadingBtnPlus((prev) => ({ ...prev, [productId]: true }));
    try {
      const res = await addShoppingCart(user.id, productId, "S", "1");

      if (res.success) {
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: res.message,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Thất bại",
          text2: res.message,
        });
      }
    } catch (error) {
      console.log("Error file product", error);
    } finally {
      setLoadingBtnPlus((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleCategoryPress = (id) => {
    setSelectedCategory(id);
  };

  // Lọc sản phẩm dựa trên category được chọn
  const filteredProducts = product.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={globalStyles.centered}>
          <CustomSearch />
        </View>
        <View style={styles.mainContent}>
          <ScrollView contentContainerStyle={styles.categoryScroll} horizontal>
            {category.map((item) => {
              const isSelected = selectedCategory === item.name;
              return (
                <Pressable
                  key={item.id}
                  onPress={() => handleCategoryPress(item.name)}
                  style={[
                    styles.category,
                    {
                      backgroundColor: isSelected
                        ? colors.primary
                        : colors.white,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.name_cate,
                      { color: isSelected ? colors.white : colors.primary },
                    ]}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.productGrid}>
            {loading ? (
              <>
                <View style={{ width: "45%" }}>
                  <ProductCardSkeleton />
                </View>
                <View style={{ width: "45%" }}>
                  <ProductCardSkeleton />
                </View>
              </>
            ) : (
              filteredProducts.map((item) => (
                <View
                  key={item.id}
                  style={{ width: "45%", position: "relative" }}
                >
                  {/* Nếu sản phẩm mới, hiển thị nhãn */}
                  {item.isNew && (
                    <View style={styles.newLabel}>
                      <Text style={styles.newLabelText}>Mới</Text>
                    </View>
                  )}
                  <ProductCard
                    loadingBtnPlus={loadingBtnPlus[item.id]}
                    product={item}
                    onPress={() => handleProductPress(item.id)}
                    onAdd={() => handleAddToCart(item.id)}
                  />
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainContent: {
    // flex: 1,
    backgroundColor: colors.background,
    marginBottom: "5%",
  },
  categoryScroll: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  category: {
    backgroundColor: colors.primary,
    width: 185,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  name_cate: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 10,
    rowGap: 5,
  },
  newLabel: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    zIndex: 1,
    justifyContent: "flex-end",
  },
  newLabelText: {
    color: "white",
    fontSize: fontSizes.sz12,
    fontWeight: "bold",
  },
});
