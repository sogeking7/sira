"use client";

import { useUserStore } from "@/hooks/user";
import { ChangePhoneNumberForm } from "./form";
import { useEffect } from "react";

interface Props {
  t: any;
}

export const ChangePhoneNumber = ({ t }: Props) => {
  const { setUser } = useUserStore();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let phone = localStorage.getItem("phone");
      let userId = localStorage.getItem("userId");
      setUser({
        id: userId ? userId : null,
        phone: phone ? phone : null,
      });
    }
  }, []);

  return <ChangePhoneNumberForm t={t} />;
};
