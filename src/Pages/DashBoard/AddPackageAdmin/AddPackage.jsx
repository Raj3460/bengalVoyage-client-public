import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import UseAxiosSecureApi from "../../../Hooks/Api/UseAxiosSecureApi";

const AddPackage = () => {
  const axiosSecure = UseAxiosSecureApi();
  const { register, handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      gallery: [""],
      tourPlan: [{ day: 1, headline: "", details: "" }],
    },
  });

  const { fields: galleryFields, append: addImg, remove: removeImg } =
    useFieldArray({ control, name: "gallery" });

  const { fields: planFields, append: addDay, remove: removeDay } =
    useFieldArray({ control, name: "tourPlan" });

  const [thumbnailUrl, setThumbnailUrl] = useState("");

  // ✅ Upload to imgbb
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
      const res = await axiosSecure.post("/packages", data);
      console.log(data)
      return res.data;
    },
    onSuccess: () => {
      toast.success("Package added!");
      reset();
      setThumbnailUrl("");
    },
    onError: () => toast.error("Failed to add package"),
  });

  const onSubmit = (data) => mutate( data);


  return (
    <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
  <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
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

    {/* Images Section */}
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Another Image
        </button>
      </div>
    </div>

    {/* Tour Plan Section */}
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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add Another Day
      </button>
    </div>

    {/* Submit Button */}
    <div className="pt-2">
      <button
        type="submit"
        className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
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
