import yup from "yup";

const userLoginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter your email!")
    .email("Please enter a valid email!"),
  password: yup
    .string()
    .required("Please enter your password!")
    .min(8, "Password must be at least 8 characters!"),
});

export default userLoginSchema;
