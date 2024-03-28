"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useUserStore } from "@/stores/user";
import { LoaderIcon } from "lucide-react";
import { useQuizStore } from "@/stores/quiz";
import { User } from "@/types";
import { useQueryClient } from "react-query";

const formSchema = z.object({
  phone: z
    .string()
    .refine(
      (val) =>
        val
          .split("")
          .reduce((total, char) => total + (/\d/.test(char) ? 1 : 0), 0) === 11,
    ),
});

interface Props {
  t: any;
  setShow: (value: boolean) => void;
  setOpen: (value: boolean) => void;
  setOpen1: (value: boolean) => void;
}

export const SetPhoneForm = ({ t, setOpen, setOpen1, setShow }: Props) => {
  const queryClient = useQueryClient();

  const { id: userId, phone, ...user } = useUserStore();
  const { id: quizId, collectedAnswers, ...quiz } = useQuizStore();

  const [loading, setLoading] = useState(false);
  const [state] = useState(phone);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: state ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { phone } = values;
    setLoading(true);

    let error = false;
    let token = null;
    let userData: User | null = null;

    await axios
      .post("/api/proceed/collected-answers", {
        phone,
        quizId,
        collectedAnswers,
      })
      .then(() => {
        setShow(false);
        setOpen(false);
        setOpen1(true);
      })
      .catch((err) => {
        error = true;
        const type = err.response.data.type;
        // const errorMessage = err.response.data.message;
        if (type === "phone-taken") {
          form.setError("phone", {
            type: "phone-taken",
            message: t.phoneTaken,
          });
        }
      });

    if (!error) {
      try {
        const { data } = await axios.post("/api/auth", { phone });
        localStorage.setItem("Access_Token", data.Access_Token);
        token = data.Access_Token;
      } catch (err) {
        console.error(err);
      }

      try {
        const { data } = await axios.post("/api/validate", {
          token,
        });
        userData = data;
        user.initUser(data);
        user.setPrize(user.count);
      } catch (err) {
        console.error(err);
      }
    }

    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <>
                    <Input
                      type="tel"
                      readOnly={loading}
                      mask="+7 (999)-999-99-99"
                      placeholder="+7 (___)-___-__-__"
                      {...field}
                    />
                    {form.formState.errors.phone?.type === "phone-taken" && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.phone.message}
                      </p>
                    )}
                  </>
                </FormControl>
              </FormItem>
            </>
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
            {state ? t.change : t.send}
          </Button>
        )}
      </form>
    </Form>
  );
};
