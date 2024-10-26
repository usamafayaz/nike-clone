// src/app/components/ProductCard.jsx
const ProductCard = () => {
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white">
      <img
        src="/file.svg"
        alt="Product"
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">Product Name</h3>
      <p className="text-gray-700">$99.99</p>
      <button className="mt-4 bg-black text-white px-4 py-2 rounded">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
