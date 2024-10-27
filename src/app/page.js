// src/app/page.jsx
import HeroBanner from "./components/HeroBanner";
import ShoeShowcase from "./components/ShoeShowcase";
import BannerImage from "./components/BannerImage";
import ShoeViewer3D from "./components/ShoeModel";
import NewSale from "./components/NewSale";

const Home = () => {
  return (
    <div className="container mx-auto">
      <HeroBanner />
      {/* <BannerImage /> */}
      <ShoeViewer3D />

      <NewSale />
      <ShoeShowcase />
    </div>
  );
};

export default Home;
