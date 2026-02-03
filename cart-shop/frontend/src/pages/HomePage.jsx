import React from "react";
import { useNavigate } from "react-router";
import {
  ShoppingBag,
  Truck,
  Shield,
  Headphones,
  ArrowRight,
  Package,
  Award,
} from "lucide-react";

function LandingPage() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Smartphones",
      count: "120+ Products",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    },
    {
      name: "Laptops",
      count: "85+ Products",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    },
    {
      name: "Accessories",
      count: "200+ Products",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    },
    {
      name: "Smart Watches",
      count: "65+ Products",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    },
  ];

  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Shipping",
      description: "On orders over ₹999",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Payment",
      description: "100% secure transactions",
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Dedicated support team",
    },
  ];

  const featuredProducts = [
    {
      name: "Samsung Galaxy S23 Ultra",
      price: "89,999",
      originalPrice: "1,24,999",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80",
      badge: "Bestseller",
    },
    {
      name: "MacBook Pro 14",
      price: "1,89,900",
      originalPrice: "2,09,900",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
      badge: "New",
    },
    {
      name: "Apple Watch Series 9",
      price: "45,900",
      originalPrice: "49,900",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
      badge: "Hot",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-50">
        <div className="w-11/12 max-w-7xl mx-auto py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-md">
                  Spring Collection 2026
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Premium Tech at
                <span className="text-indigo-600"> Unbeatable Prices</span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                Discover the latest smartphones, laptops, and accessories from
                top brands. Quality products with warranty and fast delivery.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => navigate("/products")}
                  className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors">
                  View Offers
                </button>
              </div>

              <div className="flex gap-12 pt-6 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-gray-900">10K+</div>
                  <div className="text-gray-600 text-sm">Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-gray-600 text-sm">Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">4.9</div>
                  <div className="text-gray-600 text-sm">Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80"
                  alt="Featured Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Premium Quality</div>
                    <div className="text-sm text-gray-600">Verified Products</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-11/12 max-w-7xl mx-auto py-16 border-b border-gray-100">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center space-y-3">
              <div className="w-14 h-14 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mx-auto">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="w-11/12 max-w-7xl mx-auto py-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-600">Browse our collection of premium products</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/products?category=${category.name.toLowerCase()}`)}
              className="group cursor-pointer"
            >
              <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600">{category.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-slate-50 py-16">
        <div className="w-11/12 max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Featured Products
            </h2>
            <p className="text-gray-600">Hand-picked products just for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredProducts.map((product, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="relative aspect-square bg-slate-100">
                  {product.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-md z-10">
                      {product.badge}
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="w-11/12 max-w-7xl mx-auto py-16">
        <div className="bg-indigo-600 rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-12 text-white space-y-6">
              <h2 className="text-4xl font-bold">
                Special Offer: Up to 50% Off
              </h2>
              <p className="text-indigo-100 text-lg">
                Limited time offer on selected smartphones and accessories.
                Don't miss out on these amazing deals.
              </p>
              <button className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors">
                Shop Sale
              </button>
            </div>
            <div className="hidden md:block h-full">
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80"
                alt="Promo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-50 py-16">
        <div className="w-11/12 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"
                alt="Shopping Experience"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Why Shop With Us?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We're committed to providing the best shopping experience with
                authentic products, competitive prices, and excellent customer
                service.
              </p>

              <div className="space-y-4">
                {[
                  "100% Authentic Products",
                  "Warranty on All Items",
                  "Fast & Secure Delivery",
                  "Easy Returns & Refunds",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/products")}
                className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-11/12 max-w-7xl mx-auto py-16">
        <div className="bg-slate-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get exclusive offers, new product updates, and special discounts
            delivered to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
            />
            <button className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;