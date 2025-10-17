"use client";

import React, { useState } from "react";
import { faqs } from "@/lib/constants";

// Define the FAQ item type for better type safety
interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Font styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <div className="max-w-5xl mt-8 mb-8 mx-auto flex flex-col md:flex-row items-start justify-center gap-10 px-4 md:px-0 py-10">
        {/* 👨‍⚕️ Thematic image for doctor consultation platform */}
        <img
          className="max-w-sm w-full   rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          src="https://res.cloudinary.com/dm0rlehq8/image/upload/v1741023800/Doctor-Appointment-Booking-System/j8unbx9xommekwv9gzct.jpg"
          alt="Doctor consultation"
        />

        {/* FAQ Content */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-gray-800 mt-1">
            Have Questions? We’ve Got Answers.
          </h1>

          {/* FAQ Items */}
          {faqs.map((faq: FAQItem, index: number) => (
            <div
              key={index}
              onClick={() => handleToggle(index)}
              className="border-b border-slate-200 py-4 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {faq.question}
                </h3>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transform transition-transform duration-500 ease-in-out ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                    stroke="#1D293D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Expandable answer */}
              <p
                className={`text-sm text-slate-600 overflow-hidden transition-all duration-500 ease-in-out max-w-md ${
                  openIndex === index
                    ? "opacity-100 max-h-[300px] translate-y-0 pt-3"
                    : "opacity-0 max-h-0 -translate-y-2"
                }`}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <br></br>
       <div className="flex flex-col md:flex-row items-center justify-around text-sm  rounded-md mt-2 w-[99%] overflow-hidden bg-white ">
        
            <div className="flex flex-col text-center md:text-left items-center md:items-start pt-14 md:p-10">
                <h2 className="md:text-4xl text-2xl font-semibold text-gray-800">Download Mobile App</h2>
                <p className="text-gray-700 mt-2 w-3/4">Mobile DOctor Booking App for iOS & Android to book your consultation online.</p>
        
                <div className="flex items-center gap-4 mt-6">
                    <button aria-label="googlePlayBtn" className="active:scale-95 transition-all" type="button">
                        <img className="md:w-44 w-28"
                            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/googlePlayBtn.svg"
                            alt="googlePlayBtn" />
                    </button>
                    <button aria-label="appleStoreBtn" className="active:scale-95 transition-all" type="button">
                        <img className="md:w-44 w-28"
                            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/appleStoreBtn.svg"
                            alt="appleStoreBtn" />
                    </button>
                </div>
            </div>
        
            <img className="max-w-[375px] pt-10 md:p-0"
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/excitedWomenImage.png"
                alt="excitedWomenImage" />
        </div>
    </>
  );
};

export default FAQ;
