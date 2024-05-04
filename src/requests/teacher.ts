import { ApiConstants } from "@/constants/apiConstants";
import { request } from "./request";
import {
  ITeacher,
  ITeacherClassesForToday,
  ITeacherClassesForWeek,
} from "@/interfaces";

export const getTeachers = async (): Promise<ITeacher[]> => {
  return request.get(ApiConstants.TEACHERS_LIST).then(({ data }) => data);
};

export const getTeacherClassesForToday = async (
  teacherId: number
): Promise<ITeacherClassesForToday[]> => {
  return request
    .get(ApiConstants.TEACHER_CLASSES_TODAY, { params: { teacherId } })
    .then(({ data }) => data);
};

export const getTeacherClassesForWeek = async (
  teacherId: number
): Promise<ITeacherClassesForWeek> => {
  return request
    .get(ApiConstants.TEACHER_CLASSES_WEEK, { params: { teacherId } })
    .then(({ data }) => data);
};

export const getTeacherClassesByYearSemester = async (
  year: number,
  semester: number
) => {
  return request
    .get(ApiConstants.TEACHER_CLASSES_BY_YEAR_SEMESTER, {
      params: { year, semester },
    })
    .then(({ data }) => data);
};
