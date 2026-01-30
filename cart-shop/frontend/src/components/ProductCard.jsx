import { Link } from "react-router";
import { routePath } from "../routes/routePath";

const ProductCard = ({ product, onAddToCart }) => {
  const discountPercent = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100
  );

  return (
    <Link  to={`${routePath.PRODUCT}/${product?.brand}/${product?.productCode}`}  className="group relative w-full max-w-sm rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-2xl bg-gray-100">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="h-56 w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Discount badge */}
        {discountPercent > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="space-y-1 p-3">
        {/* Brand */}
        <p className="text-xs uppercase tracking-wide text-gray-500">
          {product.brand}
        </p>

        {/* Name */}
        <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
          {product.name}
        </h3>

        {/* Description */}
        <p className="line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ₹{product.mrp.toLocaleString()}
          </span>
        </div>

        {/* Stock */}
        <p
          className={`text-sm font-medium ${
            product.stock > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        {/* Add to Cart */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className="w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
