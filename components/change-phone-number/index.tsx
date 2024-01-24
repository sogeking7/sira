"use client";

import { useUserStore } from "@/hooks/user";
import { ChangePhoneNumberForm } from "./form";
import { useEffect } from "react";
import axios from "axios";

interface Props {
  t: any;
}

export const ChangePhoneNumber = ({ t }: Props) => {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const token = localStorage.getItem("Access_Token");
      if (token && !user) setUser(token);
    }
  }, []);

  return <ChangePhoneNumberForm t={t} />;
};
