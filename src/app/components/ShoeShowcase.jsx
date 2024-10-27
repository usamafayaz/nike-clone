"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const shoes = [
  { id: 1, name: "Dunk", image: "/assets/dunk.png" },
  { id: 2, name: "Air Force 1", image: "/assets/airforce1.png" },
  { id: 3, name: "Blazer", image: "/assets/blazer.png" },
  { id: 4, name: "Vomero", image: "/assets/vomero.png" },
  { id: 5, name: "Air Max", image: "/assets/airmax.png" },
  { id: 6, name: "Cortez", image: "/assets/cortez.png" },
  { id: 7, name: "Air Jordan 1", image: "/assets/airjordan.png" },
];

const ShoeShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePrevious = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? shoes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === shoes.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Create an extended array of shoes for infinite scroll effect
  const displayedShoes = [...shoes.slice(-2), ...shoes, ...shoes.slice(0, 3)];

  const translateX = -((currentIndex + 2) * 20);

  // Handle transition end
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <section className="w-full bg-white">
      <div className="relative bg-white">
        <div className="max-w-[1400px] mx-auto px-4 pt-20 pb-8">
          <h1 className="text-5xl font-black mb-12 font-nike text-black ml-4">
            SHOP BY CLASSICS
          </h1>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className={`flex ${
                  isTransitioning
                    ? "transition-transform duration-300 ease-in-out"
                    : ""
                }`}
                style={{ transform: `translateX(${translateX}%)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                {displayedShoes.map((shoe, index) => (
                  <div
                    key={`${shoe.id}-${index}`}
                    className="w-[18%] flex-shrink-0 mx-[1%] group"
                  >
                    <div className="relative bg-black h-44 md:h-72 w-28 md:w-56 w overflow-hidden rounded-sm">
                      <div className="transform transition-transform durat1ion-300 ease-in-out group-hover:scale-110 h-full">
                        <Image
                          fill
                          src={shoe.image}
                          alt={shoe.name}
                          className="w-full aspect-square object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
                      <p className="absolute bottom-0 w-full text-white text-lg font-bold p-2 text-center ">
                        {shoe.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handlePrevious}
              className="absolute left-10 top-1/2 -translate-y-1/2 -translate-x-6 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
              aria-label="Previous shoe"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-10 top-1/2 -translate-y-1/2 translate-x-6 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
              aria-label="Next shoe"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoeShowcase;
