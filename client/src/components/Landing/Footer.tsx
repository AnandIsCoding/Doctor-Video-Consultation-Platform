"use client";

import React from "react";
import Link from "next/link";
import { footerSections } from "@/lib/constants";

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-500/90 bg-gray-50 pt-10 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-gray-200">
      {/* Top Section */}
      <div className="flex flex-wrap justify-between gap-12 md:gap-8">
        {/* Brand Info */}
        <div className="max-w-80">
          
          <p className="text-sm leading-relaxed">
            Connecting patients with licensed doctors for convenient, secure,
            and affordable virtual consultations. Your health, our priority.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-5 text-gray-600">
            {[
              {
                label: "Instagram",
                path: (
                  <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM4.5 7.75A3.25 3.25 0 017.75 4.5h8.5a3.25 3.25 0 013.25 3.25v8.5a3.25 3.25 0 01-3.25 3.25h-8.5a3.25 3.25 0 01-3.25-3.25v-8.5zm9.5 1a4 4 0 11-4 4 4 4 0 014-4zm0 1.5a2.5 2.5 0 102.5 2.5 2.5 2.5 0 00-2.5-2.5zm3.5-.75a.75.75 0 11.75-.75.75.75 0 01-.75.75z" />
                ),
              },
              {
                label: "Facebook",
                path: (
                  <path d="M13.5 9H15V6.5h-1.5c-1.933 0-3.5 1.567-3.5 3.5v1.5H8v3h2.5V21h3v-7.5H16l.5-3h-3z" />
                ),
              },
              {
                label: "Twitter",
                path: (
                  <path d="M22 5.92a8.2 8.2 0 01-2.36.65A4.1 4.1 0 0021.4 4a8.27 8.27 0 01-2.6 1A4.14 4.14 0 0016 4a4.15 4.15 0 00-4.15 4.15c0 .32.04.64.1.94a11.75 11.75 0 01-8.52-4.32 4.14 4.14 0 001.29 5.54A4.1 4.1 0 013 10v.05a4.15 4.15 0 003.33 4.07 4.12 4.12 0 01-1.87.07 4.16 4.16 0 003.88 2.89A8.33 8.33 0 012 19.56a11.72 11.72 0 006.29 1.84c7.55 0 11.68-6.25 11.68-11.67 0-.18 0-.35-.01-.53A8.18 8.18 0 0022 5.92z" />
                ),
              },
              {
                label: "LinkedIn",
                path: (
                  <path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48c0 1.1.88 1.98 1.98 1.98h.02c1.1 0 1.98-.88 1.98-1.98C6.98 4.38 6.1 3.5 4.98 3.5zM3 8.75h3.96V21H3V8.75zm6.25 0h3.8v1.68h.05c.53-.98 1.82-2.02 3.75-2.02 4.01 0 4.75 2.64 4.75 6.07V21H17v-5.63c0-1.34-.03-3.07-1.88-3.07-1.88 0-2.17 1.47-2.17 2.98V21H9.25V8.75z" />
                ),
              },
            ].map((icon, index) => (
              <a
                key={index}
                href="#"
                aria-label={icon.label}
                className="hover:text-blue-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {icon.path}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Dynamic Footer Sections */}
        {footerSections.map((section) => (
          <div key={section.title}>
            <p className="text-lg text-gray-800 font-semibold mb-3">
              {section.title}
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              {section.links.map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>


      {/* Bottom Section */}
      <hr className="border-gray-300 mt-10" />
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between py-6 text-sm">
        <p>
          © {new Date().getFullYear()}{" "}
          <a href="/" className="text-blue-600 hover:underline font-medium">
            HealthCare+
          </a>
          . All rights reserved.
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/privacy" className="hover:text-blue-600">
              Privacy
            </Link>
          </li>
          <li>
            <Link href="/terms" className="hover:text-blue-600">
              Terms
            </Link>
          </li>
          <li>
            <Link href="/sitemap" className="hover:text-blue-600">
              Sitemap
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
