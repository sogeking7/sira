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

const addUser = async (phone: string) =>
  await axios.post("/api/user", { phone });

export const ChangePhoneNumberForm = ({ t }: Props) => {
  const { user, setUser } = useUserStore();
  const [open, setIsOpen] = useState(false);

  useEffect(() => {
    form.setValue("phone", user?.phone || "");
  }, [open]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { phone } = values;
    addUser(phone).then(({ data }) => {
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("phone", data.user.phone);
      setUser({
        id: data.user.id,
        phone: data.user.phone,
      });
    });
    setIsOpen(false);
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
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              {user?.phone ? t.change : "Отправить"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
