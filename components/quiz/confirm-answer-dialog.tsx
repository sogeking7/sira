"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { set } from "react-hook-form";
// import { useQuizStore } from "@/hooks/quiz";
import { usePrizeStore } from "@/hooks/prize";

interface Props {
  t: any;
  title: string;
  open: boolean;
  selectedVariantIndex: number | null;
  setIsOpen: (value: boolean) => void;
  setStatus: (value: boolean | null) => void;
  setSelectedVariantIndex: (value: number | null) => void;
}

export const ConfirmAnswerDialog = ({
  t,
  open,
  title,
  selectedVariantIndex,
  setIsOpen,
  setStatus,
  setSelectedVariantIndex,
}: Props) => {
  // const { value: curQuestion } = useQuizStore();
  const { setPrizeStatus } = usePrizeStore();

  useEffect(() => {
    if (!open) {
      setSelectedVariantIndex(null);
    }
  }, [open]);

  const handleAnswer = () => {
    // if (selectedVariantIndex === curQuestion.answer) {
    //   setPrizeStatus("gifted");
    //   setStatus(true);
    // } else {
    //   setPrizeStatus("not-gifted");
    //   setStatus(false);
    // }
    setIsOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen} defaultOpen={false}>
      <DialogContent className="sm:max-w-[312px]">
        <DialogHeader className="items-center">
          <img src="/icons/question.svg" />
          <DialogTitle>Подтвердите ваш выбор</DialogTitle>
          <DialogDescription>
            Вы уверены что хотите выбрать этот вариант?
          </DialogDescription>
        </DialogHeader>
        <div className="max-sm:text-sm w-full rounded-md  bg-gray-100 px-3 py-6 text-left transition-colors">
          {title}
        </div>
        <DialogFooter>
          <Button onClick={() => handleAnswer()} className="w-full">
            Ответить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
