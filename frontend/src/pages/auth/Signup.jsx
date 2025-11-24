import { BlurFade } from "@/components/ui/blur-fade";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Button from "@/components/ui/custom/Button";
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
import { images } from "@/assets/assets";
import Modal from "@/components/ui/Modal";
import TermsConditions from "../vendor/TermsConditions";
import { SignupValidationSchema } from "@/lib/validationSchema";
import axios from "@/lib/axios.js";
import { useOtpStore } from "@/store/useOtp";
import { useMutation } from "@tanstack/react-query";

const Signup = () => {
  const [displayTerms, setDisplayTerms] = useState(false);
  const { signUpUser, updateLogin, signUpVendor } = useAuthStore();
  const { setOtpDetails } = useOtpStore();
  const navigate = useNavigate();

  const [currentRole, setCurrentRole] = useState("Customer");

  useEffect(() => {
    setCurrentRole("Customer");
  }, []);

  const handleStudentSubmit = async () => {
    try {
      const { customerName, email, password } = formik.values;
      const { data } = await axios.post("/auth/signUp/student", {
        email,
        password,
        name: customerName,
      });

      setOtpDetails({
        role: "customer",
        name: customerName,
        email: email,
        otpToken: data.token,
        password: password,
      });

      toast.success(
        "OTP sent to your email. Please verify to complete registration."
      );
      navigate("/auth/verify-otp");
    } catch (error) {
      console.error(error);
      toast.error(error?.response.data.message);
    }
  };

  const { mutateAsync: signupVendor ,  } = useMutation({
    mutationFn: async (values) => {
      try {
        const res = await axios.post("/auth/signUp/vendor", {
          name: values.name,
          email: values.email,
          password: values.password,
          entName: values.businessName,
          phone: values.phoneNumber,
          location: values.location,
          description: values.description,
        });
        console.log(res)

        setOtpDetails({
          role: "vendor",
          name: values.name,
          email: values.email,
          otpToken: res.data.token,
          password: values.password,
        });

      navigate("/auth/verify-otp");

      } catch (e) {
        console.log(e);
        toast.error(e?.response.data.message)
      }
    },
  });

  const onVendorSubmit = (e) => {
    e.preventDefault();
    setDisplayTerms(true);
  };

  const handleSignUp = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      if (currentRole === "Customer") {
        await handleStudentSubmit();
        // const { role, email, password } = values;
        // signUpUser({ role, email, password, name: "" });
        // updateLogin({ email, password });

        return;
      }

      if (currentRole === "Vendor") {
        await signupVendor(values)
        // signUpVendor({
        //   ...values,
        //   status: "pending",
        // });
        // toast.success("Registration successful! Await admin approval.");
        // navigate("/auth/note/vendor");
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
      customerName: "",
      password: "",
      confirmPassword: "",
      name: "",
      businessName: "",
      description: "",
      location: "",
      phoneNumber: "",
      termAndConditions: false,
    },
    validationSchema: SignupValidationSchema,
    onSubmit: handleSignUp,
  });

  // Function to handle role change and update Formik state immediately
  const handleRoleChange = (role) => {
    formik.resetForm();
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
      <section className="h-40 relative overflow-hidden md:min-h-[100vh] w-full md:bg-gradient-to-br md:from-blue-700 md:to-blue-400 md:flex-1/2">
        <img
          src={images.img1}
          className="opacity-30 md:opacity-100 absolute -top-30 md:top-0 left-0 w-full h-full object-cover "
        />


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
                    {currentRole === "Customer" ? "shopping" : "selling"}
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
                    currentRole === "Customer"
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
                    currentRole === "Vendor"
                      ? "bg-white text-blue-700 shadow-md"
                      : "text-gray-500 hover:text-blue-600 border-none"
                  }`}
                >
                  Vendor
                </Button>
              </div>

              <form
                onSubmit={
                  currentRole == "Customer"
                    ? formik.handleSubmit
                    : onVendorSubmit
                }
                className="w-full p-7 md:p-2 pt-0 space-y-7"
              >
                {currentRole === "Customer" && (
                  <InputField
                    label="Full Name"
                    name="customerName"
                    type="text"
                    formik={formik}
                    isRequired
                    placeholder={"e.g., 'Abigail Adjei'"}
                    Icon={User2}
                  />
                )}
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
                {currentRole === "Vendor" && (
                  <>
                    <div className="relative flex items-center justify-center w-full mt-6 mb-2 py-3">
                      <div className="w-full h-[1px] bg-gray-300"></div>
                      <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-50 px-3 italic text-gray-500 text-xs">
                        Business Details
                      </span>
                    </div>

                    <InputField
                      label="Seller name"
                      name="name"
                      type="text"
                      formik={formik}
                      isRequired
                      placeholder={"e.g., 'Abigail Adjei"}
                      Icon={User2}
                    />
                    <InputField
                      Icon={LucideShoppingBasket}
                      label="Business Name"
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
                  </>
                )}

                <div className="relative flex items-center justify-center w-full mt-6 mb-2 py-3">
                  <div className="w-full h-[1px] bg-gray-300"></div>
                  <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-50 px-3 italic text-gray-500 text-xs">
                    Set Password
                  </span>
                </div>

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

                {currentRole === "Customer" && (
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="termAndConditions"
                      name="termAndConditions"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                      onChange={(option) => {
                        formik.setFieldValue(
                          "termAndConditions",
                          option.target.checked
                        );
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.termAndConditions}
                      // checked={formik.values.termAndConditions}
                    />
                    <div className="flex-1">
                      <label
                        htmlFor="termAndConditions"
                        className="block text-sm text-gray-900 cursor-pointer"
                      >
                        I have read and agree to the{" "}
                        <a className="text-blue-600 hover:underline cursor-pointer">
                          Terms and Conditions
                        </a>
                        .
                      </label>
                      {formik.touched.termAndConditions &&
                        formik.errors.termAndConditions && (
                          <div className="text-red-500 text-xs mt-1">
                            {formik.errors.termAndConditions}
                          </div>
                        )}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-4">
                  <Button
                    type="submit"
                    disabled={formik.isSubmitting || !formik.isValid}
                    className={"mx-auto mt-3"}
                    isLoading={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "" : `Register as ${currentRole}`}
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

      <Modal display={displayTerms}>
        <TermsConditions
          onAccept={formik.handleSubmit}
          onCancel={() => setDisplayTerms(false)}
        />
      </Modal>
    </div>
  );
};

export default Signup;
