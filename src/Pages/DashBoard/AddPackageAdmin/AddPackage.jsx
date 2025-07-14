import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios";
import UseAxiosSecureApi from "../../../Hooks/Api/UseAxiosSecureApi";
import { FaTrash, FaPlus } from "react-icons/fa";

const AddPackage = () => {
  const axiosSecure = UseAxiosSecureApi();
  const { register, handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      title: "",
      tourType: "",
      price: 0,
      days: 1,
      about: "",
      thumbnail: "",
      gallery: [""],
      tourPlan: [{ day: 1, headline: "", details: "" }],
      destination: "",
      departure: "",
      departureTime: "",
      returnTime: "",
      location: "",
      notIncluded: [""],
      status: "active",
      rating: 0,
      reviews: [],
      bookings: []
    }
  });

  const { fields: galleryFields, append: addImg, remove: removeImg } =
    useFieldArray({ control, name: "gallery" });

  const { fields: planFields, append: addDay, remove: removeDay } =
    useFieldArray({ control, name: "tourPlan" });

  const { fields: notIncludedFields, append: addNotIncluded, remove: removeNotIncluded } =
    useFieldArray({ control, name: "notIncluded" });

  const [thumbnailUrl, setThumbnailUrl] = useState("");

  // ✅ Upload to imgbb (kept your existing implementation)
  const handleImageUpload = async (e, index = null, type = "gallery") => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

    try {
      const res = await axios.post(uploadUrl, formData);
      const imageUrl = res.data.data.url;

      if (type === "thumbnail") {
        setThumbnailUrl(imageUrl);
        setValue("thumbnail", imageUrl);
      } else {
        setValue(`gallery.${index}`, imageUrl);
      }

      toast.success("Image uploaded!");
    } catch (err) {
      console.log(err);
      toast.error("Upload failed!");
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      const packageData = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const res = await axiosSecure.post("/packages", packageData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Package created successfully!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3b82f6",
      });
      reset();
      setThumbnailUrl("");
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Failed to create package",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444",
      });
    }
  });

  const onSubmit = (data) => mutate(data);

  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-secondary dark:text-secondary">
        Create New Tour Package
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information Section */}
        <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Package Title*
              </label>
              <input
                {...register("title", { required: true })}
                placeholder="e.g. Sundarbans Adventure"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tour Type*
              </label>
              <select
                {...register("tourType", { required: true })}
                className="select select-bordered w-full focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select tour type</option>
                <option value="Adventure">Adventure</option>
                <option value="Cultural">Cultural</option>
                <option value="Beach">Beach</option>
                <option value="Historical">Historical</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price (BDT)*
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">৳</span>
                <input
                  type="number"
                  {...register("price", { required: true })}
                  placeholder="5000"
                  className="input input-bordered w-full pl-8 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Duration (Days)*
              </label>
              <input
                type="number"
                {...register("days", { required: true })}
                placeholder="3"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* New Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Destination*
              </label>
              <input
                {...register("destination", { required: true })}
                placeholder="Where the tour goes"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Departure Location*
              </label>
              <input
                {...register("departure", { required: true })}
                placeholder="Starting point"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Departure Time*
              </label>
              <input
                type="time"
                {...register("departureTime", { required: true })}
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Return Time*
              </label>
              <input
                type="time"
                {...register("returnTime", { required: true })}
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location Details*
              </label>
              <input
                {...register("location", { required: true })}
                placeholder="Map link or address details"
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description*
            </label>
            <textarea
              {...register("about", { required: true })}
              placeholder="Describe the tour package..."
              rows={4}
              className="textarea textarea-bordered w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Images Section (unchanged) */}
        <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Package Images
          </h3>
          
          {/* Thumbnail */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Thumbnail Image*
            </label>
            <input 
              type="file"
              onChange={(e) => handleImageUpload(e, null, "thumbnail")}
              className="file-input file-input-bordered w-full"
              accept="image/*"
            />
            {thumbnailUrl && (
              <div className="mt-2">
                <img 
                  src={thumbnailUrl} 
                  alt="Thumbnail preview" 
                  className="h-32 object-cover rounded-lg border"
                />
              </div>
            )}
            <input type="hidden" {...register("thumbnail", { required: true })} />
          </div>
          
          {/* Gallery */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Gallery Images (Minimum 3)
            </label>
            
            {galleryFields.map((field, idx) => (
              <div key={field.id} className="flex gap-3 items-center">
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(e, idx, "gallery")}
                  className="file-input file-input-bordered file-input-sm flex-1"
                  accept="image/*"
                />
                <input
                  {...register(`gallery.${idx}`)}
                  placeholder="Image URL"
                  readOnly
                  className="input input-bordered flex-1 bg-gray-100 dark:bg-gray-600"
                />
                {galleryFields.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeImg(idx)}
                    className="btn btn-circle btn-sm btn-error"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            
            <button 
              type="button" 
              onClick={() => addImg("")}
              className="btn btn-sm btn-outline mt-2"
            >
              <FaPlus className="mr-1" /> Add Another Image
            </button>
          </div>
        </div>

        {/* Tour Plan Section (unchanged) */}
        <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Tour Itinerary
          </h3>
          
          {planFields.map((field, idx) => (
            <div key={field.id} className="space-y-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Day*
                  </label>
                  <input
                    type="number"
                    {...register(`tourPlan.${idx}.day`, { required: true })}
                    placeholder="Day number"
                    className="input input-bordered w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Headline*
                  </label>
                  <input
                    {...register(`tourPlan.${idx}.headline`, { required: true })}
                    placeholder="Morning activities"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Details*
                </label>
                <textarea
                  {...register(`tourPlan.${idx}.details`, { required: true })}
                  placeholder="Describe the day's activities..."
                  rows={3}
                  className="textarea textarea-bordered w-full"
                />
              </div>
              
              {planFields.length > 1 && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeDay(idx)}
                    className="btn btn-sm btn-error"
                  >
                    Remove Day
                  </button>
                </div>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => addDay({ day: planFields.length + 1, headline: "", details: "" })}
            className="btn btn-outline btn-sm"
          >
            <FaPlus className="mr-1" /> Add Another Day
          </button>
        </div>

        {/* New: Not Included Section */}
        <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            What's Not Included
          </h3>
          
          {notIncludedFields.map((field, idx) => (
            <div key={field.id} className="flex gap-3 items-center">
              <input
                {...register(`notIncluded.${idx}`, { required: true })}
                placeholder={`Excluded item ${idx + 1}`}
                className="input input-bordered flex-1"
              />
              {notIncludedFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeNotIncluded(idx)}
                  className="btn btn-circle btn-sm btn-error"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => addNotIncluded("")}
            className="btn btn-outline btn-sm mt-2"
          >
            <FaPlus className="mr-1" /> Add Exclusion
          </button>
        </div>

        {/* Hidden Fields */}
        <input type="hidden" {...register("status")} />
        <input type="hidden" {...register("rating")} />
        <input type="hidden" {...register("reviews")} />
        <input type="hidden" {...register("bookings")} />
        <input type="hidden" {...register("createdAt")} />
        <input type="hidden" {...register("updatedAt")} />

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className={`btn btn-primary text-black w-full ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Saving Package..." : "Create Tour Package"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackage;