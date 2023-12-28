"use client";
import Image from "next/image";
import { useState } from "react";

export const PriceCounter = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="font-semibold">
      <Image alt="prize" src="/icons/prize.svg" className="inline" /> {count}/10
    </div>
  );
};
