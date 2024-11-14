import { useState } from "react";
import { Formik, Field } from "formik";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import logoCoffee from "@/assets/images/TheCoffeHouse.png";
import { fontSizes, globalStyles } from "@/styles/globalStyles";
import CustomInput from "@components/CustomInput";
import CustomButton from "@components/CustomButton";
import { validationLoginRegister } from "@/utils/validation";
import CustomErrorMessage from "@components/CustomErrorMessage";
import { login } from "@/service/auth";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [loadding, setLoadding] = useState(false);

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleSubmit = async (values) => {
    setLoadding(true);
    try {
      const res = await login(values.username, values.password);
      console.log("res login: ", res);
      if (res.success) {
        // lưu vào storage
        await AsyncStorage.setItem("user", JSON.stringify(res.data));

        Toast.show({
          type: "success",
          text1: "Đăng nhập thành công",
          text2: "Chào mừng bạn đến với Coffee",
        });
        navigation.navigate("BottomTab");
      } else {
        Toast.show({
          type: "error",
          text1: "Đăng nhập thất bại",
          text2: res.message,
        });
      }
    } catch (error) {
      console.log("Error file login: ", error);
    } finally {
      setLoadding(false);
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationLoginRegister}
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
            <View style={[globalStyles.centered, styles.viewLogo]}>
              <Image source={logoCoffee} style={[globalStyles.logo]} />
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              style={[styles.viewInput, { gap }]}
            >
              <View style={{ width: "90%" }}>
                <Field
                  name="username"
                  component={CustomInput}
                  label="Tài khoản"
                  secureTextEntry={false}
                />
                <CustomErrorMessage msg={touched.username && errors.username} />
              </View>

              <View style={{ width: "90%" }}>
                <Field
                  name="password"
                  component={CustomInput}
                  label="Mật khẩu"
                  secureTextEntry={passwordVisible}
                  rightIcon={{
                    icon: passwordVisible ? "eye" : "eye-off",
                    onPress: () => setPasswordVisible(!passwordVisible),
                  }}
                />
                <CustomErrorMessage msg={touched.password && errors.password} />
              </View>

              <View style={{ width: "90%" }}>
                <CustomButton
                  loading={loadding}
                  title="Đăng nhập"
                  onPress={() => handleSubmit()}
                />
              </View>
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <Text
                  style={[
                    globalStyles.inputText,
                    { fontSize: fontSizes.small },
                  ]}
                >
                  Bạn chưa có tài khoản?
                </Text>
                <TouchableOpacity onPress={handleRegister}>
                  <Text
                    style={[
                      globalStyles.inputText,
                      { fontSize: fontSizes.small, fontWeight: "700" },
                    ]}
                  >
                    Đăng ký
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        );
      }}
    </Formik>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  viewLogo: {
    flex: 3 / 7,
  },
  viewInput: {
    flex: 4 / 7,
    alignItems: "center",
  },
});
