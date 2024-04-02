"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useQuizStore } from "@/stores/quiz";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const quiz = useQuizStore();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    const name = pathname.split("/").at(-1);
    // console.log(name);

    if (name !== "quiz") {
      if (quiz.status !== null && quiz.status !== "end") {
        quiz.nextQuestion();
        if (quiz.isLastQuestion) {
          quiz.setStatus("end");
        } else {
          quiz.setStatus(null);
        }
        // console.log("hello");
      }
    }
  }, [pathname, searchParams]);

  return null;
}
