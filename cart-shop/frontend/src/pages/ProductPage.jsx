import React, { useState } from "react";
import ProductShowcase from "../components/sections/ProductShowcase";
import FilterSidebar from "../components/FilterSideBar";
import { BreadCrumbs } from "../components/ui/microUiComponent";
import { useLocation } from "react-router";

const ProductPage = () => {
  const { pathname } = useLocation();
  const [filters, setFilters] = useState({
    price: 150000,
    brand: [],
    category: [],
    color: [],
  });
  return (
    <div className="w-11/12 mx-auto">
      <BreadCrumbs path={pathname} />
      <div className="h-screen  mx-auto  flex gap-2 items-stretch ">
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
    </div>
  );
};

export default ProductPage;
