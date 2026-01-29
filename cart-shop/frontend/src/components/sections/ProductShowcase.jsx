import { LayoutGrid, Rows2 } from "lucide-react";
import React, { useState } from "react";
import ProductDisplayCard from "../cards/ProductDisplayCard";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { fetchApprovedProductAPI} from "../../services/apiCollection";
import { useSelector } from "react-redux";

const activeStyle = "size-8 p-1 bg-white rounded-md text-cyan-400";
const deActiveStyle = "size-8 p-1 ";

const ProductShowcase = () => {
  const {productList,totalProduct} = useSelector((state)=>state.products)
  const [layoutView, setLayoutView] = useState("list");

  // async function loadProduct() {
  //   try {
  //     let dataToSet = await fetchApprovedProductAPI();
  //     setProductList(dataToSet.data);
  //     toast.success(dataToSet.message, {
  //       position: "bottom-right",
  //     });
  //   } catch (error) {
  //     toast.error(error.message, {
  //       position: "bottom-right",
  //     });
  //   }
  // }

  // useEffect(() => {

  //   loadProduct();
  // }, []);

  return (
    <div className="py-3 h-full">
      {/* header */}
      <div className="w-full border-b border-gray-300 mb-3 pb-3 bg-white z-50 sticky top-0 flex px-5 items-center justify-between">
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

      {/* product list section  */}
      {productList?.length > 0 ? (
        <div className="grid gap-6 justify-items-center grid-cols-1 h-full overflow-scroll  sm:grid-cols-2 md:grid-cols-4 ">
          {Array.isArray(productList) &&
            productList.map((item, itemIdx) => (
              <ProductDisplayCard productCode={item.productCode} mrp={item.mrp}  key={itemIdx} stock={item.stock} brand={item.brand} img={item.thumbnail} name={item.name} price={item.price}  />
            ))}
        </div>
      ) : (
        <div>
          <h4>No product to show!! </h4>
        </div>
      )}
    </div>
  );
};

export default ProductShowcase;
