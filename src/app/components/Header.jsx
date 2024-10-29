"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white  relative">
      <nav className="container mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={"/assets/logo.jpg"}
            height={100}
            width={100}
            alt="Nike Logo"
          />
        </Link>

        {/* Main Navigation - Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {[
            ["New", "/new"],
            ["Men", "/men"],
            ["Women", "/women"],
            ["Kids", "/kids"],
            ["Jordan", "/jordan"],
            ["Sale", "/sale"],
          ].map(([title, url]) => (
            <Link
              key={title}
              href={url}
              className="text-black text-[16px] font-medium relative group"
            >
              {title}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent border-none outline-none ml-2 w-40 text-black"
            />
          </div>

          {/* Mobile Search Icon */}
          <button className="md:hidden">
            <Search className="w-6 h-6 text-black" />
          </button>

          {/* Favorites */}
          <button>
            <Heart className="w-6 h-6 text-black hover:text-red-600 hover:fill-red-600" />
          </button>

          {/* Shopping Bag */}
          <button>
            <ShoppingBag className="w-6 h-6 text-black" />
          </button>

          {/* Mobile Menu Button - Now on the right */}
          <button
            className="md:hidden text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-4/5 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-end">
          <button onClick={() => setIsMenuOpen(false)} className="p-4">
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-4 space-y-1">
          {[
            ["New & Featured", "/new"],
            ["Men", "/men"],
            ["Women", "/women"],
            ["Kids", "/kids"],
            ["Jordan", "/jordan"],
            ["Sale", "/sale"],
          ].map(([title, url]) => (
            <Link
              key={title}
              href={url}
              className="flex items-center justify-between py-4 px-2 text-lg hover:bg-gray-100 text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              {title}
              <span className="text-black">›</span>
            </Link>
          ))}

          {/* Branded Links */}
          <div className="pt-6 space-y-4">
            <Link
              href="/jordan"
              className="flex items-center gap-2 py-2 text-black"
            >
              <span className="font-medium">Jordan</span>
            </Link>
            <Link
              href="/converse"
              className="flex items-center gap-2 py-2 text-black"
            >
              <span className="font-medium">Converse</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
