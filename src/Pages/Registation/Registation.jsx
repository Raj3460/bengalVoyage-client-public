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
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  // ✅ Image Upload Handler
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) {
      setError("image", {
        type: "manual",
        message: "Please select an image",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      if (res.data.success) {
        setProfilePic(res.data.data.url);
        clearErrors("image");
      } else {
        setError("image", {
          type: "manual",
          message: "Image upload failed",
        });
      }
    } catch (err) {
      console.error("Upload Error:", err);
      setError("image", {
        type: "manual",
        message: "Image upload failed",
      });
    }
  };

  // ✅ Submit Handler
  const onSubmit = async (data) => {
    if (!ProfilePic) {
      setError("image", {
        type: "manual",
        message: "Profile picture is required",
      });
      return;
    }

    clearErrors("image");

    const { name, email, password } = data;
    setRegisterLoading(true);

    try {
      const result = await createUser(email, password)
        .then(() => {
          console.log(result.user);
        })
        .catch((err) => console.log(err));
      // const user = result.user;

      const userInfo = {
        name,
        email,
        image: ProfilePic,
        role: "tourist",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await axiosInstance.post("/users", userInfo);

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left: Animation */}
        <div className="md:w-1/2 flex items-center justify-center bg-blue-50 p-8">
          <div className="max-w-xs w-full">
            <Lottie animationData={RegisterAnimation} loop={true} />
            <h2 className="text-center text-2xl font-bold mt-4 text-blue-700">
              Join BengalVoyage!
            </h2>
          </div>
        </div>

        {/* Right: Form */}
        <div className="md:w-1/2 w-full p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-sm text-black font-medium">
                Full Name
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 5,
                    message: "Name must be at least 5 characters",
                  },
                })}
                className="w-full input input-bordered mt-1"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Profile Picture Upload */}
            <div>
              <label className="text-sm text-black font-medium">
                Profile Picture
              </label>
              <label className="cursor-pointer flex flex-col items-center px-4 py-4 bg-white text-blue-500 rounded-lg border-2 border-dashed border-blue-300 hover:border-blue-500 transition-all">
                <FaCloudUploadAlt className="text-3xl mb-2" />
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
              </label>
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
              {ProfilePic && (
                <img
                  src={ProfilePic}
                  alt="Preview"
                  className="w-16 h-16 mt-3 rounded-full border mx-auto"
                />
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-black font-medium">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                })}
                className="w-full input input-bordered mt-1"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-black font-medium">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  validate: {
                    hasUpper: (value) =>
                      /[A-Z]/.test(value) ||
                      "Must include at least one uppercase letter",
                    hasLower: (value) =>
                      /[a-z]/.test(value) ||
                      "Must include at least one lowercase letter",
                    hasNumber: (value) =>
                      /\d/.test(value) || "Must include at least one number",
                  },
                })}
                className="w-full input input-bordered mt-1"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* <div className="relative">
              <label className="text-sm font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true, minLength: 6 })}
                className="w-full input input-bordered mt-1 pr-10"
                placeholder="••••••••"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
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
            </div> */}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={registerLoading}
                className={`btn btn-primary text-black w-full ${
                  registerLoading ? "loading" : ""
                }`}
              >
                {registerLoading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          {/* Already have an account */}
          <div className="text-center text-black text-sm mt-4">
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
          <div className="mt-6">
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registation;
