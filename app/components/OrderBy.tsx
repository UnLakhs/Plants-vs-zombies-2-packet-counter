"use client";

import { ChangeEvent, useState } from "react";

interface OrderByProps {
  onOrderChange: (order: string) => void;
}

const OrderBy = ({ onOrderChange }: OrderByProps) => {
  const [order, setOrder] = useState("");

  const handleOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = e.target.value;
    setOrder(selectedOrder);
    onOrderChange(selectedOrder);

  }
  return (
    <div className="">
      <label htmlFor="order" className="block font-bold mb-2">
        Order By:
      </label>
      <select
        name="order"
        id="order"
        value={order}
        onChange={handleOrderChange}
        className="border rounded py-2 px-3 w-full max-w-sm"
      >
        <option value="">Select order</option>
        <option value="alphabetical">Aplhabetical order</option>
        <option value="packets-desc">Seed packets</option>
      </select>
    </div>
  );
};

export default OrderBy;
