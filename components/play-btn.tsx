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
// import axios from "axios";
// import { useUserStore } from "@/stores/user";
// import { useQuizStore } from "@/stores/quiz";
import { useRouter } from "@/navigation";
// import { useQuery } from "react-query";

export const PlayBtn = ({ t }: { t: any }) => {
  const router = useRouter();

  const [open, setIsOpen] = useState(false);

  // const { user, initUser, setCount } = useUserStore();
  // const { quizId, isFinished, initQuestionIndex, setIsFinished } =
  //   useQuizStore();

  // const token = localStorage.getItem("Access_Token");
  // const userId = user?.id;

  // const { isLoading: isUserLoading } = useQuery({
  //   queryKey: ["user", token],
  //   queryFn: async () => await axios.post("/api/validate", { token }),
  //   onSuccess: ({ data }) => {
  //     initUser(data);
  //   },
  //   refetchOnReconnect: false,
  //   refetchInterval: false,
  //   refetchOnWindowFocus: false,
  //   refetchIntervalInBackground: false,
  //   enabled: !!token,
  // });

  // const { isLoading: isAttemptLoading } = useQuery({
  //   queryKey: ["attempt", userId],
  //   queryFn: () => axios.get(`/api/attempt/${userId}/${quizId}`),
  //   onSuccess: ({ data }) => {
  //     initQuestionIndex(data.lastQuestionIndex);
  //     setIsFinished(data.isFinished);
  //     setCount(data.count);
  //   },
  //   refetchOnReconnect: false,
  //   refetchInterval: false,
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   refetchIntervalInBackground: false,
  //   enabled: !!userId,
  // });

  const handleStartBtn = () => {
    // if (isFinished) {
    //   setIsOpen(true);
    //   return;
    // }
    router.push("/quiz");
  };

  return (
    <div className="w-full">
      <Button
        // disabled={isUserLoading || isAttemptLoading}
        onClick={handleStartBtn}
        className="w-full sm:w-[312px]"
      >
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
