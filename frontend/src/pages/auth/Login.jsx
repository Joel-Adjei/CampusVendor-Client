import { BlurFade } from "@/components/ui/blur-fade";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "@/components/input/InputField";
import { Loader2, LockIcon, Mail } from "lucide-react";
import Button from "@/components/ui/custom/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import { images } from "@/assets/assets";
import axios from "@/lib/axios.js";

const commonAuthSchema = {
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
};

const loginValidationSchema = Yup.object().shape(commonAuthSchema);

const Login = () => {
  const navigate = useNavigate();
  const {
    updateLogin,
    updateVendor,
    admins,
    updateName,
    updateRole,
    vendors,
    users,
  } = useAuthStore();

  const handleLogIn = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    try {
      const { email, password } = values;

      // const res = await axios.post("/auth/login", { email, password });
      // console.log("Login response:", res.data);

      // Check in vendors array
      const vendor = vendors.find(
        (v) => v.email === email && v.password === password
      );
      if (vendor) {
        updateLogin(values);
        updateVendor(vendor);
        navigate("/vendor/", { replace: true });
        return;
      }
      // Check in users array
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        updateLogin({ email, password });
        updateName({ name: user.name });
        updateRole({ role: "customer" });
        navigate("/", { replace: true });
        return;
      }

      const admin = admins.find(
        (a) => a.email === email && a.password === password
      );
      if (admin) {
        updateLogin({ email, password });
        updateName({ name: admin.name });
        updateRole({ role: "admin" });
        navigate("/admin/", { replace: true });
        resetForm();
        return;
      }

      toast.error("Invalid email or password");
      // resetForm();
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: handleLogIn,
  });

  return (
    <div className="min-h-[100vh] w-full flex flex-col md:flex-row  bg-gradient-to-br from-blue-700 to-blue-400">
      <section className="relative overflow-hidden h-40 md:min-h-[100vh] w-full md:bg-gradient-to-br md:from-blue-700 md:to-blue-400 md:flex-1/2">
        {/* <div className="absolute -top-20 -right-40 border-50 border-white/20 size-100 rounded-full" /> */}
        <div className="absolute md:hidden bottom-0 -left-10  bg-gradient-to-br from-white/60 to-70% to-transparent size-70 rounded-full" />
        <img
          src={images.img2}
          className="opacity-30 md:opacity-100 absolute -top-30 md:top-0 left-0 w-full h-full object-cover"
        />

        <div className="absolute top-11 left-1/2 transform -translate-x-1/2 md:left-3 md:top-4 z-30 flex gap-3 items-center ">
          <div className="bg-white font-Montserrat size-17 md:size-9 rounded-full"></div>
        </div>
      </section>

      <section className=" bg-gray-50 flex-1 md:flex-1/2 md:h-[100vh] overflow-auto rounded-t-2xl md:rounded-none">
        <BlurFade
          direction="top"
          blur="0"
          delay={0.6}
          duration={1}
          className={
            "flex  justify-center  md:min-h-[100vh] px-8 sm:px-0 md:items-center"
          }
        >
          <div className="w-full  mt-17 font-Montserrat">
            <div className="flex flex-col justify-center mb-6">
              <h1 className="text-4xl mx-auto w-fit font-extrabold text-center">
                <span className="bg-gradient-to-tr from-blue-700 to-blue-400 bg-clip-text text-transparent">
                  Log
                </span>
                <span className="text-yellow-400">in</span>
                <div className="w-17 h-1 mt-2 bg-blue-500" />
              </h1>

              <p className="text-center text-sm text-gray-400 mt-1">
                login to get started with Campus Vendor
              </p>
            </div>

            <form
              onSubmit={loginFormik.handleSubmit}
              className="max-w-md mx-auto space-y-5"
            >
              <InputField
                formik={loginFormik}
                label="Email Address"
                name="email"
                type="email"
                Icon={Mail}
                placeholder="e.g. email@email.com"
                formikInstance={loginFormik}
              />
              <InputField
                formik={loginFormik}
                label="Password"
                Icon={LockIcon}
                name="password"
                type="password"
                placeholder="Enter your password"
                formikInstance={loginFormik}
              />

              {/* Submit Button */}
              <div className="mt-4">
                <Button
                  type="submit"
                  disabled={loginFormik.isSubmitting || !loginFormik.isValid}
                  className={"mx-auto px-8 py-2 mt-3"}
                  isLoading={loginFormik.isSubmitting}
                >
                  {loginFormik.isSubmitting ? "Loging..." : `Login`}
                </Button>
              </div>
            </form>

            <p className="text-center text-sm text-gray-600 mt-3">
              Don't have an account?{" "}
              <NavLink
                to="/auth/signup"
                className="text-blue-600 font-medium hover:underline"
              >
                signup
              </NavLink>
            </p>
          </div>
        </BlurFade>
      </section>
    </div>
  );
};

export default Login;
