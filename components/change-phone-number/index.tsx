"use client";

import { useUserStore } from "@/hooks/user";
import { ChangePhoneNumberForm } from "./form";
import { useEffect } from "react";
import axios from "axios";

interface Props {
  t: any;
}

export const ChangePhoneNumber = ({ t }: Props) => {
  const { setUser } = useUserStore();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const token = localStorage.getItem("Access_Token");
      const getUser = async (token: string) =>
        await axios.post("/api/validate", { token });
      if (token) {
        getUser(token).then(({ data }) => {
          setUser(data);
        });
      }
    }
  }, []);

  return <ChangePhoneNumberForm t={t} />;
};
