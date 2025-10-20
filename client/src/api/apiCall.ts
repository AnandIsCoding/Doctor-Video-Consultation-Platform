// approx all api calls will be done here 

import useStore from "@/store/authStore";
import axios from "axios";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// define type for showToast
export type ShowToastFn = (type: "success" | "destructive" | "default", message: string) => void;

// ✅ Get Profile api call
export const getProfile = async (showToast?: ShowToastFn) => {
  const { setUser, setAuthenticated } = useStore.getState();

  try {
    const res = await axios.get(`${BASE_URL}/auth/profile`, { withCredentials: true });
    const data = res.data;

    if (data?.message === "Profile fetched successfully" && data?.user) {
      setUser(data.user);
      setAuthenticated(true);
      showToast?.("success", "✅ Welcome back!");
    } else {
      setUser(null);
      setAuthenticated(false);
      showToast?.("destructive", "⚠️ Unauthorized or session expired");
    }
  } catch (error: any) {
    console.error("❌ Error in getting profile -->", error?.response?.data || error.message);
    setUser(null);
    setAuthenticated(false);
    showToast?.("destructive", "❌ Failed to fetch profile");
  }
};

// ✅ Logout User api call
export const logoutUser = async (router: any, showToast?: ShowToastFn) => {
  const { setUser, setAuthenticated } = useStore.getState();

  try {
    const res = await axios.delete(`${BASE_URL}/auth/logout`, { withCredentials: true });
    const data = res.data;

    if (data?.message === "Logged out successfully") {
      setUser(null);
      setAuthenticated(false);
      showToast?.("success", "✅ Logged out successfully");
      router.push("/");


    } else {
      showToast?.("destructive", `⚠️ ${data?.message}` || 'Something went wrong');
    }
  } catch (error: any) {
    console.error("❌ Error in logout -->", error?.response?.data || error.message);
    setUser(null);
    setAuthenticated(false);
    showToast?.("destructive", "❌ Error logging out");
  }
};



//  patient signup api call ⭐⭐

export const handlePatientSignup = async ( name: string, email: string, password: string, router: any, showToast?: ShowToastFn) => {

  const { setUser, setAuthenticated } = useStore.getState();
  console.log("Doctor Signup");
  try {
    const res = await axios.post(`${BASE_URL}/auth/patient/register`, { name, email, password }, { withCredentials: true })
    const data = await res.data
    if (data?.message === "Patient registered successfully") {
      setUser(data.patient)
      setAuthenticated(true)
      showToast?.("success", "✅ User Registered successfully");
      router.push("/patient/dashboard");
    } else {
      showToast?.("destructive", `⚠️ ${data?.message}` || 'Something went wrong ');
    }

  } catch (error: any) {
    console.error("❌ Error in Patient Signup -->", error?.response?.data || error.message);
    setUser(null);
    setAuthenticated(false);
    showToast?.("destructive", "❌ Something went wrong while registration");
  }
};



//  patient login api call ⭐⭐

export const handlePatientLogin = async ( email: string, password: string, router: any, showToast?: ShowToastFn) => {
  const { setUser, setAuthenticated } = useStore.getState();
  console.log("Doctor sign in");
  try {
    const res = await axios.post(`${BASE_URL}/auth/patient/login`, { name, email, password }, { withCredentials: true })
    const data = await res.data
    if (data?.message === "Login successful") {
      setUser(data.patient)
      setAuthenticated(true)
      showToast?.("success", "✅ Login successful");
      router.push("/patient/dashboard");
    } else {
      showToast?.("destructive", `⚠️ ${data?.message}` || 'Something went wrong ');
    }

  } catch (error: any) {
    console.error("❌ Error in Patient Login -->", error?.response?.data || error.message);
    setUser(null);
    setAuthenticated(false);
    showToast?.("destructive", "❌ Something went wrong while login");
  }
};



//  handle Google login 

export const callGoogleLoginApi = async(role:string) =>{
  console.log('google login api')
  try {
     window.location.href = `${BASE_URL}/auth/google?role=${role}`
  } catch (error) {
    
  }
} 