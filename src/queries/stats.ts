import { ApiConstants } from "@/constants/apiConstants";
import { getAttendanceStats } from "@/requests/stats";
import { useQuery } from "@tanstack/react-query";

export interface StatsParams {
  sort: "asc" | "desc";
  groupId: number;
  from: string;
  till: string;
  subjectId?: number;
  name?: boolean;
}

export const useAttendanceStats = ({
  sort,
  groupId,
  from,
  till,
  subjectId,
  name,
}: StatsParams) => {
  const KEY = {
    asc: ApiConstants.ATTENDANCE_STATS_ASC,
    desc: ApiConstants.ATTENDANCE_STATS_DESC,
  };

  const { data, isLoading } = useQuery({
    queryKey: [
      KEY[sort],
      ApiConstants.ATTENDANCE_STATS_NAME,
      ApiConstants.ATTENDANCE_STATS_NAME_SUBJECT,
      groupId,
      from,
      till,
      subjectId,
      name,
    ],
    queryFn: () =>
      getAttendanceStats({ sort, groupId, from, till, subjectId, name }),
  });

  return {
    data,
    isLoading,
  };
};
