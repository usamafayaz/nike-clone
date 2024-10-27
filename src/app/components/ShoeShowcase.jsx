"use client";
import React, { useState, useEffect, useRef } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? shoes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === shoes.length - 1 ? 0 : prev + 1));
  };

  // Touch handlers for mobile
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrevious();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isMobile) {
        if (event.key === "ArrowLeft") {
          handlePrevious();
        } else if (event.key === "ArrowRight") {
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobile]);

  const displayedShoes = isMobile
    ? shoes
    : [...shoes.slice(-2), ...shoes, ...shoes.slice(0, 3)];

  const translateX = isMobile
    ? -(currentIndex * 100)
    : -((currentIndex + 2) * 20);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <section className="w-full bg-white">
      <div className="relative bg-white">
        <div className="max-w-[1400px] mx-auto px-4 pt-20 pb-8">
          <h1 className="text-3xl md:text-5xl font-black mb-8 md:mb-12 font-nike text-black ml-4">
            SHOP BY CLASSICS
          </h1>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                ref={sliderRef}
                className={`flex ${
                  isTransitioning
                    ? "transition-transform duration-300 ease-in-out"
                    : ""
                }`}
                style={{ transform: `translateX(${translateX}%)` }}
                onTransitionEnd={handleTransitionEnd}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {displayedShoes.map((shoe, index) => (
                  <div
                    key={`${shoe.id}-${index}`}
                    className={`${
                      isMobile ? "w-full" : "w-[18%]"
                    } flex-shrink-0 ${isMobile ? "mx-0" : "mx-[1%]"} group`}
                  >
                    <div className="relative bg-black h-[400px] md:h-72 w-full md:w-56 overflow-hidden rounded-sm mx-auto">
                      <div className="transform transition-transform duration-300 ease-in-out group-hover:scale-110 h-full">
                        <Image
                          fill
                          src={shoe.image}
                          alt={shoe.name}
                          className="object-cover"
                          priority={index === currentIndex}
                        />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
                      <p className="absolute bottom-0 w-full text-white text-lg font-bold p-2 text-center">
                        {shoe.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {!isMobile && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoeShowcase;
