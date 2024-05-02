import { login } from "@/requests/auth";
import { useMutation } from "@tanstack/react-query";

interface MutationQuery {
  onSuccess?: (data: { token: string; role: string }) => void;
  onError?: () => void;
}

export const useLogin = ({ onSuccess, onError }: MutationQuery) => {
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess,
    onError,
  });

  return {
    mutate,
    isPending,
  };
};
