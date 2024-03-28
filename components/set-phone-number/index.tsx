"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useUserStore } from "@/stores/user";
import { cn } from "@/lib/utils";
import { SetPhoneForm } from "./form";

interface Props {
  imgSrc: string;
  t: any;
}

export const SetPhoneNumber = ({ t, imgSrc }: Props) => {
  const [open1, setIsOpen1] = useState(false);
  const [open, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);

  const { id: userId } = useUserStore();

  return (
    <>
      <Dialog open={open} onOpenChange={setIsOpen} defaultOpen={open}>
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(show && !userId ? "w-full" : "hidden")}
        >
          {t.getPrize}
        </Button>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          className="w-[312px]"
        >
          <DialogHeader className="items-center">
            <Image width={64} height={64} alt="phone" src={imgSrc} />
            <DialogTitle>{t.phoneNumber}</DialogTitle>
            <DialogDescription>{t.inputPhone}</DialogDescription>
          </DialogHeader>
          <SetPhoneForm
            setShow={setShow}
            setOpen={setIsOpen}
            setOpen1={setIsOpen1}
            t={t}
          />
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
