import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";
import { Link } from "react-router";
import { routePath } from "../routes/routePath";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
  });

  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (data) => {
    setApiError("");
    try {
      const payload = {
        name: data.name.trim().toLowerCase(),
        email: data.email.trim().toLowerCase(),
        password: data.password.trim(),
        role: data.role,
        contactno: undefined,
        address: [
          {
            houseNo: "",
            street: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
          },
        ],
      };

      const res = await fetch("http://localhost:8080/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Registration failed");
      }
      setSuccess(true);
      reset();
    } catch (err) {
      setApiError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-3xl border border-blue-100 p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md">
              <ShieldCheck className="text-white" />
            </div>
            <h1 className="mt-3 text-2xl font-semibold text-blue-800 text-center">
              Create your account
            </h1>
            <p className="text-sm text-slate-500 mt-1 text-center">
              Join us to start shopping effortlessly
            </p>
          </div>

          {apiError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="hidden" value="user" {...register("role")} />

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
                  size={18}
                />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-blue-200 bg-blue-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
                  size={18}
                />
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-blue-200 bg-blue-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="john@example.com"
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
                  size={18}
                />
                <input
                  type="password"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-blue-200 bg-blue-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl shadow-sm transition-colors disabled:opacity-60 mt-2"
            >
              {isSubmitting ? "Creating account..." : "Sign up"}
            </button>

            <p className="text-center text-xs text-slate-500 mt-2">
              Already have an account?{" "}
              <Link
                to={routePath.LOGIN}
                className="text-blue-600 hover:underline"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {success && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-blue-200 p-8 text-center max-w-sm">
            <ShieldCheck className="mx-auto text-blue-600" size={48} />
            <h3 className="mt-4 text-xl font-semibold text-blue-800">
              Welcome aboard!
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Your account has been created successfully.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
