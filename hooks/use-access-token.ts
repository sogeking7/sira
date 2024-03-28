import { Token } from "@/types";
import { useState } from "react";

export const useAccessToken = () => {
  const [token, setToken] = useState<Token>(() =>
    localStorage.getItem("Access_Token"),
  );

  return token;
};
