import React, { useState, useEffect, useRef } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import Button from "@/components/ui/custom/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Shield,
  Clock,
  Mail,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Smartphone,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useOtpStore } from "@/store/useOtp";
import axios from "@/lib/axios.js";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { email, role, password, clearOtpDetails, otpToken } = useOtpStore();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verificationStep, setVerificationStep] = useState("input"); // 'input', 'verifying', 'success', 'error'
  const inputRefs = useRef([]);
  const [isLoginningIn, setIsLoggingIn] = useState(false);

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, "$1***$3");

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });
      toast.success("Logged in successfully!");
      clearOtpDetails();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      return;
    } finally {
      setIsLoggingIn(false);
    }
  };
  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    setVerificationStep("verifying");

    // Simulate API call
    try {
      if (role === "customer") {
        const { data } = await axios.post(
          "http://localhost:3000/api/auth/verify-otp/student",
          {
            otp: otpString,
            token: otpToken,
          }
        );
      } else {
        const { data } = await axios.post(
          "http://localhost:3000/api/auth/verify-otp/vendor",
          {
            otp: otpString,
            token: otpToken,
          }
        );
      }

      setVerificationStep("success");
      toast.success("OTP verified successfully!");
      setTimeout(() => {
        handleLogin();
      }, 2000);
    } catch (error) {
      setVerificationStep("error");

      if (error.response?.status !== 401) {
        setTimeout(() => {
          setVerificationStep("input");
        }, 2000);
      }

      toast.error(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
      return;
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);

    // Simulate resend API call
    setTimeout(() => {
      setIsResending(false);
      setTimeLeft(300);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      toast.success("New OTP sent to your email!");
      inputRefs.current[0]?.focus();
    }, 1500);
  };

  const renderVerificationStep = () => {
    switch (verificationStep) {
      case "verifying":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center"
            >
              <Shield className="text-white" size={32} />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Verifying OTP...
            </h3>
            <p className="text-gray-600">
              Please wait while we verify your code
            </p>
          </motion.div>
        );

      case "success":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center"
            >
              <CheckCircle className="text-white" size={32} />
            </motion.div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              Verification Successful!
            </h3>
            <p className="text-gray-600">
              Redirecting you to your dashboard...
            </p>
          </motion.div>
        );

      case "error":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ shake: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center"
            >
              <AlertCircle className="text-white" size={32} />
            </motion.div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              Verification Failed
            </h3>
            <p className="text-gray-600">The OTP you entered is incorrect</p>
          </motion.div>
        );

      default:
        return (
          <div className="space-y-6">
            {/* OTP Input Fields */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <motion.input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  whileFocus={{ scale: 1.05 }}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white"
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Clock size={16} />
              <span>Code expires in {formatTime(timeLeft)}</span>
            </div>

            {/* Verify Button */}
            <Button
              onClick={handleVerifyOtp}
              disabled={otp.join("").length !== 6}
              className="mx-auto mt-6"
            >
              Verify OTP
            </Button>

            {/* Resend Section */}
            <div className="text-center">
              {canResend ? (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className="text-blue-600 font-medium hover:underline flex items-center gap-2 mx-auto"
                >
                  {isResending ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw size={16} />
                      Resend OTP
                    </>
                  )}
                </motion.button>
              ) : (
                <p className="text-gray-500 text-sm">
                  Didn't receive the code? You can resend in{" "}
                  {formatTime(timeLeft)}
                </p>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-[100vh] w-full flex flex-col md:flex-row bg-gradient-to-br from-blue-700 to-blue-400">
      {isLoginningIn && <LoginningIn />}

      <section className="bg-gray-50 flex-1 md:flex-1/2 md:h-[100vh] overflow-auto rounded-t-2xl md:rounded-none">
        <BlurFade direction="top" blur="0" delay={0.6} duration={1}>
          <div className="w-full p-7 lg:px-14 font-Montserrat">
            {/* Back Button */}
            <NavLink
              to="/auth/signup"
              replace
              onClick={clearOtpDetails}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Signup</span>
            </NavLink>

            {/* Header */}
            <div className="flex flex-col justify-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl"
              >
                <Smartphone size={32} />
              </motion.div>

              <h1 className="text-4xl mx-auto w-fit font-extrabold text-center">
                <span className="bg-gradient-to-tr from-blue-700 to-blue-400 bg-clip-text text-transparent">
                  Verify
                </span>
                <span className="text-yellow-400"> OTP</span>
                <div className="w-20 h-1 mt-2 bg-blue-500 mx-auto" />
              </h1>

              <div className="text-center mt-4">
                <p className="text-gray-600 text-sm mb-2">
                  We've sent a 6-digit verification code to
                </p>
                <div className="flex items-center justify-center gap-2 text-blue-600 font-medium">
                  <Mail size={16} />
                  <span>{maskedEmail}</span>
                </div>
              </div>
            </div>

            {/* OTP Verification Content */}
            <div className="max-w-md mx-auto px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={verificationStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderVerificationStep()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Help Text */}
            {verificationStep === "input" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle
                    className="text-blue-500 flex-shrink-0 mt-0.5"
                    size={20}
                  />
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">
                      Having trouble?
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Check your email inbox and spam folder</li>
                      <li>• Make sure you entered the correct email address</li>
                      <li>• The code expires in 5 minutes</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </BlurFade>
      </section>
    </div>
  );
};

export default VerifyOtp;

const LoginningIn = () => (
  <div className="absolute min-h-[100vh] w-full flex flex-col items-center md:justify-center md:flex-row bg-black/30 backdrop-blur-md top-0 left-0 z-50 p-4">
    <div className="bg-white max-w-lg font-Montserrat text-center p-6 rounded-lg px-6 shadow-lg border-blue-400 border">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center animate-spin">
        <Loader2 className="animate-spin text-yellow-200" size={45} />
      </div>
      <h3 className="text-xl font-bold italic text-blue-500 ">Logging In...</h3>
      <p className="text-gray-500">Please wait while we log you in</p>
    </div>
  </div>
);
