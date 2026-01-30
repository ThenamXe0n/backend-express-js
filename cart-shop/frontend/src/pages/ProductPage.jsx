import React from "react";
import ProductShowcase from "../components/sections/ProductShowcase";

const ProductPage = () => {
  return (
    <div className="h-screen w-screen flex gap-2 items-stretch ">
      {/* filter section */}
      <div className=" w-xs ">

      </div>
      {/* product showcase section  */}
      <div className="w-full  flex-1 ">
        <ProductShowcase/>
      </div>
    </div>
  );
};

export default ProductPage;
