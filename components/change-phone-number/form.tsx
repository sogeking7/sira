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
  setOpen: (value: boolean) => void;
  setOpen1: (value: boolean) => void;
}

export const ChangePhoneForm = ({ t, setOpen, setOpen1 }: Props) => {
  const queryClient = useQueryClient();

  const user = useUserStore();

  const [loading, setLoading] = useState(false);
  const [state] = useState(() => user.phone);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: state ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { phone } = values;

    setLoading(true);

    let token = null;

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
      user.initUser(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
    setOpen(false);
    setOpen1(true);
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
      </form>
    </Form>
  );
};
