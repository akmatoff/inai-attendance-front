import { ApiConstants } from "@/constants/apiConstants";
import { request } from "./request";
import { IUser, IUserCreate } from "@/interfaces";

export const getUsers = async (): Promise<IUser[]> => {
  return request.get(ApiConstants.USERS_LIST).then(({ data }) => data);
};

export const createStudent = async (groupId: number, data: IUserCreate) => {
  return request
    .post(ApiConstants.USER_STUDENT, data, { params: { groupId } })
    .then(({ data }) => data);
};

export const createTeacher = async (data: IUserCreate) => {
  return request.post(ApiConstants.USER_TEACHER, data).then(({ data }) => data);
};

export const createAdmin = async (data: IUserCreate) => {
  return request.post(ApiConstants.USER_ADMIN, data).then(({ data }) => data);
};

export const activateUser = async (id: number) => {
  return request
    .put(ApiConstants.USER_ACTIVATE, {}, { params: { id } })
    .then(({ data }) => data);
};

export const deactivateUser = async (id: number) => {
  return request
    .put(ApiConstants.USER_DEACTIVATE, {}, { params: { id } })
    .then(({ data }) => data);
};

export const changeUsername = async (id: number, data: IUserCreate) => {
  return request
    .put(ApiConstants.USER_NAME, data, { params: { id } })
    .then(({ data }) => data);
};

export const changeUserPassword = async (id: number, text: string) => {
  return request
    .put(ApiConstants.USER_PASSWORD, { text }, { params: { id } })
    .then(({ data }) => data);
};

export const changeStudentGroup = async (
  studentId: number,
  groupId: number
) => {
  return request
    .put(
      ApiConstants.USER_STUDENT_GROUP,
      {},
      { params: { studentId, groupId } }
    )
    .then(({ data }) => data);
};
