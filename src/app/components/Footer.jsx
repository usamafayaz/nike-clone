"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-white pt-6">
      <div className="max-w-[1400px] mx-auto px-4 py-4 flex justify-center items-center">
        <div className="mb-4 items-center flex flex-col">
          <Image
            src="/assets/logo.jpg"
            alt="Nike"
            width={70}
            height={25}
            className="mb-6"
          />
          <div className="flex gap-8 text-sm">
            <Link
              href="/find-store"
              className="transition-colors text-black hover:text-stone-600 font-medium"
            >
              Find a Store
            </Link>
            <Link
              href="/help"
              className="transition-colors text-black hover:text-stone-600 font-medium"
            >
              Help
            </Link>
            <Link
              href="/join-us"
              className="transition-colors text-black hover:text-stone-600 font-medium"
            >
              Join Us
            </Link>
            <Link
              href="/sign-in"
              className="transition-colors text-black hover:text-stone-600 font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
      {/* Footer Links */}
      <div className="max-w-[1400px] mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-start gap-4 md:gap-6 text-[12px] text-gray-500">
          <p className="text-center md:text-left">
            © 2024 Nike, Inc. All Rights Reserved
          </p>
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-6">
            <button className="flex items-center hover:text-gray-700">
              Guides
              <svg
                className="w-3 h-3 ml-1"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 4.5L6 8L9.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <Link href="/terms-of-sale" className="hover:text-gray-700">
              Terms of Sale
            </Link>
            <Link href="/terms-of-use" className="hover:text-gray-700">
              Terms of Use
            </Link>
            <Link href="/privacy-policy" className="hover:text-gray-700">
              Privacy Policy
            </Link>
            <button className="flex items-center hover:text-gray-700">
              Privacy Choices
            </button>
            <Link href="/ca-supply-chains" className="hover:text-gray-700">
              CA Supply Chains
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
