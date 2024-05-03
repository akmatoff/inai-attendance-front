import {
  ISchedule,
  IScheduleCreate,
  ISubject,
  ISubjectCreate,
} from "@/interfaces";
import { request } from "./request";
import { ApiConstants } from "@/constants/apiConstants";

export const getSubjects = async (): Promise<ISubject[]> => {
  return request.get(ApiConstants.SUBJECTS_LIST).then(({ data }) => data);
};

export const createSubject = async (data: ISubjectCreate) => {
  return request.post(ApiConstants.SUBJECT, data).then(({ data }) => data);
};

export const updateSubject = async (
  id: number,
  data: Partial<ISubjectCreate>
) => {
  return request
    .put(`${ApiConstants.SUBJECT}?id=${id}`, data)
    .then(({ data }) => data);
};

export const createSubjectSchedule = async (data: IScheduleCreate) => {
  return request.post(ApiConstants.SCHEDULE, data).then(({ data }) => data);
};

export const updateSubjectSchedule = async (
  id: number,
  data: IScheduleCreate
) => {
  return request
    .put(ApiConstants.SCHEDULE, data, { params: { id } })
    .then(({ data }) => data);
};

export const getSchedules = async (): Promise<ISchedule[]> => {
  return request.get(ApiConstants.SCHEDULES_LIST).then(({ data }) => data);
};
