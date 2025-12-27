import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Home,
  Building2,
  Flag,
  Hash,
  ShieldCheck,
} from "lucide-react";

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
      contactno: "",
      houseNo: "",
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
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
        contactno: data.contactno || undefined,
        address: [
          {
            houseNo: data.houseNo || "",
            street: data.street || "",
            city: data.city || "",
            state: data.state || "",
            country: data.country || "",
            pincode: data.pincode || "",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-lg rounded-2xl border border-blue-100 p-8">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="text-blue-600" />
            <h1 className="text-2xl font-semibold text-blue-700">Create Account</h1>
          </div>

          {apiError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-blue-800 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-blue-800 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="john@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-blue-800 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
                <input
                  type="password"
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Role */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-blue-800 mb-1">Role</label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
                <select
                  className="w-full appearance-none pl-10 pr-8 py-2 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("role", { required: "Role is required" })}
                >
                  <option value="user">User</option>
                  <option value="vendor">Vendor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
              )}
            </div>

            {/* Contact */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-blue-800 mb-1">Contact No</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
                <input
                  type="tel"
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="1234567890"
                  {...register("contactno")}
                />
              </div>
            </div>

            {/* Address Header */}
            <div className="col-span-2 mt-2">
              <h2 className="text-sm font-semibold text-blue-700 flex items-center gap-1">
                <MapPin size={16} className="text-blue-500" /> Address (optional)
              </h2>
            </div>

            {/* House No */}
            <div>
              <div className="relative">
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
                <input
                  type="text"
                  placeholder="House No"
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-300"
                  {...register("houseNo")}
                />
              </div>
            </div>

            {/* Street */}
            <div>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
                <input
                  type="text"
                  placeholder="Street"
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-300"
                  {...register("street")}
                />
              </div>
            </div>

            {/* City */}
            <div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
                <input
                  type="text"
                  placeholder="City"
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-300"
                  {...register("city")}
                />
              </div>
            </div>

            {/* State */}
            <div>
              <div className="relative">
                <Flag className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
                <input
                  type="text"
                  placeholder="State"
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-300"
                  {...register("state")}
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <div className="relative">
                <Flag className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-300"
                  {...register("country")}
                />
              </div>
            </div>

            {/* Pincode */}
            <div>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-300"
                  {...register("pincode")}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-span-2 mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl shadow-sm transition-colors disabled:opacity-60"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Popup */}
      {success && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-blue-200 p-8 text-center max-w-sm">
            <ShieldCheck className="mx-auto text-blue-600" size={48} />
            <h3 className="mt-4 text-xl font-semibold text-blue-800">Registration Successful</h3>
            <p className="mt-2 text-sm text-slate-600">
              Your account has been created successfully.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
