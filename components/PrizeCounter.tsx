"use client";
import { usePrizeStore } from "@/hooks/prize";

export const PrizeCounter = () => {
  const { count } = usePrizeStore();
  return (
    <div className="font-semibold">
      <img src="/icons/prize.svg" className="inline" /> {count}/10
    </div>
  );
};
