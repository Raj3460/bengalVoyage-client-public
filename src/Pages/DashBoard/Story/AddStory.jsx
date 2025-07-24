import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecureApi from "../../../Hooks/Api/UseAxiosSecureApi";
import Swal from "sweetalert2";

const AddStory = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecureApi();
  const imageHostingKey = import.meta.env.VITE_image_upload_key;
  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      images: [{ file: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
    rules: { minLength: 1 },
  });

  const mutation = useMutation({
    mutationFn: async (storyData) => {
      const response = await axiosSecure.post("/stories", storyData);
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Story published successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/dashboard/manage_story");
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to publish story",
        icon: "error",
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      // Validate at least one image is uploaded
      if (data.images.some((img) => !img.file?.[0])) {
        Swal.fire("Error", "Please upload at least one image", "error");
        return;
      }

      // Upload images sequentially with progress feedback
      Swal.fire({
        title: "Uploading Images...",
        html: "Please wait while we upload your images",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const uploadedImageUrls = [];
      for (let i = 0; i < data.images.length; i++) {
        const imageFile = data.images[i].file[0];
        if (!imageFile) continue;

        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await fetch(imageHostingApi, {
          method: "POST",
          body: formData,
        });

        const imgData = await res.json();
        if (imgData.success) {
          uploadedImageUrls.push(imgData.data.url);
        } else {
          throw new Error("Image upload failed");
        }
      }

      Swal.close();

      if (uploadedImageUrls.length === 0) {
        throw new Error("No images were uploaded successfully");
      }

      // Prepare story data
      const storyData = {
        title: data.title.trim(),
        description: data.description.trim(),
        images: uploadedImageUrls,
        createdAt: new Date().toISOString(),
      };

      // Submit to backend
      mutation.mutate(storyData);
    } catch (error) {
      console.error("Story submission error:", error);
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to publish story",
        icon: "error",
      });
    }
  };

  return (
    <div className=" p-6 bg-white dark:bg-gray-900 shadow rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
        Create New Story
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title Field */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
            Story Title *
          </label>
          <input
            type="text"
            {...register("title", { 
              required: "Title is required",
              minLength: {
                value: 5,
                message: "Title should be at least 5 characters",
              },
            })}
            className={`w-full input input-bordered ${
              errors.title ? "input-error" : ""
            }`}
            placeholder="Enter a compelling title for your story"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
            Story Content *
          </label>
          <textarea
            {...register("description", {
              required: "Story content is required",
              minLength: {
                value: 50,
                message: "Story should be at least 50 characters",
              },
            })}
            rows={8}
            className={`w-full textarea textarea-bordered ${
              errors.description ? "textarea-error" : ""
            }`}
            placeholder="Tell your story in detail..."
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
            Story Images *
          </label>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <input
                  type="file"
                  accept="image/*"
                  {...register(`images.${index}.file`, {
                    required: index === 0 ? "At least one image is required" : false,
                  })}
                  className={`file-input file-input-bordered w-full ${
                    errors.images?.[index]?.file ? "file-input-error" : ""
                  }`}
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="btn btn-circle btn-sm btn-error"
                    aria-label="Remove image"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ file: null })}
              className="btn btn-outline btn-sm mt-2"
              disabled={fields.length >= 5} // Limit to 5 images
            >
              + Add Another Image (Max 5)
            </button>
            {errors.images && (
              <p className="mt-1 text-sm text-red-500">
                {errors.images.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`btn btn-primary w-full mt-6 ${
            mutation.isPending ? "loading" : ""
          }`}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Publishing..." : "Publish Story"}
        </button>
      </form>
    </div>
  );
};

export default AddStory;