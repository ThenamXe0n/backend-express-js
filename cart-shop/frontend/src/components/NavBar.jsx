import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Package,
  Home,
  ShoppingBag,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { routePath } from "../routes/routePath";

export default function NavBar() {
  const { pathname } = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check login status from session storage
    const loginStatus = sessionStorage.getItem("isLoggedIn");
    const details = sessionStorage.getItem("userDetail");

    if (loginStatus === "cart-shop-logined" && details) {
      setIsLoggedIn(true);
      try {
        setUserDetails(JSON.parse(details));
      } catch (e) {
        console.error("Error parsing user details:", e);
      }
    }
  }, [pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userDetail");
    setIsLoggedIn(false);
    setUserDetails(null);
    setShowUserMenu(false);
  };

  const NavLink = ({ icon: Icon, text, href = "#" }) => (
    <Link
      to={href}
      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
    >
      <Icon className="w-5 h-5" />
      <span>{text}</span>
    </Link>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Cart-Shop
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink icon={Home} text="Home" href={routePath.HOME} />
            <NavLink icon={ShoppingBag} text="Products" href={routePath.PRODUCT} />
            <NavLink icon={Package} text="My Orders" href={routePath.MYORDERS} />
            <NavLink icon={ShoppingCart} text="My Cart" href={routePath.MYCART} />
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn && userDetails ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-lg transition-all duration-200 border border-blue-200"
                >
                  <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {userDetails.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">
                      {userDetails.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {userDetails.role || "Customer"}
                    </p>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">
                        {userDetails.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {userDetails.email}
                      </p>
                      <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                        {userDetails.role || "Customer"}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to={routePath.LOGIN}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to={routePath.REGISTER}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slide-down">
            <div className="flex flex-col gap-2">
              <NavLink icon={Home} text="Home" href="#" />
              <NavLink icon={ShoppingBag} text="Products" href="#products" />
              <NavLink icon={Package} text="My Orders" href="#orders" />
              <NavLink icon={ShoppingCart} text="My Cart" href="#cart" />

              {isLoggedIn && userDetails ? (
                <>
                  <div className="mt-2 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {userDetails.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {userDetails.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {userDetails.email}
                        </p>
                      </div>
                    </div>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                      {userDetails.role || "Customer"}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <a
                    href="#login"
                    className="px-4 py-2 text-center text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200"
                  >
                    Login
                  </a>
                  <a
                    href="#register"
                    className="px-4 py-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md"
                  >
                    Register
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
}
