import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Vui lòng nhập tài khoản"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu"),
});

export default validationSchema;
