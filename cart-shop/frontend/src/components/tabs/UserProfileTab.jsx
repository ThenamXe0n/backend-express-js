import React, { useState } from "react";
import EditProfileDetailsForm from "../forms/EditProfileDetailsForm";
import toast from "react-hot-toast";

const UserProfileTab = ({ user,setUser,setActive }) => {
  const [open, setOpen] = useState(false);
  // Demo fallback data
  const data = user || {
    name: "john doe",
    email: "john@example.com",
    role: "user",
    contactno: "+91 9876543210",
    isActive: true,
    address: [
      {
        houseNo: "12A",
        street: "Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        pincode: "400001",
      },
    ],
  };

  const openEdit = () => {
    setOpen(true);
    toast.success("Edit Profile Form Opened");
  };

  return (
    <>
      {open ? (
        <EditProfileDetailsForm profile={user} setProfile={setUser} setOpen={setOpen} />
      ) : (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center text-xl font-bold uppercase">
                {data.name?.charAt(0)}
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-semibold capitalize">
                  {data.name}
                </h2>
                <p className="text-sm opacity-90">{data?.email}</p>

                <div className="mt-2 flex gap-2">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs uppercase">
                    {data.role}
                  </span>

                  {data.isActive && (
                    <span className="bg-white text-black px-3 py-1 rounded-full text-xs">
                      Active
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Contact */}
            <div>
              <h3 className="text-indigo-600 font-semibold mb-2">
                Contact Information
              </h3>

              <div className="border rounded-xl p-4">
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">
                  {data.contactno || "Not provided"}
                </p>
              </div>
            </div>

            {/* Addresses */}
            <div>
              <h3 className="text-indigo-600 font-semibold mb-2">Addresses</h3>

              <div className="grid gap-4">
                {data.address?.map((addr, i) => (
                  <div
                    key={i}
                    className="border rounded-xl p-4 hover:border-cyan-600 transition"
                  >
                    <p className="font-medium">
                      {addr.houseNo}, {addr.street}
                    </p>

                    <p className="text-sm text-gray-600">
                      {addr.city}, {addr.state}
                    </p>

                    <p className="text-sm text-gray-600">
                      {addr.country} — {addr.pincode}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={openEdit}
                className="flex-1 bg-cyan-600 text-white py-3 rounded-xl hover:bg-cyan-700 transition"
              >
                Edit Profile
              </button>

              <button onClick={()=>setActive("changePassword")} className="flex-1 border border-indigo-600 text-indigo-600 py-3 rounded-xl hover:bg-indigo-50 transition">
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileTab;
