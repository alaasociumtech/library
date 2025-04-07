import * as yup from "yup";
export const SignUpSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  role: yup
    .string()
    .oneOf(["Admin", "Client"], "Select a valid role")
    .required("Role is required"),
  dateOfBirth: yup.date().required("Date of Birth is required"),
  gender: yup
    .string()
    .oneOf(["Male", "Female"], "Select a valid gender")
    .required("Gender is required"),
  description: yup
    .string()
    .max(200, "Description should be within 200 characters"),
  image: yup.mixed().nullable(),
});

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),

  password: yup.string().required("Password is required"),
});
export const BookSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  description: yup.string().required("Description is required"),
});
