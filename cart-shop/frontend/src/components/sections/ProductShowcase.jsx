import { LayoutGrid, Rows2 } from "lucide-react";
import React, { useState } from "react";
import ProductDisplayCard from "../cards/ProductDisplayCard";

const activeStyle = "size-8 p-1 bg-white rounded-md text-cyan-400";
const deActiveStyle = "size-8 p-1 ";

const ProductShowcase = () => {
  const [layoutView, setLayoutView] = useState("list");
  return (
    <div className="py-3 h-full">
      {/* header */}
      <div className="w-full flex px-5 items-center justify-between">
        <div className="w-fit flex py-2 px-2 bg-gray-300/80 rounded-md">
          <div
            onClick={() => setLayoutView("grid")}
            className={layoutView === "grid" ? activeStyle : deActiveStyle}
          >
            <LayoutGrid />
          </div>
          <div
            onClick={() => setLayoutView("list")}
            className={layoutView !== "grid" ? activeStyle : deActiveStyle}
          >
            <Rows2 />
          </div>
        </div>

        <div className=" bg-gray-300/80 rounded-md px-5 py-2 capitalize font-bold">
          sorted by : <span className="text-cyan-400">Popular</span>{" "}
        </div>
      </div>
      <hr className="my-6" />
      {/* product list section  */}
      <div className="grid gap-4 justify-items-center grid-cols-1  sm:grid-cols-2 md:grid-cols-3 ">
        <ProductDisplayCard stock={1} />
        <ProductDisplayCard />
        <ProductDisplayCard  stock={100}/>
        <ProductDisplayCard />
        <ProductDisplayCard />
        <ProductDisplayCard />
      </div>
    </div>
  );
};

export default ProductShowcase;
