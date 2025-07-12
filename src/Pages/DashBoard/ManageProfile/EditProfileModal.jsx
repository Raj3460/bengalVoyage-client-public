import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecureApi from "../../../Hooks/Api/UseAxiosSecureApi";

const EditProfileModal = ({ user, setIsModalOpen, refetch }) => {
  const axiosSecure = UseAxiosSecureApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name,
      image: user?.image,
    },
  });

  // Update user mutation
  const { mutateAsync: updateUser, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(`/users/${user?.email}`, data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        Swal.fire("Updated!", "Your profile has been updated.", "success");
        refetch();
        setIsModalOpen(false);
      }
    },
    onError: (error) => {
      console.error("Update failed:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    },
  });

  const onSubmit = (data) => {
    updateUser(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <h2 className="text-xl font-bold mb-4 text-center text-primary">
          Edit Your Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Image URL Field */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Image URL
            </label>
            <input
              type="text"
              {...register("image", { required: "Image URL is required" })}
              className="input input-bordered w-full mt-1"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
            )}
          </div>

          {/* Email (readonly) */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Email (Readonly)
            </label>
            <input
              type="text"
              value={user?.email}
              readOnly
              className="input input-bordered w-full mt-1 bg-secondary text-black"
            />
          </div>

          {/* Role (readonly) */}
          <div>
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Role (Readonly)
            </label>
            <input
              type="text"
              value={user?.role}
              readOnly
              className="input input-bordered w-full mt-1 bg-secondary text-black "
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
