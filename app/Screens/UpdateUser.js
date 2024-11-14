import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Formik, Field } from "formik";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, globalStyles } from "@/styles/globalStyles";
import CustomInput from "@components/CustomInput";
import CustomButton from "@components/CustomButton";
import CustomErrorMessage from "@components/CustomErrorMessage";
import Toast from "react-native-toast-message";
import { validationUpdateUser } from "@/utils/validation";
import { updateUser } from "@/service/auth";

const UpdateUser = ({ navigation, route }) => {
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = route.params?.user;

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar || null);
    }
  }, [user]);

  // Hàm chọn ảnh đại diện
  const pickImage = async () => {
    Toast.show({
      type: "info",
      text1: "Thông báo",
      text2: "Tính năng sẽ được sớm cập nhật",
    });
    return;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  // Hàm lưu thông tin người dùng
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const updatedUser = {
        ...user,
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        address: values.address,
        avatar,
      };

      const res = await updateUser(
        user.id,
        values.fullName,
        values.phoneNumber,
        values.address
      );

      if (res.success) {
        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
        Toast.show({
          type: "success",
          text1: "Cập nhật thành công",
          text2: res.message,
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: "error",
          text1: "Cập nhật thất bại",
          text2: res.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Cập nhật thất bại",
        text2: "Vui lòng thử lại sau",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        fullName: user?.fullName || "",
        phoneNumber: user?.phoneNumber || "",
        address: user?.address || "",
      }}
      validationSchema={validationUpdateUser}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, errors, touched }) => {
        const gap =
          (touched.username && errors.username) ||
          (touched.password && errors.password)
            ? 10
            : 30;
        return (
          <View style={globalStyles.container}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              style={[styles.formContainer, { gap }]}
            >
              {/* Avatar */}
              <Pressable style={styles.avatarContainer} onPress={pickImage}>
                {avatar ? (
                  <Image source={{ uri: avatar }} style={styles.avatar} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={{ color: colors.primary }}>
                      Chọn ảnh đại diện
                    </Text>
                  </View>
                )}
              </Pressable>
              {/* Full Name */}
              <View style={{ width: "90%" }}>
                <Field
                  name="fullName"
                  component={CustomInput}
                  label="Họ tên"
                  secureTextEntry={false}
                />
                <CustomErrorMessage msg={touched.fullName && errors.fullName} />
              </View>

              {/* Phone Number */}
              <View style={{ width: "90%" }}>
                <Field
                  name="phoneNumber"
                  component={CustomInput}
                  label="Số điện thoại"
                  keyboardType="phone-pad"
                />
                <CustomErrorMessage
                  msg={touched.phoneNumber && errors.phoneNumber}
                />
              </View>

              {/* Address */}
              <View style={{ width: "90%" }}>
                <Field
                  name="address"
                  component={CustomInput}
                  label="Địa chỉ"
                  secureTextEntry={false}
                />
                <CustomErrorMessage msg={touched.address && errors.address} />
              </View>

              {/* Save Button */}
              <View style={{ width: "90%" }}>
                <CustomButton
                  loading={loading}
                  title="Lưu thông tin"
                  onPress={handleSubmit}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        );
      }}
    </Formik>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
  },
  avatarContainer: {
    alignSelf: "center",
    marginVertical: 20,
    width: 120,
    height: 120,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 90,
  },
  avatarPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
