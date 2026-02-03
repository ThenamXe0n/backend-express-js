import React, { useState } from "react";
import ProductDisplayCard from "../cards/ProductDisplayCard";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { fetchApprovedProductAPI } from "../../services/apiCollection";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard";
import ProductHeader from "../headers/ProductHeader";

const ProductShowcase = () => {
  const { productList, totalProduct } = useSelector((state) => state.products);
  // const [layoutView, setLayoutView] = useState("list");

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
    <div className="py-3  h-full">
      {/* header */}
      <ProductHeader />

      {/* product list section  */}
      {productList?.length > 0 ? (
        <div className="grid gap-10  md:w-full justify-items-center grid-cols-1 h-full overflow-scroll  sm:grid-cols-2 md:grid-cols-4 ">
          {Array.isArray(productList) &&
            productList.map((item, itemIdx) => (
              <ProductCard key={itemIdx} product={item} />
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
