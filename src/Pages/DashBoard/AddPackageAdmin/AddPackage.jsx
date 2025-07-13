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
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Package</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Basic Fields */}
        <input {...register("title", { required: true })} placeholder="Title" className="input input-bordered w-full" />
        <input {...register("tourType", { required: true })} placeholder="Tour Type" className="input input-bordered w-full" />
        <input type="number" {...register("price", { required: true })} placeholder="Price" className="input input-bordered w-full" />
        <input type="number" {...register("days", { required: true })} placeholder="Number of Days" className="input input-bordered w-full" />
        <textarea {...register("about", { required: true })} placeholder="About the tour" className="textarea textarea-bordered w-full" />

        {/* ✅ Thumbnail Upload */}
        <div>
          <label className="font-medium">Thumbnail Image</label>
          <input type="file" onChange={(e) => handleImageUpload(e, null, "thumbnail")} className="file-input w-full" />
          {thumbnailUrl && <img src={thumbnailUrl} className="w-32 mt-2 rounded" />}
          <input type="hidden" {...register("thumbnail", { required: true })} />
        </div>

        {/* ✅ Gallery Images Upload */}
        <div>
          <label className="font-medium">Gallery Images</label>
          {galleryFields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 items-center my-2">
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, idx, "gallery")}
                className="file-input file-input-sm"
              />
              <input
                {...register(`gallery.${idx}`)}
                placeholder="Image URL"
                readOnly
                className="input input-bordered flex-1"
              />
              {galleryFields.length > 1 && (
                <button type="button" onClick={() => removeImg(idx)} className="btn btn-sm">✕</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addImg("")} className="btn btn-sm mt-2">+ Add Image</button>
        </div>

        {/* Tour Plan */}
        <div>
          <label className="font-medium">Tour Plan</label>
          {planFields.map((field, idx) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 my-3">
              <input type="number" {...register(`tourPlan.${idx}.day`, { required: true })} placeholder="Day #" className="input input-bordered" />
              <input {...register(`tourPlan.${idx}.headline`, { required: true })} placeholder="Headline" className="input input-bordered" />
              <input {...register(`tourPlan.${idx}.details`, { required: true })} placeholder="Details" className="input input-bordered" />
              {planFields.length > 1 && (
                <button type="button" onClick={() => removeDay(idx)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addDay({ day: planFields.length + 1, headline: "", details: "" })} className="btn btn-sm">
            + Add Day
          </button>
        </div>

        <button type="submit" className={`btn btn-primary w-full ${isLoading && "loading"}`}>
          {isLoading ? "Saving..." : "Save Package"}
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
