"use client";

import { ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import Otp from "../ui/otp";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/firebase/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Confetti from "react-confetti";
// @ts-ignore
import { useAuthState } from "react-firebase-hooks/auth";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { formatPhoneNumber } from "@/lib/utils";

interface Props {
  t: any;
}

const formSchema = z.object({
  phone: z
    .string()
    .refine(
      (val) =>
        val
          .split("")
          .reduce((total, char) => total + (/\d/.test(char) ? 1 : 0), 0) === 11,
      {
        message: "Номер телефона должен содержать 11 цифр",
      },
    ),
});

export const ChangePassword = ({ t }: Props) => {
  const [open, setIsOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);

  const [show, setShow] = useState(false);
  const [final, setFinal] = useState("");
  const [otp, setOtp] = useState<string>("");
  const [formBtnClicked, setFormBtnClicked] = useState(false);
  const [error, setError] = useState("");
  const [captcha, setCaptcha] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [otpBtnClicked, setOtpBtnClicked] = useState(false);

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      console.log(user);
      form.setValue(
        "phone",
        formatPhoneNumber(user.phoneNumber as string) || "",
      );
    }
  }, [user, loading]);

  useEffect(() => {
    if (!formBtnClicked) {
      form.resetField("phone");
    }
  }, [open]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  const ValidateOtp = () => {
    setError("");
    setOtpBtnClicked(true);

    final
      // @ts-ignore
      .confirm(otp)
      .then((confirmationResult: any) => {
        setFinal(confirmationResult);
        setOtpSuccess(true);
        setTimeout(() => {
          setOtpOpen(false);
          setIsOpen(false);
          setOtpSuccess(false);
          setOtp("");
          setShow(false);
        }, 3000);
      })
      .catch((err: any) => {
        if (err.code === "auth/invalid-verification-code") {
          setError("Wrong code");
          setOtp("");
        }
      });
    setOtpBtnClicked(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { phone } = values;

    setIsOpen(false);
    setFormBtnClicked(true);
    setError("");

    const verify = new RecaptchaVerifier(auth, "recaptcha-container", {
      callback: () => {
        setCaptcha(true);
      },
    });

    await signInWithPhoneNumber(auth, phone, verify)
      .then((confirmationResult: any) => {
        setOtpOpen(true);
        setFinal(confirmationResult);
        setShow(true);
      })
      .catch((err) => {
        setFormBtnClicked(false);
        setCaptcha(false);
        form.reset();
        setError(err.code);
      });
  };

  return (
    <>
      <div>
        {otpSuccess && (
          // @ts-ignore
          <Confetti size={8} colors={["#f44336", "#9c27b0", "#3f51b5"]} />
        )}
        <Dialog open={open} onOpenChange={setIsOpen} defaultOpen={false}>
          <DialogTrigger className="mt-6 flex w-full items-center justify-between rounded-md bg-gray-100 px-5 py-6 ring-offset-background transition-colors hover:cursor-pointer hover:bg-gray-200/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ">
            <p>
              {auth.currentUser?.phoneNumber ||
                (formBtnClicked ? form.getValues("phone") : t.input)}
            </p>
            <ChevronRight className="text-black/50" />
          </DialogTrigger>
          <DialogContent className="max-w-[352px]">
            <DialogHeader className="items-center">
              <img src="/icons/phone.svg" />
              <DialogTitle>{t.phoneNumber}</DialogTitle>
              <DialogDescription>{t.inputPhone}</DialogDescription>
            </DialogHeader>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="tel"
                            readOnly={form.formState.isSubmitting}
                            // @ts-ignore
                            mask="+7 (999)-999-99-99"
                            placeholder="+7 (___)-___-__-__"
                            {...field}
                          />
                        </FormControl>
                        {/* <FormMessage /> */}
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      form.formState.isSubmitting || !form.formState.isValid
                    }
                  >
                    {t.change}
                  </Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={otpOpen}
          onOpenChange={setOtpOpen}
          defaultOpen={false}
        >
          <AlertDialogContent className="max-w-[352px]">
            <AlertDialogHeader className="items-center">
              <AlertDialogTitle>{"Verification Code"}</AlertDialogTitle>
              <AlertDialogDescription className="mb-6">
                {otpSuccess
                  ? "Success!"
                  : "A text message with a 6-digit verification code was just sent to"}
              </AlertDialogDescription>
              {otpSuccess ? (
                <>
                  <div className="pt-3">
                    <img src="/icons/tick-round.svg" />
                  </div>
                </>
              ) : (
                <div className="w-full space-y-6">
                  <div>
                    <Otp
                      disabled={otpBtnClicked}
                      length={6}
                      otp={otp}
                      onOtpChange={(val) => setOtp(val)}
                    />
                    {error && (
                      <div className=" ml-1 mt-1 text-sm text-red-500">
                        {error}
                      </div>
                    )}
                  </div>
                  {/* {Number(otpBtnClicked)}
                  {Number(otp.toString().length !== 6)}
                  <br />
                  {otp} */}
                  <Button
                    disabled={otpBtnClicked || otp.toString().length !== 6}
                    className="w-full"
                    onClick={() => {
                      ValidateOtp();
                    }}
                  >
                    Validate OTP
                  </Button>
                </div>
              )}
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
        {/* {Number(form.formState.isSubmitting)} */}
        {error && !otpOpen && (
          <div className=" ml-1 mt-1 text-sm text-red-500">{error}</div>
        )}
        {!captcha && <div className="mt-2" id="recaptcha-container"></div>}
      </div>
    </>
  );
};
