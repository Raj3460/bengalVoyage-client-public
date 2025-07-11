import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { FaCloudUploadAlt } from "react-icons/fa";
import Lottie from "lottie-react";
import axios from "axios";

import RegisterAnimation from "../../assets/register.json";
import useAuth from "../../Hooks/useAuth";
import useAxiosApi from "../../Hooks/Api/useAxiosApi";
import SocialLogin from "../SocialLogin/SocialLogin";

const Registation = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosInstance = useAxiosApi();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";
  
  const [ProfilePic, setProfilePic] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ Profile Picture Upload
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      if (res.data.success) {
        setProfilePic(res.data.data.url);
      } else {
        alert("Image upload failed!");
      }
    } catch (err) {
      console.error("Upload Error:", err);
    }
  };

  // ✅ On Submit
  const onSubmit = async (data) => {
    if (!ProfilePic) {
      alert("Please upload your profile picture.");
      return;
    }

    const { name, email, password } = data;
    setRegisterLoading(true);

    try {
      const result = await createUser(email, password);
      const user = result.user;

      // Step 1: Save user in DB
      const userInfo = {
        name,
        email,
        image: ProfilePic,
        role: "tourist",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      const saveRes = await axiosInstance.post("/users", userInfo);
      console.log("Saved in DB:", saveRes.data);

      // Step 2: Update Firebase Profile
      await updateUserProfile({
        displayName: name,
        photoURL: ProfilePic,
      });

      navigate(from);
    } catch (error) {
      console.error("Registration Error:", error);
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {/* Animation */}
        <div className="text-center">
          <div className="mx-auto w-40 h-40">
            <Lottie animationData={RegisterAnimation} loop={true} />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Create an Account
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full input input-bordered mt-1"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">Name is required</p>
            )}
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label className="text-sm font-medium">Profile Picture</label>
            <label className="cursor-pointer flex flex-col items-center px-4 py-4 bg-white text-blue-500 rounded-lg border-2 border-dashed border-blue-300 hover:border-blue-500 transition-all">
              <FaCloudUploadAlt className="text-3xl mb-2" />
              <input
                type="file"
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
            </label>
            {ProfilePic && (
              <img
                src={ProfilePic}
                alt="Preview"
                className="w-16 h-16 mt-2 rounded-full border"
              />
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
              className="w-full input input-bordered mt-1"
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid email
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="w-full input input-bordered mt-1"
              placeholder="••••••••"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">
                Password is required
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={registerLoading}
              className={`btn btn-primary w-full ${
                registerLoading && "loading"
              }`}
            >
              {registerLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        {/* Already have an account */}
        <div className="text-center text-sm">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              state={{ from }}
              className="text-blue-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Social Login */}
        <SocialLogin />
      </div>
    </div>
  );
};

export default Registation;
