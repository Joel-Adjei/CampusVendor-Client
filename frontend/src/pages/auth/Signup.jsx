import { BlurFade } from "@/components/ui/blur-fade";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { create } from "zustand";
import Button from "@/components/ui/Button";
import InputField from "@/components/input/InputField";
import {
  Loader2,
  LockIcon,
  LucideShoppingBasket,
  Mail,
  Phone,
  ShoppingBasket,
  User2,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import CustomSelect from "@/components/input/Select";


const vendorCategories = [
  "Food",
  "Stationery",
  "Grooming (Haircuts, Braiding)",
  "Thrift Clothing",
  "Mobile Money Services",
  "Gadgets/Tech",
  "Other Products/Services",
];

const catergoryOptions = [
  { value: "Food", label: "Food" },
  { value: "Stationery", label: "Stationery" },
  { value: "Grooming", label: "Grooming (Haircuts, Braiding)" },
  { value: "Thrift-Clothing", label: "Thrift Clothing" },
  { value: "Mobile Money", label: "Mobile Money Services" },
  { value: "Gadgets/Tech", label: "Gadgets/Tech" },
  { value: "Others", label: "Other Products/Services" },
]

// --- 3. Yup Validation Schema ---
const validationSchema = Yup.object().shape({
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
    // Basic regex for digits only, and checking length
    then: (schema) =>
      schema
        .matches(/^[0-9]{9,15}$/, "Must be a valid phone number")
        .required("Phone Number is required for Vendors"),
    otherwise: (schema) => schema.notRequired(),
  }),
  category: Yup.string().when("role", {
    is: "Vendor",
    then: (schema) =>
      schema
        .oneOf(vendorCategories, "Must select a category")
        .required("Category is required for Vendors"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const Signup = () => {
  const { login, user } = useAuthStore();
  const [successMessage, setSuccessMessage] = useState("");
  const {signUpUser, updateLogin , signUpVendor} = useAuthStore();
  const navigate = useNavigate()

  // Initial role is set to Customer by default
  const [currentRole, setCurrentRole] = useState("Customer");

  const handleSignUp = (values ,  { setSubmitting, resetForm }) => {
    setSubmitting(true);

    try {
      if(values.role === "Customer"){
        const {role , email , password} = values
        signUpUser({role , email , password , name : ""} )
        updateLogin({email , password})
        toast.success("Registration successful!")
        navigate("/")

        return
      }

      if(values.role === "Vendor"){
        const {role , email , password , businessName , phoneNumber , category} = values
        signUpVendor({role , email , password , businessName , phoneNumber , category , vendaorName : "", status: "Pending Approval"})
        updateLogin({email , password})
        toast.success("Registration successful! Await admin approval.")
        navigate("/")
        return
      }
    } catch (error) {
      throw new Error(error)
    }finally{}
  }

  const formik = useFormik({
    initialValues: {
      role: "Customer", // Initial value set to Customer
      email: "",
      password: "",
      confirmPassword: "",
      businessName: "", // Vendor field
      phoneNumber: "", // Vendor field
      category: "", // Vendor field
    },
    validationSchema: validationSchema,
    onSubmit: handleSignUp,
  });

  // Function to handle role change and update Formik state immediately
  const handleRoleChange = (role) => {
    setCurrentRole(role);
    formik.setFieldValue("role", role);
    // Optionally, reset role-specific fields when switching
    formik.setFieldValue("studentId", "");
    formik.setFieldValue("businessName", "");
    formik.setFieldValue("phoneNumber", "");
    formik.setFieldValue("category", "");
  };

  return (
    <div className="min-h-[100vh] w-full flex flex-col md:flex-row  bg-gradient-to-br from-blue-700 to-blue-400">
      <section className="h-40 md:min-h-[100vh] w-full md:bg-gradient-to-br md:from-blue-700 md:to-blue-400 md:flex-3/4">
        dfd
      </section>

      <section className=" bg-gray-50 flex-1 md:flex-1/2 md:h-[100vh] overflow-auto rounded-t-2xl md:rounded-none">
        <BlurFade direction="top" blur="0" delay={0.6} duration={1}>
          <div className="md:min-h-screen h-full flex items-center justify-center p-4 font-inter overflow-auto">

            <div className="w-full max-w-lg p-14">
              <div className="flex flex-col justify-center mb-6">
                <h1 className="text-4xl mx-auto w-fit font-extrabold text-center">
                  <span className="bg-gradient-to-tr from-blue-700 to-blue-400 bg-clip-text text-transparent">
                    Sign
                  </span>
                  <span className="text-yellow-400">up</span>
                  <div className="w-17 h-1 mt-2 bg-blue-500" />
                </h1>

                <p className="text-center text-sm text-gray-600 mt-3">
                  Create an account to start{" "}
                  <span className="font-semibold">
                    {currentRole === "Customer" ? "shopping" : "selling"}
                  </span>
                </p>
              </div>

              {/* Role Selection Tabs */}
              <div className=" w-fit mx-auto flex justify-between bg-gray-100 rounded-full p-2 gap- mb-6 shadow-inner overflow-auto">
                <Button
                  type="button"
                  variant="outline"
                  Icon={User2}
                  onClick={() => {
                    handleRoleChange("Customer");
                    formik.resetForm();
                  }}
                  className={`outline-none ${
                    currentRole === "Customer"
                      ? "bg-white text-blue-700 shadow-md"
                      : "text-gray-500 hover:text-blue-600 border-none"
                  }`}
                >
                  Student
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  Icon={ShoppingBasket}
                  onClick={() => {
                    handleRoleChange("Vendor");
                    formik.resetForm();
                  }}
                  className={`outline-none ${
                    currentRole === "Vendor"
                      ? "bg-white text-blue-700 shadow-md"
                      : "text-gray-500 hover:text-blue-600 border-none"
                  }`}
                >
                  Vendor
                </Button>
              </div>

              {/* Success/Error Message Display */}
              {successMessage && (
                <div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-4"
                  role="alert"
                >
                  <p className="font-bold">Success!</p>
                  <p className="text-sm">{successMessage}</p>
                </div>
              )}

              {/* Current User Display (for testing Zustand store) */}
              {user && (
                <div className="bg-purple-100 border border-purple-400 text-purple-700 px-4 py-3 rounded-xl mb-4 text-sm">
                  <p className="font-semibold mb-1">State Data (Zustand):</p>
                  <pre className="overflow-x-auto p-2 bg-purple-50 rounded text-xs whitespace-pre-wrap">
                    {JSON.stringify(user, null, 2)}
                  </pre>
                </div>
              )}

              <form onSubmit={formik.handleSubmit} className="space-y-7">
                {/* <input type="hidden" name="role" value={formik.values.role} /> */}

                <InputField
                  label="Email"
                  Icon={Mail}
                  name="email"
                  type="email"
                  placeholder="e.g., yourname@ug.edu.gh"
                  isRequired
                  formik={formik}
                />
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  Icon={LockIcon}
                  placeholder="enter a password"
                  isRequired
                  formik={formik}
                />
                <InputField
                  Icon={LockIcon}
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  isRequired
                  formik={formik}
                />

                {/* Vendor Specific Fields */}
                {currentRole === "Vendor" && (
                  <>
                    <InputField
                      Icon={LucideShoppingBasket}
                      label="Business/Seller Name"
                      name="businessName"
                      type="text"
                      placeholder="e.g., 'Legon Thrift' or 'Mama B's Kitchen'"
                      isRequired
                      formik={formik}
                    />
                    <InputField
                      label="Phone Number"
                      name="phoneNumber"
                      Icon={Phone}
                      type="tel"
                      placeholder="e.g., 055xxxxxxx"
                      isRequired
                      formik={formik}
                    />

                    <div>
                      <CustomSelect 
                        Icon={LucideShoppingBasket}
                        label="Main Product Category"
                        name="category"
                        options={catergoryOptions}
                        value={formik.values.category}
                        onChange={(option) =>
                          formik.setFieldValue(
                            "category",
                            option ? option.value : ""
                          )
                        }
                        disabled={formik.isSubmitting}
                      />
                    </div>

                  </>
                )}

                {/* Submit Button */}
                <div className="mt-4">
                  <Button
                    type="submit"
                    disabled={formik.isSubmitting || !formik.isValid}
                    className={"mx-auto mt-3"}
                    isLoading={formik.isSubmitting}
                  >
                    {formik.isSubmitting
                      ? ""
                      : `Register as ${currentRole}`}
                  </Button>
                </div>
              </form>

              <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?{" "}
                <NavLink to="/auth/login" className="text-blue-600 font-medium hover:underline">
                  login
                </NavLink>
              </p>
            </div>
          </div>
        </BlurFade>
      </section>
    </div>
  );
};

export default Signup;
