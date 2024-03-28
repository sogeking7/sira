import { useUserStore } from "@/stores/user";
import { Token } from "@/types";
import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";

export const useValidateUser = (token: Token): UseQueryResult => {
  const user = useUserStore();

  return useQuery(
    ["user", token],
    async () => {
      const { data } = await axios.post("/api/validate", { token });
      return data;
    },
    {
      onSuccess: user.initUser,
      refetchOnReconnect: false,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchIntervalInBackground: false,
      enabled: !!token,
      retry: false
    },
  );
};
