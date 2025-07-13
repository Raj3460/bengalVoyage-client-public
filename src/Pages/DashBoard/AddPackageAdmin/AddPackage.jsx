import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import UseAxiosSecureApi from "../../../Hooks/Api/UseAxiosSecureApi";

const AddPackage = () => {
  const axiosSecure = UseAxiosSecureApi();
  const imageKey = import.meta.env.VITE_image_upload_key;

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([null]);

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      gallery: [""],
      tourPlan: [{ day: 1, headline: "", details: "" }],
    },
  });

  const { fields: galleryFields, append: addImg, remove: removeImg } =
    useFieldArray({ control, name: "gallery" });
  const { fields: planFields, append: addDay, remove: removeDay } =
    useFieldArray({ control, name: "tourPlan" });

  const uploadToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${imageKey}`;
    const res = await axios.post(uploadUrl, formData);
    return res.data.data.url;
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: async (formData) => {
      // Upload thumbnail
      const thumbnailUrl = await uploadToImgBB(thumbnailFile);

      // Upload gallery images
      const galleryUrls = await Promise.all(
        galleryFiles.map((file) => uploadToImgBB(file))
      );

      // Prepare final data
      const finalData = {
        ...formData,
        thumbnail: thumbnailUrl,
        gallery: galleryUrls,
        price: parseFloat(formData.price),
        days: parseInt(formData.days),
      };

      const res = await axiosSecure.post("/packages", finalData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Package added successfully!");
      reset();
      setThumbnailFile(null);
      setGalleryFiles([null]);
    },
    onError: () => toast.error("Failed to add package"),
  });

  const onSubmit = (data) => {
    if (!thumbnailFile || galleryFiles.some((f) => !f)) {
      toast.error("Please upload all required images.");
      return;
    }
    mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Package</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Text Fields */}
        <input {...register("title", { required: true })} placeholder="Package Title" className="input input-bordered w-full" />
        <input {...register("tourType", { required: true })} placeholder="Tour Type (e.g. Adventure)" className="input input-bordered w-full" />
        <input type="number" {...register("price", { required: true, min: 0 })} placeholder="Price (BDT)" className="input input-bordered w-full" />
        <input type="number" {...register("days", { required: true, min: 1 })} placeholder="Number of Days" className="input input-bordered w-full" />
        <textarea {...register("about", { required: true })} placeholder="About the tour" className="textarea textarea-bordered w-full" />

        {/* Thumbnail Upload */}
        <div>
          <label className="font-medium">Thumbnail Image</label>
          <input type="file" onChange={(e) => setThumbnailFile(e.target.files[0])} accept="image/*" className="file-input w-full" />
        </div>

        {/* Gallery Upload */}
        <div>
          <label className="font-medium">Gallery Images</label>
          {galleryFields.map((field, idx) => (
            <div key={field.id} className="flex items-center gap-2 my-2">
              <input type="file" onChange={(e) => {
                const files = [...galleryFiles];
                files[idx] = e.target.files[0];
                setGalleryFiles(files);
              }} accept="image/*" className="file-input flex-1" />
              {galleryFields.length > 1 && (
                <button type="button" onClick={() => {
                  removeImg(idx);
                  setGalleryFiles((prev) => prev.filter((_, i) => i !== idx));
                }}>✕</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => {
            addImg("");
            setGalleryFiles((prev) => [...prev, null]);
          }} className="btn btn-sm">
            + Add Image
          </button>
        </div>

        {/* Tour Plan */}
        <div>
          <label className="font-medium">Tour Plan</label>
          {planFields.map((field, idx) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 my-3">
              <input type="number" {...register(`tourPlan.${idx}.day`, { required: true, min: 1 })} placeholder="Day #" className="input input-bordered" />
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

        {/* Submit */}
        <button type="submit" className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}>
          {isLoading ? "Saving..." : "Save Package"}
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
