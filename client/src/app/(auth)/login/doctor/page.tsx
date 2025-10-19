"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import axios from "axios";
import useStore from "@/store/authStore";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const metadata = {
  title: "Doctor Login - eDoc+",
  description:
    "Healthcare provider sign in to MediCare+ platform. Manage your practice and consultations.",
};

type ToastVariant = "default" | "destructive" | null | undefined;

export default function Page() {
  const [isSignup, setIsSignup] = useState(true);
  const [showPassword, setShowpassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [toastType, setToastType] = useState<ToastVariant>(null);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const { setUser, setAuthenticated } = useStore.getState();
  const router = useRouter()

  // 🕒 Auto-hide alert after 3 seconds
  useEffect(() => {
    if (toastType) {
      const timer = setTimeout(() => {
        setToastType(null);
        setResponseMessage("");
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [toastType]);

  const alert = toastType ? (
    <Alert
      variant={toastType ?? "default"}
      className={`absolute top-4 left-1/2 -translate-x-1/2 w-full px-6  md:mx-8 md:w-fit ${toastType === 'destructive' ? 'bg-red-200' : 'bg-green-300 text-black'} z-50`}
    >
      <Terminal />
      <AlertTitle>
        {toastType === "destructive" ? "Error!" : "Success"}
      </AlertTitle>
      <AlertDescription>{responseMessage}</AlertDescription>
    </Alert>
  ) : null;

  // 🧑‍⚕️ Login handler
  const handleLogin = async (e:any) => {
    console.log("Doctor login");
    // Implement login logic
     e.preventDefault();

    try {
      setResponseMessage("");
      setLoading(true);

      const res = await axios.post(`${BASE_URL}/auth/doctor/login`, {
        email,
        password,
      }, {withCredentials:true});

      const data = res.data;

      console.log(data)

      if (data.message === "Doctor Login successful") {
        router.push('/')
        setUser(data?.doctor)
        setToastType("default");
        setResponseMessage(data?.message || "Doctor Login successful");
        console.log("Doctor Login successful : --> ", data);
      }
    } catch (error: any) {
      console.log("Error in sign in --> ", error);
      setToastType("destructive");
      setResponseMessage(error.response?.data?.message || error.message || 'SOmething went wrong');
    } finally {
      setLoading(false);
    }
  };

  // 🩺 Signup handler
  const handleSignup = async (e: any) => {
    e.preventDefault();
    console.log("Doctor Signup");

    try {
      setResponseMessage("");
      setLoading(true);

      const res = await axios.post(`${BASE_URL}/auth/doctor/register`, {
        name,
        email,
        password,
      }, {withCredentials:true});

      const data = res.data;

      console.log(data)

      if (data.message === "Doctor registered successfully") {
        setUser(data?.doctor)
        setToastType("default");
        router.push('/')
        setResponseMessage(data?.message || "Doctor Registration Successful");
        console.log("Signup successful:", data);
      }
    } catch (error: any) {
      console.log("Error in sign up --> ", error);
      setToastType("destructive");
      setResponseMessage(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen relative">
      {/* Left side image */}
      <div className="hidden md:inline-block w-[80%]">
        <Image
          src="/Doctor_Image.jpg"
          alt="Doctor"
          width={900}
          height={1000}
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Right side form */}
      <div className="w-full flex flex-col items-center justify-center px-8">
        {alert}
        <form className="md:w-96 w-80 flex flex-col items-center justify-center">
          <h2 className="text-4xl text-gray-900 font-medium">
            {isSignup ? "Sign up" : "Sign in "} (Doctor)
          </h2>
          <p className="text-sm text-gray-500/90 mt-3">
            {isSignup
              ? "Hey Doctor 🩺, Create an account, it's free"
              : "Welcome back Doctor 🩺! Please enter your details."}
          </p>

          <button
            type="button"
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">
              or {isSignup ? "sign up" : "sign in"} with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          <div className="flex flex-col w-full bg-transparent gap-5">
            {/* Name field */}
            {isSignup && (
              <div className="flex items-center gap-2 h-12 px-3 border border-gray-200 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="#6B7280"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15.232 11.232A3 3 0 1 1 8.768 11.232a3 3 0 0 1 6.464 0zM4.5 20.25a8.25 8.25 0 1 1 15 0"
                  />
                </svg>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm w-full"
                  required
                />
              </div>
            )}

            {/* Email field */}
            <div className="flex items-center gap-2 h-12 px-3 border border-gray-200 rounded-full">
              <svg
                width="16"
                height="11"
                viewBox="0 0 16 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email ID"
                className="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm w-full"
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#6B7280"
              />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
            <div className="flex items-center gap-2">
              <input className="h-5" type="checkbox" id="checkbox" />
              <label className="text-sm" htmlFor="checkbox">
                Remember me
              </label>
            </div>
            <p
              onClick={() => setShowpassword((prev) => !prev)}
              className="text-sm underline text-blue-400 cursor-pointer"
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </p>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            onClick={isSignup ? handleSignup : handleLogin}
            className="mt-8 w-full h-11 rounded-full cursor-pointer text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
            {loading
              ? "Wait .... "
              : isSignup
              ? "Create account as Doctor"
              : "Sign in as Doctor"}
          </button>

          <p className="text-gray-800/90 text-sm mt-4 flex gap-2">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <span
              className="text-blue-600 hover:underline font-semibold cursor-pointer"
              onClick={() => setIsSignup((prev) => !prev)}
            >
              {isSignup ? "Sign in" : "Sign up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
