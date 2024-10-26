// src/app/page.jsx
import HeroBanner from "./components/HeroBanner";
import ProductCard from "./components/ProductCard";

const Home = () => {
  return (
    <div className="container mx-auto">
      <HeroBanner />
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Map through products here */}
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </section>
    </div>
  );
};

export default Home;
