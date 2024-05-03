import { ReactElement } from "react";

export interface IResource {
  key: string;
  label: string;
  href: string;
  description?: string;
  icon?: ReactElement<SVGElement>;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IStudent {
  id: number;
  name: string;
  absenceNum: number;
}

export interface IGroupStudent {
  id: number;
  fullName: string;
  absenceNum: number;
}

export interface IGroup {
  id: number;
  name: string;
}

export interface ITeacher {
  id: number;
  name: string;
}

export interface IUserCreate {
  firstName: string;
  lastName: string;
  middleName: string;
  groupId?: number;
}

export interface ISubject {
  id: number;
  name: string;
  year: number;
  semester: number;
}

export interface ISubjectCreate {
  name: string;
  year: number;
  semester: number;
}

export interface IScheduleCreate {
  classTimeId: number;
  subjectId: number;
  groupId: number;
  teacherId: number;
  classDayId: number;
}

export interface ISchedule {
  classTime: string;
  classDay: string;
  subjectName: string;
  subjectScheduleId: number;
  teacher: string;
  groupName: string;
  groupId: number;
}

export interface IClassTime {
  id: number;
  time: string;
}

export interface IClassDay {
  id: number;
  name: string;
}

export interface IRole {
  roleName: string;
}

export interface MutationQueryParams {
  onSuccess?: () => void;
  onError?: () => void;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  password: string;
  role: string;
  group: string;
}
