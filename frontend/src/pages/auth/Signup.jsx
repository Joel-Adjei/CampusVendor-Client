import { BlurFade } from "@/components/ui/blur-fade";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@/components/ui/Button";
import InputField from "@/components/input/InputField";
import {
  Loader2,
  LockIcon,
  LucideShoppingBasket,
  Mail,
  Map,
  Phone,
  ShoppingBasket,
  User2,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import CustomSelect from "@/components/input/Select";
import { images, videos } from "@/assets/assets";
import Modal from "@/components/ui/Modal";
import TermsConditions from "../vendor/TermsConditions";


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
  })
});

const Signup = () => {
  const { login, user } = useAuthStore();
  const [successMessage, setSuccessMessage] = useState("");
  const [displayTerms, setDisplayTerms] = useState(false);
  const { signUpUser, updateLogin, signUpVendor } = useAuthStore();
  const navigate = useNavigate();
  const currentRole = useRef("Customer");
  const setCurrentRole = (role) => {
    currentRole.current = role;
  }

  const onVendorSubmit = (e) => {
    e.preventDefault();
    setDisplayTerms(true);
  }

  const handleSignUp = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    try {
      if (currentRole.current === "Customer") {
        const { role, email, password } = values;
        signUpUser({ role, email, password, name: "" });
        updateLogin({ email, password });
        toast.success("Registration successful!");
        navigate("/");

        return;
      }

      if (currentRole.current === "Vendor") {
        signUpVendor({
          ...values,
          status: "pending",
        });
        toast.success("Registration successful! Await admin approval.");
        navigate("/auth/note/vendor");
        return;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      role: currentRole,
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      businessName: "",
      description: "",
      location: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSignUp,
  });

  // Function to handle role change and update Formik state immediately
  const handleRoleChange = (role) => {
    formik.resetForm()
    setCurrentRole(role);
    formik.setValues({
      role: role,
      email: "",
      password: "",
      confirmPassword: "",
      businessName: "",
      description: "",
      location: "",
      phoneNumber: "",
      category: "",
    });
    console.log("Role changed to:", formik.values.role);
  };

  return (
    <div className="min-h-[100vh] w-full flex flex-col md:flex-row  bg-gradient-to-br from-blue-700 to-blue-400">
      <section className="h-40 relative overflow-hidden md:min-h-[100vh] w-full md:bg-gradient-to-br md:from-blue-700 md:to-blue-400 md:flex-3/4">
        <img src={images.img1} className="opacity-30 absolute -top-30 md:hidden " />

        <video
          className="absolute hidden md:block top-0 left-0 w-full h-full object-cover"
          src={videos.vid1}
          autoPlay
          loop
          muted
        ></video>

        <div className="absolute top-11 left-1/2 transform -translate-x-1/2 md:left-3 md:top-4 z-30 flex gap-3 items-center ">
          <div className="bg-white font-Montserrat size-17 md:size-9 rounded-full"></div>
        </div>
      </section>

      <section className=" bg-gray-50 font-Montserrat flex-1 md:flex-1/2 md:h-[100vh] overflow-auto rounded-t-2xl md:rounded-none">
        <BlurFade direction="top" blur="0" delay={0.6} duration={1}>
          <div className="md:min-h-screen h-full flex items-center justify-center p-4 font-inter overflow-auto">
            <div className="w-full mt-7 sm:px-2 lg:px-11 max-w-lg ">
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
                    {currentRole.current === "Customer" ? "shopping" : "selling"}
                  </span>
                </p>
              </div>

              {/* Role Selection Tabs */}
              <div className=" w-full mx-auto flex justify-between bg-gray-100 rounded-full p-2 gap- mb-6 shadow-inner overflow-auto">
                <Button
                  type="button"
                  variant="outline"
                  Icon={User2}
                  onClick={() => handleRoleChange("Customer")}
                  className={`outline-none ${
                    currentRole.current === "Customer"
                      ? "bg-white text-blue-700 shadow-md"
                      : "text-gray-500 hover:text-blue-600 border-none"
                  }`}
                >
                  Customer
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  Icon={ShoppingBasket}
                  onClick={() => handleRoleChange("Vendor")}
                  className={`outline-none ${
                    currentRole.current === "Vendor"
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

              <form
                onSubmit={ 
                  currentRole.current == "Customer" ? formik.handleSubmit
                  : onVendorSubmit
                }
                className="w-full p-7 md:p-2 pt-0 space-y-7"
              >
                <InputField
                  label="Email"
                  Icon={Mail}
                  name="email"
                  type="email"
                  placeholder="e.g., yourname@ug.edu.gh"
                  isRequired
                  formik={formik}
                />

                {/* Vendor Specific Fields */}
                {currentRole.current === "Vendor" && (
                  <>
                  
                  <div className="relative flex items-center justify-center w-full mt-6 mb-2 py-3">
                      <div className="w-full h-[1px] bg-gray-300"></div>
                      <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-50 px-3 italic text-gray-500 text-xs">
                        Business Details
                      </span>
                    </div>

                    <InputField
                      label="Name"
                      name="name"
                      type="text"
                      formik={formik}
                      isRequired
                      placeholder={"e.g., 'Abigail Adjei"}
                      Icon={User2}
                    />
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
                      label="Description"
                      name="description"
                      Icon={User2}
                      type="text"
                      placeholder="Briefly describe your business (max 200 characters)"
                      isRequired
                      formik={formik}
                      as="textarea"
                    />

                    <InputField
                      label="Location"
                      name="location"
                      Icon={Map}
                      type="text"
                      placeholder="e.g., Near Legon Hall or Opposite UGCS"
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

                    <div className="relative flex items-center justify-center w-full mt-6 mb-2 py-3">
                      <div className="w-full h-[1px] bg-gray-300"></div>
                      <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-50 px-3 italic text-gray-500 text-xs">
                        Set Password
                      </span>
                    </div>
                  </>
                )}

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

                {/* Submit Button */}
                <div className="mt-4">
                  <Button
                    type="submit"
                    disabled={formik.isSubmitting || !formik.isValid}
                    className={"mx-auto mt-3"}
                    isLoading={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "" : `Register as ${currentRole.current}`}
                  </Button>
                </div>
              </form>

              <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?{" "}
                <NavLink
                  to="/auth/login"
                  className="text-blue-600 font-medium hover:underline"
                >
                  login
                </NavLink>
              </p>
            </div>
          </div>
        </BlurFade>
      </section>

      <Modal
        display={displayTerms}
      >
        <TermsConditions onAccept={formik.handleSubmit} onCancel={()=> setDisplayTerms(false)} />
      </Modal>
    </div>
  );
};

export default Signup;
