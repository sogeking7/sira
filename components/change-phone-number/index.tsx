"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { ChangePhoneForm } from "./form";
import { ChevronRight } from "lucide-react";
import { useUserStore } from "@/stores/user";

interface Props {
  imgSrc: string;
  t: any;
}

export const ChangePhoneNumber = ({ t, imgSrc }: Props) => {
  const [open1, setIsOpen1] = useState(false);
  const [open, setIsOpen] = useState(false);

  const { phone } = useUserStore();

  return (
    <>
      <Dialog open={open} onOpenChange={setIsOpen} defaultOpen={open}>
        <DialogTrigger className="w-full">
          <div className="m-0 flex h-auto w-full items-center justify-between rounded-md bg-[#f5f5f5] px-4 py-5 font-normal text-black hover:bg-[#dcdcdc]/[50%]">
            <p>{phone || t.input}</p>
            <ChevronRight className="text-black/[12%]" />
          </div>
        </DialogTrigger>
        <DialogContent className="w-[312px]">
          <DialogHeader className="items-center">
            <Image width={64} height={64} alt="phone" src={imgSrc} />
            <DialogTitle>{t.phoneNumber}</DialogTitle>
            <DialogDescription>{t.inputPhone}</DialogDescription>
          </DialogHeader>
          <ChangePhoneForm setOpen={setIsOpen} setOpen1={setIsOpen1} t={t} />
        </DialogContent>
      </Dialog>

      <Dialog open={open1} onOpenChange={setIsOpen1} defaultOpen={open1}>
        <DialogContent className="w-[312px]">
          <DialogHeader className="items-center">
            <Image
              width={64}
              height={64}
              alt="tick-round"
              src="/icons/tick-round.svg"
            />
            <DialogTitle>{t.saved}</DialogTitle>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <Button className="w-full" onClick={() => setIsOpen1(false)}>
              {t.close}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
