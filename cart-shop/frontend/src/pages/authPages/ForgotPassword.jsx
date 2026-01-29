import React from "react";
import { useForm } from "react-hook-form";
import { routePath } from "../../routes/routePath";
import { Mail, LockKeyholeIcon } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import axiosInstance from "../../services/axiosInstance";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  async function handleForgotPassword(data) {
    try {
      let response = await axiosInstance.get(
        `/api/forgot-password?email=${data.email}`,
      );

      if (response.data.status) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Success Popup */}

      {/* Login Card */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-8 text-white">
          {/* <div className="flex items-center justify-center mb-4">
            <div className="bg-white rounded-lg p-3 ">
              <LockKeyholeIcon className="w-8 h-8 text-blue-600" />
            </div>
          </div> */}
          <h1 className="text-3xl font-bold text-center">Forgot Password</h1>
          <p className="text-center text-green-200 mt-2">
            Enter Email to get a Reset Password code on email !
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
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

          {/* Submit Button */}
          <button
            onClick={handleSubmit(handleForgotPassword)}
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
              "send reset link"
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

export default ForgotPassword;
