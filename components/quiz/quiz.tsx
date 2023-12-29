"use client";
import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import Image from "next/image";
import { test } from "./test";
import { cn } from "@/lib/utils";
import { useQuizStore } from "@/hooks/quiz";
import { ConfirmAnswerDialog } from "./confirm-answer-dialog";
import { CorrectMessage } from "./correct-message";
import { WrongMessage } from "./wrong-message";

interface Props {
  t: any;
}

export const Quiz = ({ t }: Props) => {
  const {
    index: questionIndex,
    value: curQuestion,
    maxQuestionsNumber,
    clearState,
  } = useQuizStore();
  const [open, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(100 / maxQuestionsNumber);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<
    number | null
  >(null);
  const [status, setStatus] = useState<true | false | null>(null);

  useEffect(() => {
    clearState();
  }, []);

  const handleSelectVariant = (variantIndex: number) => {
    setSelectedVariantIndex(variantIndex);
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-sm sm:text-base">
          <b>{questionIndex + 1} </b>
          из {maxQuestionsNumber}
        </h1>
        <Progress value={progress} className="w-full" />
      </div>
      {status === null && (
        <>
          <Image
            src={`/quiz/${questionIndex + 1}.png`}
            alt="image"
            width={612}
            height={360}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            className="mt-6 rounded-lg"
            quality={100}
          />
          <h1 className="mt-6 text-[20px] font-bold leading-tight sm:text-2xl">
            {curQuestion.question}
          </h1>
          <div className="mt-6 flex flex-col gap-2">
            {curQuestion.variants.map((variant, index) => {
              return (
                <button
                  onClick={() => handleSelectVariant(index)}
                  className={cn(
                    selectedVariantIndex === index
                      ? "bg-gray-300  text-black"
                      : "bg-gray-100 text-black",
                    "w-full rounded-md px-3 py-4 text-left transition-colors hover:bg-gray-200 max-sm:text-sm",
                  )}
                  key={index}
                >
                  {variant}
                </button>
              );
            })}
          </div>
          {selectedVariantIndex !== null && (
            <ConfirmAnswerDialog
              t={t}
              title={curQuestion.variants[selectedVariantIndex]}
              open={open}
              setIsOpen={setIsOpen}
              selectedVariantIndex={selectedVariantIndex}
              setStatus={setStatus}
              setSelectedVariantIndex={setSelectedVariantIndex}
            />
          )}
        </>
      )}
      {status === true && (
        <CorrectMessage
          setStatus={setStatus}
          setProgress={setProgress}
          // @ts-ignore
          title={curQuestion.variants[selectedVariantIndex]}
        />
      )}
      {status === false && (
        <WrongMessage
          setStatus={setStatus}
          setProgress={setProgress}
          // @ts-ignore
          title={curQuestion.variants[selectedVariantIndex]}
          correctTitle={curQuestion.variants[curQuestion.answer]}
        />
      )}
    </>
  );
};
