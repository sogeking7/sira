import { Questionnaire } from "@/types";
import axios from "axios";
import { useQuery } from "react-query";

interface Props {
  quiz_id: Questionnaire["id"];
  onSuccess?: (data: any) => void;
}

export const useQuiz = ({ quiz_id, onSuccess }: Props) => {
  return useQuery({
    queryKey: ["quiz", quiz_id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/quiz/${quiz_id}`);
      return data;
    },
    onSuccess,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });
};
