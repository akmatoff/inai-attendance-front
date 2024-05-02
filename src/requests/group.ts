import { ApiConstants } from "@/constants/apiConstants";
import { request } from "./request";
import { IGroup, IStudent } from "@/interfaces";

export const getGroups = async (): Promise<IGroup[]> => {
  return request.get(ApiConstants.GROUPS_LIST).then(({ data }) => data);
};

export const createGroup = async (name: string) => {
  return request
    .post(`${ApiConstants.GROUP}?name=${name}`)
    .then(({ data }) => data);
};

export const getGroupStudents = async (id: number): Promise<IStudent[]> => {
  return request
    .get(ApiConstants.GROUP, { params: { id } })
    .then(({ data }) => data);
};

export const addStudentToGroup = async ({
  studentId,
  groupId,
}: {
  studentId: number;
  groupId: number;
}) => {
  return request
    .put(ApiConstants.GROUP_ADD_STUDENT, {}, { params: { studentId, groupId } })
    .then(({ data }) => data);
};

export const changeGroupName = async ({
  groupId,
  name,
}: {
  groupId: number;
  name: string;
}) => {
  return request
    .put(ApiConstants.GROUP_NAME, {}, { params: { groupId, name } })
    .then(({ data }) => data);
};

export const removeGroupStudent = async ({
  groupId,
  studentId,
}: {
  groupId: number;
  studentId: number;
}) => {
  return request
    .delete(ApiConstants.GROUP_REMOVE_STUDENT, {
      params: { groupId, studentId },
    })
    .then(({ data }) => data);
};

export const getAllStudents = async (): Promise<IStudent[]> => {
  return request.get(ApiConstants.STUDENTS_LIST).then(({ data }) => data);
};
