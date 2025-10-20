'use client';

import { useEffect, useState } from "react";
import FAQ from "@/components/Landing/FAQ";
import Footer from "@/components/Landing/Footer";
import Header from "@/components/Landing/Header";
import LandingHero from "@/components/Landing/LandingHero";
import Testimonial from "@/components/Landing/Testimonial";
import useStore from "@/store/authStore";
import { getProfile } from "@/api/apiCall";

export default function Home() {
  const { authenticated, user } = useStore();
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  useEffect(() => {
    getProfile();
  }, []);

  // ✅ Show welcome message when user data is available
  useEffect(() => {
    if (user && user.name && user.role) {
      setShowWelcome(true);

      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <div className="min-h-screen relative">
      <Header showDashboardNav={true} />

      {showWelcome && (
  <div
    className="fixed top-20 md:top-24 left-1/2 -translate-x-1/2 
    w-[90%] md:w-fit px-4 md:px-6 py-3 
    text-sm md:text-base text-center 
    bg-black text-white rounded-lg shadow-lg 
    z-50 transition-all duration-300"
  >
    👋 Welcome {user?.role} {user?.name}
  </div>
)}


      <main className="pt-16">
        <LandingHero />
        <Testimonial />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}
