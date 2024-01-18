"use client";

import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useUserStore } from "@/hooks/user";

interface Props {
  t: any;
}

export const PhoneButton = ({ t }: Props) => {
  const { setUser, user } = useUserStore();

  return (
    <div className="m-0 flex h-auto w-full items-center justify-between rounded-md bg-[#f5f5f5] px-4 py-5 font-normal text-black hover:bg-[#dcdcdc]/[50%]">
      <p>{user?.phone || t.input}</p>
      <ChevronRight className="text-black/[12%]" />
    </div>
  );
};
