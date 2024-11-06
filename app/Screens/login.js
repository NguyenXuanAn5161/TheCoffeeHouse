import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
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
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

const Login = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const handleRegister = () => {
    navigation.navigate("Register");
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
        <CustomButton title="Đăng nhập" onPress={() => {}} />
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text style={[globalStyles.inputText, { fontSize: fontSizes.small }]}>
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
};

export default Login;

const styles = StyleSheet.create({
  viewInput: {
    marginTop: "30%",
    flex: 2,
    gap: 30,
    alignItems: "center",
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    fontWeight: "400",
    color: "#834637",
  },
  outlineStyle: {
    borderRadius: 15,
  },
  buttonContent: {
    minWidth: "90%",
    height: 50,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
