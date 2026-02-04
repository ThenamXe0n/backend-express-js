import React, { useState } from "react";
import { BreadCrumbs } from "../components/ui/microUiComponent";
import { useLocation } from "react-router";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import CartItemTable from "../components/tables/CartItemTable";
import { clearCartAsync, removeCartItemAsync } from "../redux/cartSlice";
import toast from "react-hot-toast";

const MyCart = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { cartItems, isLoading, totalItem } = useSelector(
    (state) => state.myCart,
  );
  const handleClearCart = () => {
    if (confirm("are you sure to clear cart?")) {
      dispatch(clearCartAsync());
      toast.success("cart is cleared!");
    }
  };
  return (
    <section className="max-w-7xl mx-auto">
      <BreadCrumbs path={pathname} />
      <div className="flex gap-8 w-full ">
        <div className="w-4/6 p-8 rounded-3xl border-3 border-gray-200 ">
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <span className="text-2xl font-semibold">Cart</span>{" "}
              <span className="text-md text-neutral-400">
                ( product {totalItem} )
              </span>
            </div>
            <div
              onClick={handleClearCart}
              className="flex items-center font-medium cursor-pointer gap-1 capitalize text-red-500"
            >
              <X size={20} /> clear carts
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="p-4">product</th>
                <th className="p-4">quantity</th>
                <th className="p-4">price</th>
                <th className="p-4">action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, idx) => (
                <ItemTile
                  poster={item?.item?.thumbnail}
                  price={item?.item?.price}
                  name={item?.item?.name}
                  category={item?.item?.category}
                  quantity={item.quantity}
                  id={item._id}
                  key={idx}
                />
              ))}
            </tbody>
          </table>
        </div>
        <SubTotalSection />
      </div>
    </section>
  );
};

const ItemTile = ({ poster, category, name, quantity, price, id }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(quantity);
  const handleremoveItem = () => {
    console.log("item to delete id is ==>", id);
    dispatch(removeCartItemAsync(id));
  };
  return (
    <tr className="border border-gray-200 my-6 rounded-2xl p-2 ">
      <td className="p-2">
        <div className="flex gap-3">
          <div className="size-16 bg-gray-200 rounded-md overflow-hidden">
            <img
              src={poster}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center ">
            <h4 className="font-semibold text-sm text-wrap capitalize ">
              {name}
            </h4>
            <span className="text-xs text-neutral-400 capitalize">
              {category}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="flex items-center">
          <button
            onClick={() => setQty((prev) => prev - 1)}
            className="size-6 flex items-center justify-center active:bg-black/50 duration-200 active:text-white active:scale-90 text-gray-600 border-gray-400 border rounded-full "
          >
            <Minus className="size-4" />
          </button>
          <div className=" px-2 py-1 text-center font-medium">{qty}</div>
          <button
            onClick={() => setQty((prev) => prev + 1)}
            className="size-6 flex items-center justify-center active:bg-black/50 duration-200 active:text-white active:scale-90 text-gray-600 border-gray-400 border rounded-full "
          >
            <Plus className="size-4" />
          </button>
        </div>
      </td>
      <td className="font-bold text-lg">₹ {price * qty}</td>
      <td>
        <X className="cursor-pointer" onClick={handleremoveItem} color="red" />
      </td>
    </tr>
  );
};

const SubTotalSection = ({ discount = 100, subtotal = 2000 }) => {
  return (
    <div className="flex-1 p-4 h-fit space-y-4 rounded-3xl bg-slate-100 border-3 border-gray-100 ">
      <div className="font-medium">Promo code</div>
      <div className="border border-gray-300 p-1 flex  rounded-full w-full">
        <input
          placeholder="type code here..."
          className="w-4/6 p-2 rounded-full outline-none"
        />
        <button className="bg-black text-center flex-1 rounded-full text-white">
          Apply
        </button>
      </div>
      <hr className="border-gray-300 mt-6" />
      <table className="w-11/12 mx-auto capitalize">
        <tr>
          <td className="text-neutral-500 py-2">sub total</td>
          <td className="text-right">₹ {subtotal}</td>
        </tr>
        <tr>
          <td className="text-neutral-500 py-2">Discount</td>
          <td className="text-right">₹ {discount}</td>
        </tr>
        <tr>
          <td className="text-neutral-500 py-2">Total</td>
          <td className="text-right">₹ {subtotal - discount}</td>
        </tr>
      </table>
    </div>
  );
};

export default MyCart;
