import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "https://my-portfolio-vvxz.onrender.com/api/create-project/logedin",
        data
      );
      console.log("Login Successful:", response.data);
      setMessage("Login successful!");

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/gozirim-admin-admin");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setMessage("Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="main flex items-center justify-center min-h-screen">
        <div className="bg-transparent backdrop-blur-lg p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-white text-2xl font-bold text-center mb-6 break-words">
            Welcome Gozirim
          </h1>
          {message && (
            <p
              className={`mt-4 text-center ${
                message.includes("successful")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className={`w-full p-2 rounded border outline-none ${
                  errors.email ? "border-red-500" : "border-gray-600"
                } bg-transparent text-white`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-white mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={`w-full p-2 rounded border outline-none ${
                    errors.password ? "border-red-500" : "border-gray-600"
                  } bg-transparent text-white`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${
                isSubmitting ? "bg-gray-500" : "bg-gray-800 hover:bg-gray-700"
              } transition duration-300 ease-in-out transform hover:scale-105 text-white font-bold py-2 rounded`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
