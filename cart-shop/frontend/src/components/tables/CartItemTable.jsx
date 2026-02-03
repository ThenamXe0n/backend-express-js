import React from "react";

const CartItemTable = ({ cartItems }) => {
  return (
    <table className="w-full shadow-lg border-collapse">
      <thead className="bg-cyan-700 text-white">
        <tr>
          <td className="border text-center p-2">sr.no</td>
          <td className="border text-center p-2">items</td>
          <td className="border text-center p-2">qty</td>
          <td className="border text-center p-2">price</td>
          <td className="border text-center p-2">totalPrice</td>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item, idx) => (
          <tr key={idx} className="bg-gray-100">
            <td className="text-center p-2 border">{idx + 1}</td>
            <td className="text-center p-2 border">{item.name}</td>
            <td className="text-center p-2 border">0</td>
            <td className="text-center p-2 border">{item.price}</td>
            <td className="text-center p-2 border">{item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CartItemTable;
