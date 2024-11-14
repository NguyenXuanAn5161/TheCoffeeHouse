import * as Yup from "yup";

export const validationLoginRegister = Yup.object().shape({
  username: Yup.string().required("Vui lòng nhập tài khoản"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu"),
});

export const validationUpdateUser = Yup.object().shape({
  fullName: Yup.string().required("Vui lòng nhập họ tên"),
  phoneNumber: Yup.string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^\d+$/, "Số điện thoại không hợp lệ")
    .min(10, "Số điện thoại phải có ít nhất 10 số"),
  address: Yup.string().required("Vui lòng nhập địa chỉ"),
});
