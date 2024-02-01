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
import { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { ChangePhoneForm } from "./form";

interface Props {
  imgSrc: string;
  t: any;
  children: ReactNode;
}

export const ChangePhoneNumber = ({ t, imgSrc, children }: Props) => {
  const [open1, setIsOpen1] = useState(false);
  const [open, setIsOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setIsOpen} defaultOpen={open}>
        <DialogTrigger className="w-full">
          {children}
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
