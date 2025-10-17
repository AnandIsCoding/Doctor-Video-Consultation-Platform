'use client';
import FAQ from "@/components/Landing/FAQ";
import Footer from "@/components/Landing/Footer";
import Header from "@/components/Landing/Header";
import LandingHero from "@/components/Landing/LandingHero";
import Testimonial from "@/components/Landing/Testimonial";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  const user = {
    role:'patient'
  }
  useEffect(()=>{
    if(user?.role === 'doctor'){
      router.replace('/doctor/dashboard')
    }
  },[user])
  return (
    <div className="min-h-screen">
      <Header showDashboardNav={true} />
      <main className="pt-16">
        <LandingHero/>
        <Testimonial/>
        <FAQ/>
        <Footer/>
      </main>
    </div>
  );
}
