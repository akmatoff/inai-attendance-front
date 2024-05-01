import { ISchedule, ISubjectCreate } from "@/interfaces";
import { request } from "./request";
import { ApiConstants } from "@/constants/apiConstants";

export const getSubjects = async () => {
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

export const createSubjectSchedule = async (data: ISchedule) => {
  return request.post(ApiConstants.SCHEDULE, data).then(({ data }) => data);
};

export const updateSubjectSchedule = async (id: number, data: ISchedule) => {
  return request
    .put(ApiConstants.SCHEDULE, { data, params: { id } })
    .then(({ data }) => data);
};
