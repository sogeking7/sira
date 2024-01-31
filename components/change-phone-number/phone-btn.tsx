"use client";

import { useUserStore } from "@/stores/user";
import { ChevronRight } from "lucide-react";

export const PhoneBtn = ({ text }: { text: string }) => {
  const { user } = useUserStore();

  return (
    <div className="m-0 flex h-auto w-full items-center justify-between rounded-md bg-[#f5f5f5] px-4 py-5 font-normal text-black hover:bg-[#dcdcdc]/[50%]">
      <p>{user?.phone || text}</p>
      <ChevronRight className="text-black/[12%]" />
    </div>
  );
};
