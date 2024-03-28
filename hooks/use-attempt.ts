import { Questionnaire, User } from "@/types";
import axios from "axios";
import { useQuery } from "react-query";

interface Props {
  user_id: User["id"] | null;
  quiz_id: Questionnaire["id"];
  onSuccess?: (data: any) => void;
}

export const useAttempt = ({ user_id, quiz_id, onSuccess }: Props) => {
  return useQuery({
    queryKey: ["attempt", user_id],
    queryFn: async () => {
      const { data, status } = await axios.get(
        `/api/attempt/${user_id}/${quiz_id}`,
      );
      return data;
    },
    onSuccess,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchIntervalInBackground: false,
    enabled: !!user_id,
  });
};
