'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import FAQ from "@/components/Landing/FAQ";
import Footer from "@/components/Landing/Footer";
import Header from "@/components/Landing/Header";
import LandingHero from "@/components/Landing/LandingHero";
import Testimonial from "@/components/Landing/Testimonial";
import useStore from "@/store/authStore";
import axios from "axios";
import { getProfile } from "@/api/apiCall";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export default function Home() {
  const { authenticated, user, setUser, setAuthenticated } = useStore();
  const router = useRouter();

  console.log('authenticated --> ',authenticated)
  useEffect(()=>{
    getProfile()
  },[])


  // useEffect(() => {
  //   if (user && (user as any).role === "doctor") {
  //     router.replace("/doctor/dashboard");
  //   }
  // }, [user, router]);

  return (
    <div className="min-h-screen">
      <Header showDashboardNav={true} />
      <main className="pt-16">
        <LandingHero />
        <Testimonial />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}
