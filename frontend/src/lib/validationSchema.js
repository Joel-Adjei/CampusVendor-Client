import * as Yup from "yup"

export const vendorProfileSetupValidation = Yup.object().shape({
    name: Yup.string().required("Your full name is required"),
    description: Yup.string().required().label("Decription"),
    products: Yup.string()
})

export const SignupValidationSchema = Yup.object().shape({
  role: Yup.string().oneOf(["Customer", "Vendor"]).required("Role is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirmation is required"),

  // --- Vendor-specific fields (Requires Business Name, Phone, and Category) ---
  businessName: Yup.string().when("role", {
    is: "Vendor",
    then: (schema) => schema.required("Business Name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  phoneNumber: Yup.string().when("role", {
    is: "Vendor",
    then: (schema) =>
      schema
        .matches(/^[0-9]{9,15}$/, "Must be a valid phone number")
        .required("Phone Number is required for"),
  }),
  description: Yup.string().when("role", {
    is: "Vendor",
    then: (schema) =>
      schema
        .max(200, "Description can't exceed 200 characters")
        .required("Description is required for Vendors"),
    otherwise: (schema) => schema.notRequired(),
  }),
  location: Yup.string().when("role", {
    is: "Vendor",
    then: (schema) => schema.required("Location is required for Vendors"),
    otherwise: (schema) => schema.notRequired(),
  }),
  name: Yup.string().when("role", {
    is: "Vendor",
    then: (schema) => schema.required("Name is required for Vendors"),
    otherwise: (schema) => schema.notRequired(),
  }),
  termAndConditions: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ).when("role", {
    is: "Customer",
    then: (schema) => schema.required("You must accept the terms and conditions to proceed"),
    otherwise: (schema) => schema.notRequired(),
  }),
  customerName: Yup.string().when("role", {
    is: "Customer",
    then: (schema) => schema.required("Name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});