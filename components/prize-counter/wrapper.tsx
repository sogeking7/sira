"use client";

import { useAccessToken } from "@/hooks/use-access-token";
import { useValidateUser } from "@/hooks/use-validate-user";
import { PrizeCounter } from ".";

export const PrizeCounterWrapper = () => {
  const token = useAccessToken();

  const { isLoading } = useValidateUser(token);

  if (isLoading) {
    return <div></div>;
  }

  return <PrizeCounter />;
};
