import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <section className="grid w-screen grid-cols-4">
      {products.map((item, itemIdx) => (
        <ProductCard
          name={item.name}
          thumbnail={item.thumbnail}
          price={item.price}
          category={item.category}
          brand={item.brand}
          mrp={item.mrp}
          key={itemIdx}
        />
      ))}
    </section>
  );
}

export default ProductList;
