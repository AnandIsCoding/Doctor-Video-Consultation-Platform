"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { healthcareCategories } from "@/lib/constants";
import { useRouter } from "next/navigation";

function LandingHero() {
  // category selection handler function
  const router = useRouter();
  const isAuthenticated = false;
  const handleCategoryClick = (title: string) => {
    console.log(`${title} category clicked`);
    if (isAuthenticated) {
      router.push(`/doctor-list?category=${title}`);
    } else {
      router.push(`/login/patient?redirect=/doctor-list?category=${title}`);
    }
  };

  // book visit btn handler
  const handleBookVisit = () => {
    if (isAuthenticated) {
      router.push(`/doctor-list`);
    } else {
      router.push(`/login/patient?redirect=/doctor-list`);
    }
  };
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-[black] leading-tight mb-6">
          The place where
          <br />
          <span className="text-[black]">Doctor listens - to you</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Online primary care that's affordable with or without insurance.
          Quality healthcare, accessible anytime, anywhere.
        </p>
        {/* buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            onClick={handleBookVisit}
            className=" cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full px-8 py-3 text-lg"
          >
            Book a video visit
          </Button>
          <Link href="/login/doctor">
            <Button
              variant="outline"
              size="lg"
              className="text-blue-600  cursor-pointer w-full border-blue-600  to-blue-700 hover:bg-blue-50  rounded-full px-8 py-3 text-lg"
            >
              Login as a doctor
            </Button>
          </Link>
        </div>

        {/* healthcare categories */}
        <div className="py-6">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center overflow-x-auto gap-6 pb-2 scrollbar-hide mx-auto">
              {healthcareCategories?.map((category) => (
                <button
                  key={category?.id}
                  className="flex flex-col items-center cursor-pointer  bg-white shadow-md rounded-lg p-4 min-w-[100px] hover:shadow-lg  hover:scale-105 transition-all duration-200"
                  onClick={() => handleCategoryClick(category?.title)}
                >
                  <div
                    className={`w-12 h-12 cursor-pointer ${category.color} rounded-2xl flex items-center justify-center mb-2 group-hover:shadow-xl transition-all duration-200`}
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d={category?.icon} />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-center leading-tight text-blue-900 ">
                    {category?.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trust indicator */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 mt-2 ">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>120+ Certified Doctors</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>50,000+ Satisfied Patients</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>24/7 Available</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;
