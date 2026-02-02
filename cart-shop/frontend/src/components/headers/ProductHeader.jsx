import React, { useState } from "react";
import { LayoutGrid, Rows2 } from "lucide-react";
const activeStyle = "size-8 p-1 bg-white rounded-md text-cyan-400";
const deActiveStyle = "size-8 p-1 ";

function ProductHeader() {
  const [layoutView, setLayoutView] = useState("list");

  return (
    <div className="w-full border-b border-gray-300 mb-3 pb-3 bg-white z-50 sticky top-0 flex px-5 items-center justify-between">
      <div className="w-fit flex py-2 px-3 shadow-inner shadow-blue-900 bg-gray-300/30 rounded-md">
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

      <div className=" bg-gray-300/30 shadow-inner shadow-blue-900 rounded-md px-5 py-2 capitalize font-bold">
        sorted by : <span className="text-cyan-400">Popular</span>{" "}
      </div>
    </div>
  );
}

export default ProductHeader;
