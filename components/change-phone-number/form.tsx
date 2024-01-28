"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { PhoneButton } from "./PhoneButton";
import { useUserStore } from "@/hooks/user";
import { LoaderIcon } from "lucide-react";
import { useQueryClient } from "react-query";
import { useQuizStore } from "@/hooks/quiz";
import { useRouter } from "@/navigation";

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

const signIn = async (phone: string) =>
  await axios.post("/api/auth", { phone });

const getUser = async (token: string) =>
  await axios.post("/api/validate", { token });

export const ChangePhoneNumberForm = ({ t }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  // const { removePrize } = usePrizeStore();
  const { user, setUser, removeUser } = useUserStore();
  const { removeQuiz } = useQuizStore();

  const [open, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      form.setValue("phone", user?.phone || "");
    }
  }, [open]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { phone } = values;
    setLoading(form.formState.isSubmitting);
    queryClient.invalidateQueries({
      queryKey: ["prize", "user", "questionnaire"],
    });
    removeUser();
    removeQuiz();
    signIn(phone)
      .then(({ data }) => {
        const token = data.Access_Token;
        localStorage.setItem("Access_Token", token);
        if (token) setUser(token);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setIsOpen(false);
      });
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen} defaultOpen={false}>
      <DialogTrigger className="w-full">
        <PhoneButton t={t} />
      </DialogTrigger>
      <DialogContent className="w-[312px]">
        <DialogHeader className="items-center">
          <img src="/icons/phone.svg" />
          <DialogTitle>{t.phoneNumber}</DialogTitle>
          <DialogDescription>{t.inputPhone}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="tel"
                      readOnly={loading}
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
            {loading ? (
              <div className="flex w-full justify-center">
                <LoaderIcon className="animate-spin text-primary" />
              </div>
            ) : (
              <Button
                type="submit"
                className="w-full"
                disabled={!form.formState.isValid}
              >
                {user?.phone ? t.change : "Отправить"}
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
