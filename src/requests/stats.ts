import { ApiConstants } from "@/constants/apiConstants";
import { request } from "./request";
import { IStudent } from "@/interfaces";
import { StatsParams } from "@/queries/stats";

export const getAttendanceStats = async ({
  sort,
  groupId,
  from,
  till,
}: StatsParams): Promise<IStudent[]> => {
  const URL = {
    asc: ApiConstants.ATTENDANCE_STATS_ASC,
    desc: ApiConstants.ATTENDANCE_STATS_DESC,
  };

  return request
    .get(URL[sort], { params: { from, till, groupId } })
    .then(({ data }) => data);
};
