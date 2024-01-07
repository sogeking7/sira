"use client";
import { Input } from "@/components/ui/input";
import { useState, Fragment, useRef, useEffect } from "react";

type OtpInputProps = {
  length: number;
  otp: string;
  disabled: boolean;
  onOtpChange: (otp: string) => void;
};

let currentOtpIndex: number = 0;

const Otp = ({
  length,
  otp,
  disabled,
  onOtpChange,
}: OtpInputProps): JSX.Element => {
  const [tempOtp, setTempOtp] = useState<string[]>(
    new Array(length || 6).fill(""),
  );
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnchange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;
    const newOtp: string[] = [...tempOtp];
    newOtp[currentOtpIndex] = value.substring(value.length - 1);

    if (!value) setActiveOtpIndex(currentOtpIndex - 1);
    else setActiveOtpIndex(currentOtpIndex + 1);

    target.focus();

    setTempOtp(newOtp);
    onOtpChange(newOtp.join(""));
    otp = tempOtp.join("");
  };

  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    currentOtpIndex = index;
    if (key === "Backspace") {
      setActiveOtpIndex(currentOtpIndex - 1);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  return (
    <div className="flex items-center justify-center  space-x-2">
      {tempOtp.map((_, index) => {
        return (
          <Fragment key={index}>
            <Input
              disabled={disabled}
              type="number"
              ref={index === activeOtpIndex ? inputRef : null}
              onChange={handleOnchange}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              className="w-10 text-center placeholder:text-slate-300 dark:placeholder:text-slate-500"
              value={tempOtp[index]}
            />
            {index === Math.ceil(tempOtp.length / 2) - 1 ? (
              <span className="w-2 bg-foreground py-[0.5px]" />
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Otp;
