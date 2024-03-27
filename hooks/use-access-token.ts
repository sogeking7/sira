import { useEffect, useState } from "react";

export const useAccessToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("Access_Token");
    setToken(token);
  }, []);

  return token;
};
