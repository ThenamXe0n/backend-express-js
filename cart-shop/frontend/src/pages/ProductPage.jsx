import React, { useState } from "react";
import ProductShowcase from "../components/sections/ProductShowcase";
import FilterSidebar from "../components/FilterSideBar";

const ProductPage = () => {
  const [filters, setFilters] = useState({
  price: 150000,
  brand: [],
  category: [],
  color: [],
});
  return (
    <div className="h-screen  flex gap-2 items-stretch ">
      {/* filter section */}
      <div className=" w-xs ">
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          brands={["Samsung", "Apple", "OnePlus"]}
          categories={["Smartphones", "Tablets"]}
          colors={["#000000", "#ffffff", "#0f172a", "#64748b"]}
        />
      </div>
      {/* product showcase section  */}
      <div className="w-full  flex-1 ">
        <ProductShowcase />
      </div>
    </div>
  );
};

export default ProductPage;
