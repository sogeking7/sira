"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { ChangePasswordForm } from "./change-password-form";

interface Props {
  t: any;
}

export const ChangePassword = ({ t }: Props) => {
  const [open, setIsOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setIsOpen} defaultOpen={false}>
      <DialogTrigger asChild>
        <button className="mt-6 flex w-full items-center justify-between rounded-md bg-gray-100 px-5 py-6 ring-offset-background transition-colors hover:cursor-pointer hover:bg-gray-200/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ">
          <p>{t.input}</p>
          <ChevronRight className="text-black/50" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[312px]">
        <DialogHeader className="items-center">
          <img src="/icons/phone.svg" className="h-16 w-16" />
          <DialogTitle>{t.phoneNumber}</DialogTitle>
          <DialogDescription>{t.inputPhone}</DialogDescription>
        </DialogHeader>
        <ChangePasswordForm t={t} />
      </DialogContent>
    </Dialog>
  );
};
