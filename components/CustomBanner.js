import { colors } from "@/styles/globalStyles";
import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Swiper from "react-native-swiper";

export default function CustomBanner() {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        autoplay={true}
        dotColor="white"
        activeDotColor={colors.primary}
      >
        <View style={styles.slide}>
          <Image
            source={require("@/assets/images/banner1.png")}
            style={styles.img_banner}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("@/assets/images/banner2.png")}
            style={styles.img_banner}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require("@/assets/images/banner3.png")}
            style={styles.img_banner}
          />
        </View>
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  wrapper: {
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img_banner: {
    width: "95%",
    height: "95%",
    resizeMode: "contain",
    borderRadius: 10,
  },
});
