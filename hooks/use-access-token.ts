import { Token } from "@/types";
import { useEffect, useState } from "react";

export const useAccessToken = () => {
  const [token, setToken] = useState<Token>(null);

  useEffect(() => {
    const token = localStorage.getItem("Access_Token");
    setToken(token);
  }, []);

  return token;
};
