import { ApiConstants } from "@/constants/apiConstants";
import { getClassDays, getClassTimes } from "@/requests/class";
import { useQuery } from "@tanstack/react-query";

export const useClassTimes = () => {
  const { data, isLoading } = useQuery({
    queryFn: getClassTimes,
    queryKey: [ApiConstants.CLASS_TIMES_LIST],
  });

  return {
    data,
    isLoading,
  };
};

export const useClassDays = () => {
  const { data, isLoading } = useQuery({
    queryFn: getClassDays,
    queryKey: [ApiConstants.CLASS_DAYS_LIST],
  });

  return {
    data,
    isLoading,
  };
};
