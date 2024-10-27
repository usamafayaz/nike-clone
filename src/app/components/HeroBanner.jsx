"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

const HeroBanner = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full">
      {/* Video Container */}
      <div className="w-full h-[400px] bg-black">
        <video
          ref={videoRef}
          className="w-full h-full"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-[48%] left-4 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      {/* Content Section - Now below the video */}
      <div className="flex items-center w-full bg-white py-12 px-4 md:px-8 ">
        <div className="max-w-7xl mx-auto flex items-center flex-col">
          <h1 className="font-bold text-[42px] md:text-[80px] leading-none mb-4 font-nike text-black ">
            "I AM THE PRESSURE"
          </h1>
          <p className="text-lg mb- text-black">
            LeBron doesn't duck pressure, he becomes it. The LeBron XXII is
            built to bring it.
          </p>
          <button className="bg-black rounded-full px-5 py-2 mt-8 hover:bg-stone-600">
            <p className="text-white font-semibold text-md">Explore</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
