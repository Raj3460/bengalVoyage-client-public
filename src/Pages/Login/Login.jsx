import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/signIn.json";
import { FaSignInAlt, FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsGithub, BsFacebook } from "react-icons/bs";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Password toggle visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from);
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "User not found. Please register.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      }
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center  p-4">
      {/* Animation Section */}
      <div className="hidden flex-1 md:flex md:w-1/2 lg:w-2/3 items-center justify-center p-8">
        <Lottie
          animationData={loginAnimation}
          loop={true}
          className="w-full max-w-xl"
        />
      </div>

      {/* Form Section */}
      <div className="w-full flex-1 md:w-1/2 lg:w-1/3 bg-base-300 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center md:hidden mb-6">
            <Lottie
              animationData={loginAnimation}
              loop={true}
              className="w-48 h-48"
            />
          </div>

          <h1 className="text-3xl text-primary font-bold text-center  mb-2">
            Welcome Back!
          </h1>
          <p className="text-center  mb-8">
            Sign in to access your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium  mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium  mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
             
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm "
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  // to="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center text-black items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm  bg-primary font-semibold hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Log in...
                </>
              ) : (
                <>
                  <FaSignInAlt className="mr-2 text-black" />
                  Login
                </>
              )}
            </button>
          </form>

          {/* Social Login Section */}
          <SocialLogin></SocialLogin>

          <div className="mt-6 text-center">
            <p className="text-sm ">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
