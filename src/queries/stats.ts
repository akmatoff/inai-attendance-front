import { ApiConstants } from "@/constants/apiConstants";
import { getAttendanceStats } from "@/requests/stats";
import { useQuery } from "@tanstack/react-query";

export interface StatsParams {
  sort: "asc" | "desc";
  groupId: number;
  from: string;
  till: string;
}

export const useAttendanceStats = ({
  sort,
  groupId,
  from,
  till,
}: StatsParams) => {
  const KEY = {
    asc: ApiConstants.ATTENDANCE_STATS_ASC,
    desc: ApiConstants.ATTENDANCE_STATS_DESC,
  };

  const { data, isLoading } = useQuery({
    queryKey: [KEY[sort]],
    queryFn: () => getAttendanceStats({ sort, groupId, from, till }),
  });

  return {
    data,
    isLoading,
  };
};
