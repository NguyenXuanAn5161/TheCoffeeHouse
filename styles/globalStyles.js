import { StyleSheet } from "react-native";

// Các biến chung
const colors = {
  primary: "#834637",
  background: "#E2E2E2",
  backgroundGrey: "#D9D9D9",
  text: "#000000",
  textScondary: "#555",
  white: "#FFFFFF",
  cartItemCard: "#F1dAdA",
  pinkLight: "#F8EAEA",
  danger: "red",
  greyBold: "#9D9696",
  lightGrey: "#d3d3d3",
};

const fontSizes = {
  sz12: 12,
  sz14: 14,
  sz15: 15,
  sz16: 16,
  small: 17,
  sz18: 18,
  medium: 20,
  large: 26,
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  logo: {
    height: "80%",
    width: "80%",
    resizeMode: "contain",
  },
  button: {
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: fontSizes.large,
    fontWeight: "700",
    textTransform: "uppercase",
    color: colors.white,
  },
  input: {
    backgroundColor: colors.white,
    height: 50,
    borderRadius: 50,
    paddingHorizontal: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  inputText: {
    fontSize: fontSizes.medium,
    color: colors.primary,
    fontWeight: "400",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
});

export { globalStyles, colors, fontSizes };
