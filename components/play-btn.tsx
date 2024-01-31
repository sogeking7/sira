"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import Image from "next/image";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader } from "lucide-react";
import axios from "axios";
import { useUserStore } from "@/stores/user";
import { useQuizStore } from "@/stores/quiz";
import { useRouter } from "@/navigation";
import { useQuery } from "react-query";

export const PlayBtn = ({ t }: { t: any }) => {
  const router = useRouter();

  const [open, setIsOpen] = useState(false);

  const { user } = useUserStore();
  const { quizId } = useQuizStore();

  const userId = user?.id;

  const handleStartBtn = () => {
    router.push("/quiz");
  };

  return (
    <div>
      <Button onClick={handleStartBtn} className="w-full sm:w-[312px]">
        {t.start}
      </Button>
      <Dialog open={open} defaultOpen={open} onOpenChange={setIsOpen}>
        <DialogContent className="w-[312px]">
          <DialogHeader className="items-center">
            <Image width={64} height={64} alt="phone" src="/icons/face.png" />
            <DialogTitle>{t.youPassed}</DialogTitle>
            <DialogDescription>{t.youPassedDesc}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)} className="w-full">
              {t.ok}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
