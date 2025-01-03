import logoCoffee from "@/assets/images/TheCoffeHouse.png";
import CustomButton from "@components/CustomButton";
import CustomErrorMessage from "@components/CustomErrorMessage";
import CustomInput from "@components/CustomInput";
import { fontSizes, globalStyles } from "@/styles/globalStyles";
import { validationLoginRegister } from "@/utils/validation";
import { Field, Formik } from "formik";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { register } from "@/service/auth";
import Toast from "react-native-toast-message";

const Register = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleSubmit = async (values) => {
    setLoading(true); // Bắt đầu loading
    try {
      const res = await register(values.username, values.password);
      console.log("Response: ", res);
      if (res.success) {
        Toast.show({
          type: "success",
          text1: "Đăng ký thành công",
          text2: "Đăng nhập để tiếp tục!",
        });
        navigation.navigate("Login");
      } else {
        Toast.show({
          type: "error",
          text1: "Đăng ký thất bại",
          text2: res.message,
        });
      }
    } catch (error) {
      console.log("Error file register: ", error);
    } finally {
      setLoading(false); // Kết thúc loading
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
              <Image source={logoCoffee} style={globalStyles.logo} />
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
                  loading={loading}
                  title="Đăng ký"
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
                <TouchableOpacity onPress={() => handleLogin()}>
                  <Text
                    style={[
                      globalStyles.inputText,
                      { fontSize: fontSizes.small, fontWeight: "700" },
                    ]}
                  >
                    Đăng nhập
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

export default Register;

const styles = StyleSheet.create({
  viewLogo: {
    flex: 3 / 7,
  },
  viewInput: {
    flex: 4 / 7,
    alignItems: "center",
  },
});
