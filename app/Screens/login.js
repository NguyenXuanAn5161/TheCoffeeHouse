import { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
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
import validationSchema from "@/utils/validation";
import CustomErrorMessage from "@components/CustomErrorMessage";

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleSubmit = (values) => {
    console.log(values);
    // Logic xử lý đăng nhập tại đây
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
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
            <View style={[globalStyles.centered, { flex: 1 }]}>
              <Image source={logoCoffee} style={globalStyles.logo} />
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              style={[styles.viewInput, { gap }]}
            >
              <Field
                name="username"
                component={CustomInput}
                label="Tài khoản"
                secureTextEntry={false}
              />
              <CustomErrorMessage msg={touched.username && errors.username} />

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

              <CustomButton title="Đăng nhập" onPress={handleSubmit} />

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
  viewInput: {
    marginTop: "30%",
    flex: 2,
    gap: 10,
    alignItems: "center",
  },
});
