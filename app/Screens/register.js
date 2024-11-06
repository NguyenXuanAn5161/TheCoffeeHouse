import logoCoffee from "@/assets/images/TheCoffeHouse.png";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { fontSizes, globalStyles } from "@/styles/globalStyles";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Register = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.centered, { flex: 1 }]}>
        <Image source={logoCoffee} style={globalStyles.logo} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.viewInput}
      >
        <CustomInput label="Tài khoản" secureTextEntry={false} />
        <CustomInput
          label="Mật khẩu"
          secureTextEntry={passwordVisible}
          rightIcon={{
            icon: passwordVisible ? "eye" : "eye-off",
            onPress: () => setPasswordVisible(!passwordVisible),
          }}
        />
        <CustomButton title={"Đăng ký"} onPress={{}} />

        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text style={[globalStyles.inputText, { fontSize: fontSizes.small }]}>
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
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2E2E2",
  },
  viewLogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginTop: "10%",
    height: "90%",
    width: "90%",
    resizeMode: "contain",
  },
  viewInput: {
    marginTop: "30%",
    flex: 2,
    gap: 30,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: "90%",
    height: 50,
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  txtInput: { fontSize: 20, fontWeight: "400", color: "#834637" },
  txtBtn: {
    fontSize: 26,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#ffffff",
  },
  viewBtn: {
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  btn: {
    backgroundColor: "#834637",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: "90%",
    height: 50,
    borderRadius: 50,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    color: "#834637",
  },
});
