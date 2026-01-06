import { Heart } from "lucide-react";
import React from "react";

const ProductDisplayCard = ({img="http://localhost:8080/uploads/img/poster-1767626090886.png",name="mustang",price=500,stock=5,brand="uniquo"}) => {
  return (
    <div className="h-96 space-y-1 w-72 p-2 shadow-2xl  shadow-black rounded-lg">
      <div className="relative overflow-hidden h-[79%]   rounded-md">
        <img
          className="w-full h-full object-cover"
          src={img}
          alt="poster"
        />
        <span className="bg-cyan-600 absolute top-3 left-2 text-white px-4 py-1 rounded-xs">
          new Arrival
        </span>
      </div>
      <div className="flex mt-2 items-center justify-between">
        <span className="text-gray-500 text-xs">{brand}</span>
        <span>
          <Heart size={16} />
        </span>
      </div>
      <h3 className="font-bold capitalize">{name}</h3>
      <div className="flex items-center justify-between">
        <span className="text-cyan-500 font-semibold text-xs">${price} save</span>
        {stock < 10 && <span className="text-red-600 text-xs">only {stock} left</span>}
      </div>
    </div>
  );
};

export default ProductDisplayCard;
