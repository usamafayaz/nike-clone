// src/app/page.jsx
import HeroBanner from "./components/HeroBanner";
import ShoeShowcase from "./components/ShoeShowcase";
import BannerImage from "./components/BannerImage";
import ShoeViewer3D from "./components/ShoeModel";

const Home = () => {
  return (
    <div className="container mx-auto">
      <HeroBanner />
      <BannerImage />
      <ShoeShowcase />
      <ShoeViewer3D />
    </div>
  );
};

export default Home;
