import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../services/axiosInstance";
import { apiPaths } from "../../services/apiEndPoints";

function EditProfileDetailsForm({ profile, setProfile, setOpen }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profile.name,
      contactno: profile.contactno,
      houseNo: profile.address[0]?.houseNo,
      street: profile.address[0]?.street,
      city: profile.address[0]?.city,
      state: profile.address[0]?.state,
      country: profile.address[0]?.country,
      pincode: profile.address[0]?.pincode,
    },
  });

  const onSubmit = async (data) => {
    const updated = {
      ...profile,
      name: data.name,
      contactno: data.contactno,
      address: [
        {
          houseNo: data.houseNo,
          street: data.street,
          city: data.city,
          state: data.state,
          country: data.country,
          pincode: data.pincode,
        },
      ],
    };

    //api call to update profile details
    let response = await axiosInstance.patch(
      apiPaths.updateProfileDetails,
      updated,
    );

    console.log("Updated:", updated);
    if (response.data.status) {
      setProfile(response.data.data);
      setOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-20 flex items-end sm:items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-xl font-semibold text-indigo-600">Edit Profile</h3>

        <input
          {...register("name", { required: true })}
          placeholder="Name"
          className="w-full border rounded-xl p-3"
        />

        <input
          {...register("contactno")}
          placeholder="Phone"
          className="w-full border rounded-xl p-3"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            {...register("houseNo")}
            placeholder="House No"
            className="border p-3 rounded-xl"
          />
          <input
            {...register("street")}
            placeholder="Street"
            className="border p-3 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            {...register("city")}
            placeholder="City"
            className="border p-3 rounded-xl"
          />
          <input
            {...register("state")}
            placeholder="State"
            className="border p-3 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            {...register("country")}
            placeholder="Country"
            className="border p-3 rounded-xl"
          />
          <input
            {...register("pincode")}
            placeholder="Pincode"
            className="border p-3 rounded-xl"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex-1 border border-indigo-600 text-indigo-600 py-3 rounded-xl"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 bg-cyan-600 text-white py-3 rounded-xl"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfileDetailsForm;
