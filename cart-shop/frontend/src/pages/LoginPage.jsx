import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ShoppingCart,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  KeySquare,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { routePath } from "../routes/routePath";
import axiosInstance from "../services/axiosInstance";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (data) => {
    setApiError("");
    console.log("Login Data:", data);

    try {
      const response = await axiosInstance.post("/api/user/login", {
        email: data.email,
        password: data.password,
      });

      sessionStorage.setItem("isLoggedIn", "cart-shop-logined");
      sessionStorage.setItem("userDetail", JSON.stringify(response.data.data));
      sessionStorage.setItem("accessToken", response.data.accesstoken);
      setShowSuccess(true);
      setTimeout(() => {
        // Redirect or handle successful login

        navigate(routePath.HOME);
      }, 2000);
    } catch (err) {
      toast.error(err.message);
      setApiError("Unable to connect. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-scale-in">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome Back!
              </h2>
              <p className="text-gray-600 mb-4">
                You've successfully logged into Cart-Shop. Get ready for an
                amazing shopping experience!
              </p>
              <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                <div className="h-full bg-linear-to-r from-blue-500 to-purple-600 animate-progress"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Card */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
        {/* Header */}
        <div className="bg-linear-to-br from-indigo-600 to-cyan-600 relative p-8 text-white">
          <div className="flex items-center justify-center ">
            <div className="bg-emerald-400 absolute top-0 right-0 rounded-bl-3xl rounded-tr-3xl  flex items-center justify-center gap-1  shadow-inner shadow-black/80 p-3 ">
              <span className="font-bold capitalize">cart-shop</span>
              <ShoppingCart className="w-8 rotate-12 h-6 text-white" />{" "}
            </div>
          </div>
          <div className="text-3xl flex -translate-x-4 items-center justify-center gap-x-2.5 font-semibold text-center">
            <KeySquare size={34} /> <span>Login</span>
          </div>
          <p className="text-center text-blue-100 mt-2">
            Welcome back! Please login to continue
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm animate-shake">
              {apiError}
            </div>
          )}

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
                }`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              to={routePath.FORGOT_PASSWORD}
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Don't have an account?{" "}
            <Link
              to={routePath.REGISTER}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }

        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-progress {
          animation: progress 2s ease-in-out;
        }
      `}</style>
    </div>
  );
}
