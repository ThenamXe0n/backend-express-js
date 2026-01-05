export default function ProductCard({
  name,
  thumbnail,
  price,
  mrp,
  brand,
  category,
  onBuy,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 w-64 hover:shadow-md transition">
      {/* Image */}
      <div className="w-full h-36 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={thumbnail}
          alt={name}
          className="h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
          {name}
        </h3>

        <p className="text-xs text-gray-500">
          Brand: <span className="text-gray-700">{brand || "Unknown"}</span>
        </p>

        <p className="text-xs text-gray-500">
          Category: <span className="text-gray-700">{category || "General"}</span>
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-bold text-black">₹{price}</span>
          <span className="text-sm text-gray-400 line-through">
            ₹{mrp}
          </span>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={onBuy}
        className="mt-4 w-full border border-black text-black py-2 rounded-lg hover:bg-black hover:text-white transition"
      >
        Buy Now
      </button>
    </div>
  );
}
