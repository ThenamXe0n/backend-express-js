import React from "react";
import { BreadCrumbs } from "../components/ui/microUiComponent";
import { useLocation } from "react-router";
import { ShoppingCart, X } from "lucide-react";
import { useSelector } from "react-redux";
import CartItemTable from "../components/tables/CartItemTable";

const MyCart = () => {
  const { pathname } = useLocation();
  const { cartItems, isLoading, totalItems } = useSelector(
    (state) => state.myCart,
  );
  return (
    <section className="max-w-7xl mx-auto">
      <BreadCrumbs path={pathname} />
      <div className="w-full p-3 rounded-md border-3 ">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold">Cart</span>{" "}
            <span className="text-sm text-neutral-400">
              (product {totalItems})
            </span>{" "}
          </div>
          <div className="flex items-center gap-2 text-red-500">
            <X /> clear items
          </div>
        </div>
        <div className="flex items-center justify-around w-full font-medium text-2xl mt-3">
          <span>product</span>
          <span>quantity</span>
          <span>price</span>
        </div>
        <div className="space-y-2">
          {cartItems.map((item, idx) => (
            <ItemTile poster={item?.item?.thumbnail} price={item?.item?.price} name={item?.item?.name} category={item?.item?.category} quantity={item.quantity} id={item._id}   key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ItemTile = ({ poster, category, name, quantity, price, id }) => {
  const handleremoveItem = () => {
    console.log(id);
  };
  return (
    <div className="border border-gray-200 my-2 rounded-md p-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="size-16 bg-gray-200 rounded-md overflow-hidden">
          <img src={poster} alt={name} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <h4 className="font-semibold text-xl capitalize">{name}</h4>
          <span className="text-xs text-neutral-300">{category}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="size-10 flex items-center justify-center bg-gray-400 rounded-full ">
          +
        </div>
        <div className="border px-4 py-1 text-center">{quantity}</div>
        <div className="size-10 flex items-center justify-center bg-gray-400 rounded-full ">
          -
        </div>
      </div>
      <span className="font-bold text-lg">₹ {price}</span>
      <X onClick={handleremoveItem} color="red" />
    </div>
  );
};

export default MyCart;
