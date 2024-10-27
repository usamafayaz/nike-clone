import Image from "next/image";
import React from "react";

const NewSale = () => {
  return (
    <div className="bg-white flex flex-col items-center pt-20">
      <p className="text-black font-nike text-6xl bg-clip-text">
        NEW THIS WEEK
      </p>
      <p className="text-black font-normal text-lg bg-clip-text mt-2">
        Featuring Jalen Brunson in the new Nike City{" "}
      </p>
      <button className="bg-black rounded-full px-5 py-2 m-8 hover:bg-stone-600">
        <p className="text-white font-semibold text-md">Shop New Arrivals</p>
      </button>
      <div className=" relative w-full" style={{ aspectRatio: "3/1" }}>
        <Image
          src="/assets/banner.png"
          alt="Banner Image"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default NewSale;
