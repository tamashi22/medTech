import * as yup from "yup";
export const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Введенный email недействителен")
    .required("Это поле обязательное"),
  password: yup
    .string("Enter your password")
    .min(8, "Пароль должен быть не меньше 8 символов")
    .required("Это поле обязательное"),
});

export const validationEmail = yup.object({
  email: yup
    .string("Enter your email")
    .email("Введенный email недействителен")
    .required("Это поле обязательное"),
});

export const validationCode = yup.object({
  code: yup
    .string("Enter your password")
    .required("Это поле обязательное")
    .min(6, "Код не меньше 6 символов"),
});
export const validationPasswords = yup.object({
  password: yup
    .string("Enter your password")
    .min(8, "Пароль должен быть не меньше 8 символов")
    .required("Это поле обязательное"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли не совпадают")
    .required("Подтвердите пароль"),
});
