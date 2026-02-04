import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import CardLoader from "../components/ui/CardLoader";
import { fetchSingleProductByProductCodeAsync } from "../redux/productSlice";
import { BreadCrumbs } from "../components/ui/microUiComponent";
import {
  ShoppingBasket,
  Heart,
  Share2,
  Star,
  Check,
  VanIcon,
  LockKeyhole,
  ArrowDownRightFromCircle,
} from "lucide-react";
import { routePath } from "../routes/routePath";
import { Notify } from "notiflix";
import { addItemToCartAsync } from "../redux/cartSlice";

function ProductDetailPage() {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { selectedProduct, isLoading } = useSelector((s) => s.products);
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  const featuresHeading = Object.keys(selectedProduct?.features || {});

  const handleAddToCart = (item) => {
    if (isLoggedIn !== "cart-shop-logined") {
      navigate(routePath.LOGIN);
      Notify.info("Login to add item to cart!");
      return;
    }

    let payload = { item, quantity: 1 };
    dispatch(addItemToCartAsync(payload));
    Notify.success(`${item?.name} added to cart!`);
  };

  useEffect(() => {
    dispatch(fetchSingleProductByProductCodeAsync(params.productCode));
  }, [dispatch, params.productCode, pathname]);

  useEffect(() => {
    if (selectedProduct?.thumbnail) {
      setSelectedImage(selectedProduct.thumbnail);
    }
  }, [selectedProduct]);

  const discount = selectedProduct?.mrp
    ? Math.round(
        ((selectedProduct.mrp - selectedProduct.price) / selectedProduct.mrp) *
          100,
      )
    : 0;

  return (
    <>
      {isLoading ? (
        <CardLoader />
      ) : (
        <div className="w-11/12 max-w-7xl mx-auto py-6">
          <BreadCrumbs path={pathname} />

          <div className="grid lg:grid-cols-2 gap-8 mt-6">
            {/* Image Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl overflow-hidden border border-indigo-100 shadow-lg">
                <div className="aspect-square flex items-center justify-center p-8">
                  <img
                    src={selectedImage || selectedProduct?.thumbnail}
                    alt={selectedProduct?.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {selectedProduct?.images?.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                      selectedImage === img
                        ? "border-indigo-600 shadow-md"
                        : "border-gray-200 hover:border-indigo-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Product view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              {/* Brand & Category */}
              <div className="flex items-center gap-3 text-sm">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium capitalize">
                  {selectedProduct?.brand}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium capitalize">
                  {selectedProduct?.category}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 capitalize leading-tight">
                {selectedProduct?.name}
              </h1>

              {/* Rating & Stock */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-gray-600">(4.5)</span>
                </div>
                {selectedProduct?.stock > 0 && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {selectedProduct.stock} in stock
                    </span>
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-indigo-900">
                    ₹{selectedProduct?.price?.toLocaleString("en-IN")}
                  </span>
                  {selectedProduct?.mrp && (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                        ₹{selectedProduct.mrp.toLocaleString("en-IN")}
                      </span>
                      <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                        {discount}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Inclusive of all taxes
                </p>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedProduct?.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleAddToCart(selectedProduct)}
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300"
                >
                  <ShoppingBasket className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="px-4 py-4 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 active:scale-95">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="px-4 py-4 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 active:scale-95">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Specifications */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                  <h3 className="text-xl font-semibold text-white">
                    Specifications
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {featuresHeading.map((heading, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-2 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-700 capitalize">
                        {heading}
                      </span>
                      <span className="text-gray-600">
                        {selectedProduct?.features[heading]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1 flex flex-col items-center">
                    <VanIcon size={40} />
                  </div>
                  <p className="text-lg text-gray-600 font-medium">
                    Free Delivery
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1 flex flex-col items-center">
                    <LockKeyhole size={40} />
                  </div>
                  <p className="text-lg text-gray-600 font-medium">
                    Secure Payment
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1 flex flex-col items-center">
                    <ArrowDownRightFromCircle size={40} />
                  </div>
                  <p className="text-lg text-gray-600 font-medium">
                    Easy Returns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetailPage;
