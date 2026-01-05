import React from "react";
import ProductUploadForm from "../components/forms/ProductUploadForm";
import { useState } from "react";
import ProductList from "../components/ProductList";
import { useEffect } from "react";
import { getAllProductsAPI } from "../services/apiCollection";

function ManageProducts() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    async function loadProduct() {
      let data = await getAllProductsAPI();
      setProductList(data);
    }
    loadProduct()
  }, []);
  return (
    <section>
      <h1 className="bg-black p-5 text-white text-2xl">Manage Products</h1>
      <ProductUploadForm setProductList={setProductList} />
      <div className="max-w-4xl p-3 mx-auto space-y-4 ">
        <h5 className="text-2xl font-bold">Uploaded Products</h5>
        <ProductList products={productList} />
      </div>
    </section>
  );
}

export default ManageProducts;
