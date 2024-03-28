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
import { useQueryClient } from "react-query";
import { useQuizStore } from "@/stores/quiz";

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

  const [error, setError] = useState("");
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
    setError("");
    // user.setFoo(true);

    let token = null;
    let userData = null;

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
    } catch (err) {
      console.error(err);
    }

    try {
      const { data } = await axios.post("/api/proceed/collected-answers", {
        phone,
        quizId,
        collectedAnswers,
      });
      user.initUser(userData);
      quiz.setIsFinished(data.isFinished);
      if (!data.isFinished) {
        quiz.initQuestionIndex(data.lastQuestionIndex);
      } else {
        quiz.resetQuestion();
      }
      user.setCount(data.count);
      if (!user.foo) {
        // quiz.nextQuestion();
        console.log("FOO");
      }
    } catch (err) {
      console.error(err);
    }

    setShow(false);
    setOpen(false);
    setOpen1(true);
    setLoading(false);
  };

  return (
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
                  // mask="+7 (999)-999-99-99"
                  placeholder="+7 (___)-___-__-__"
                  {...field}
                />
              </FormControl>
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
            {state ? t.change : t.send}
          </Button>
        )}
        {form.formState.errors.phone && (
          <p>{form.formState.errors.phone.message}</p>
        )}
      </form>
    </Form>
  );
};
