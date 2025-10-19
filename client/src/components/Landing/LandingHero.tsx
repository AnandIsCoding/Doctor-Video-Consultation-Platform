"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { healthcareCategories } from "@/lib/constants";
import { useRouter } from "next/navigation";
import useStore from "@/store/authStore";

function LandingHero() {
  const router = useRouter();
  const { authenticated, user } = useStore();

  const handleCategoryClick = (title: string) => {
    if (authenticated) {
      router.push(`/doctor-list?category=${title}`);
    } else {
      router.push(`/login/patient?redirect=/doctor-list?category=${title}`);
    }
  };

  const handleBookVisit = () => {
    if (authenticated) {
      router.push(`/doctor-list`);
    } else {
      router.push(`/login/patient?redirect=/doctor-list`);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-center">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-700 to-indigo-600 animate-gradient-x">
            The place where
          </span>
          <span className="block  text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 animate-gradient-x">
            Doctors listen — to you
          </span>
        </h1>

        <p className="text-lg md:text-md text-gray-600 mb-12 max-w-2xl mx-auto">
          Online primary care that's affordable, with or without insurance.
          Quality healthcare, accessible anytime, anywhere.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            onClick={handleBookVisit}
            className="bg-gradient-to-r cursor-pointer from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-full px-8 py-3 text-lg text-white shadow-lg transition-all duration-300 hover:scale-105"
          >
            Book a Video Visit
          </Button>

          {authenticated && user && user?.role === "doctor" ? (
            <>
              <Link href={`/${user?.role}/dashboard`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-blue-700 w-full cursor-pointer border-blue-700 rounded-full px-8 py-3 text-lg hover:bg-blue-50 transition-all duration-300"
                >
                  Dashboard
                </Button>
              </Link>
              {user.role === "doctor" && (
                <Link href="/doctor/appointments">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-blue-700 w-full cursor-pointer border-blue-700 rounded-full px-8 py-3 text-lg hover:bg-blue-50 transition-all duration-300"
                  >
                    Appointments
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link href="/login/doctor">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-blue-700 hover:scale-105 w-full cursor-pointer border-blue-700 rounded-full px-8 py-3 text-lg hover:bg-blue-50 transition-all duration-300"
                >
                  Login as Doctor
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Healthcare categories */}
        <div className="py-6">
          <div className="flex justify-center items-center overflow-x-auto gap-6 pb-2 scrollbar-hide">
            {healthcareCategories?.map((category) => (
              <button
                key={category?.id}
                className="flex flex-col cursor-pointer items-center bg-white shadow-md rounded-xl p-4 min-w-[100px] hover:shadow-xl hover:scale-105 transition-all duration-200"
                onClick={() => handleCategoryClick(category?.title)}
              >
                <div
                  className={`w-12 h-12 ${category.color} rounded-2xl flex items-center justify-center mb-2`}
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
                <span className="text-xs font-medium text-center text-blue-900">
                  {category?.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 mt-8">
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
