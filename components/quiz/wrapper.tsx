"use client";
import { Quiz } from "@/components/quiz";
import { useAccessToken } from "@/hooks/use-access-token";
import { useValidateUser } from "@/hooks/use-validate-user";
import { MyLoader } from "../loader";

export const QuizWrapper = ({ t }: { t: any }) => {
  const token = useAccessToken();

  const { isLoading } = useValidateUser(token);

  if (isLoading) {
    return <MyLoader />;
  }

  return <Quiz t={t} />;
};
