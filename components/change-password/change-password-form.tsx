"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

const formSchema = z
  .object({
    phone: z.string(),
  })
  .refine(
    (data) =>
      data.phone
        .split("")
        .reduce((total, char) => total + (/\d/.test(char) ? 1 : 0), 0) === 11,
  );

interface Props {
  t: any;
}

export const ChangePasswordForm = ({ t }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

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
                  mask="+7 (999)-999-99-99"
                  placeholder="+7 (___)-___-__-__"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          {t.change}
        </Button>
      </form>
    </Form>
  );
};
