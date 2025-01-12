import * as yup from "yup";

export const loginScheme = yup.object({
  emailOrUsername: yup
    .string()
    .required("Email or username is required")
    .test("email-or-username", "Must be a valid email or username", (value) => {
      if (!value) return false;
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const isUsername = /^[a-zA-Z0-9_]{3,}$/.test(value);
      return isEmail || isUsername;
    })
    .min(3, "Email or username must be at least 3 characters"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const registerScheme = yup.object({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .test("not-only-numbers", "Username must not contain only numbers", (value) => {
      return value ? !/^\d+$/.test(value) : false;
    })
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

export const forgotPasswordScheme = yup.object({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
});

export const resetPasswordScheme = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});
