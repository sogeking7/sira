"use client";
import { useState } from "react";

export const PriceCounter = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="font-semibold">
      <img src="/icons/prize.svg" className="inline" /> {count}/10
    </div>
  );
};
