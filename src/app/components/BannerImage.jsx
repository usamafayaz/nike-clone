import Image from "next/image";
import React from "react";

const BannerImage = () => {
  return (
    <div className=" relative w-full" style={{ aspectRatio: "3/1" }}>
      <Image
        src="/assets/banner.png"
        alt="Banner Image"
        fill
        className="object-cover"
      />
    </div>
  );
};

export default BannerImage;
