import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import UseAxiosSecureApi from "../../../Hooks/Api/UseAxiosSecureApi";

const AddPackage = () => {
  const axiosSecure = UseAxiosSecureApi();

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      gallery: [""], // at least one image
      tourPlan: [{ day: 1, headline: "", details: "" }],
    },
  });

  // Gallery field array
  const { fields: galleryFields, append: addImg, remove: removeImg } =
    useFieldArray({ control, name: "gallery" });

  // Tour Plan field array
  const { fields: planFields, append: addDay, remove: removeDay } =
    useFieldArray({ control, name: "tourPlan" });

  // Mutation for POST
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/packages", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("✅ Package added successfully!");
      reset();
    },
    onError: () => toast.error("❌ Failed to add package!"),
  });

  const onSubmit = (data) => mutate(data);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">➕ Add New Package</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <input
          {...register("title", { required: true })}
          placeholder="Package Title"
          className="input input-bordered w-full"
        />

        {/* Tour Type */}
        <input
          {...register("tourType", { required: true })}
          placeholder="Tour Type (e.g. Adventure)"
          className="input input-bordered w-full"
        />

        {/* Price */}
        <input
          type="number"
          {...register("price", { required: true, min: 0 })}
          placeholder="Price (BDT)"
          className="input input-bordered w-full"
        />

        {/* Days */}
        <input
          type="number"
          {...register("days", { required: true, min: 1 })}
          placeholder="Number of Days"
          className="input input-bordered w-full"
        />

        {/* About */}
        <textarea
          {...register("about", { required: true })}
          placeholder="About the tour"
          className="textarea textarea-bordered w-full"
        />

        {/* Thumbnail Image */}
        <input
          {...register("thumbnail", { required: true })}
          placeholder="Thumbnail Image URL"
          className="input input-bordered w-full"
        />

        {/* Gallery Section */}
        <div>
          <label className="font-medium">Gallery Images</label>
          {galleryFields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 my-2">
              <input
                {...register(`gallery.${idx}`, { required: true })}
                placeholder={`Image URL ${idx + 1}`}
                className="input input-bordered flex-1"
              />
              {galleryFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImg(idx)}
                  className="btn btn-sm btn-error"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addImg("")}
            className="btn btn-sm mt-2"
          >
            ➕ Add Image
          </button>
        </div>

        {/* Tour Plan Section */}
        <div>
          <label className="font-medium">Tour Plan</label>
          {planFields.map((field, idx) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-3 gap-2 my-3"
            >
              <input
                type="number"
                {...register(`tourPlan.${idx}.day`, {
                  required: true,
                  min: 1,
                })}
                placeholder="Day #"
                className="input input-bordered"
              />
              <input
                {...register(`tourPlan.${idx}.headline`, { required: true })}
                placeholder="Headline"
                className="input input-bordered"
              />
              <input
                {...register(`tourPlan.${idx}.details`, { required: true })}
                placeholder="Details"
                className="input input-bordered"
              />
              {planFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDay(idx)}
                  className="btn btn-sm btn-error mt-2"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addDay({ day: planFields.length + 1, headline: "", details: "" })
            }
            className="btn btn-sm"
          >
            ➕ Add Day
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
        >
          {isLoading ? "Saving..." : "Save Package"}
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
