import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function ProductDetailPage() {
  const { productList } = useSelector((s) => s.products);
  const params = useParams();

  const selectedProduct = productList.find(
    (i) => i.productCode === params.productCode,
  );

  return (
    <div>
      product id is {params.productCode} and category is {params.category}{" "}
      selected product is {JSON.stringify(selectedProduct)}
    </div>
  );
}

export default ProductDetailPage;
