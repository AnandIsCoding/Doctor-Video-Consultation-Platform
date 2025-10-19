import useStore from "@/store/authStore";
import axios from "axios";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// define type for showToast
export type ShowToastFn = (type: "success" | "destructive" | "default", message: string) => void;

// ✅ Get Profile
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

// ✅ Logout User
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



//  patient signup ⭐⭐

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
      router.push("/");
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



//  patient login

export const handlePatientLogin = async ( email: string, password: string, router: any, showToast?: ShowToastFn) => {

  const { setUser, setAuthenticated } = useStore.getState();
  console.log("Doctor Signin");
  try {
    const res = await axios.post(`${BASE_URL}/auth/patient/login`, { name, email, password }, { withCredentials: true })
    const data = await res.data
    if (data?.message === "Login successful") {
      setUser(data.patient)
      setAuthenticated(true)
      showToast?.("success", "✅ Login successful");
      router.push("/");
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

