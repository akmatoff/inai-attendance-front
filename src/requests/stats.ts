import { ApiConstants } from "@/constants/apiConstants";
import { request } from "./request";
import { IStudent } from "@/interfaces";
import { StatsParams } from "@/queries/stats";

export const getAttendanceStats = async ({
  sort,
  groupId,
  from,
  till,
  subjectId,
  name,
}: StatsParams): Promise<IStudent[]> => {
  const URL = {
    asc: !subjectId
      ? ApiConstants.ATTENDANCE_STATS_ASC
      : ApiConstants.ATTENDANCE_STATS_ASC_SUBJECT,
    desc: !subjectId
      ? ApiConstants.ATTENDANCE_STATS_DESC
      : ApiConstants.ATTENDANCE_STATS_DESC_SUBJECT,
  };

  return request
    .get(
      !name
        ? URL[sort]
        : !subjectId
        ? ApiConstants.ATTENDANCE_STATS_NAME
        : ApiConstants.ATTENDANCE_STATS_NAME_SUBJECT,
      {
        params: { from, till, groupId, subjectId },
      }
    )
    .then(({ data }) => data);
};

export const getTodayAttendance = async (
  subjectScheduleId: number
): Promise<string[]> => {
  return request
    .get(ApiConstants.ATTENDANCE_TODAY_CLASS, { params: { subjectScheduleId } })
    .then(({ data }) => data);
};
