export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  USERS: "/dashboard/user",
  GROUP: "/dashboard/group",
  GROUP_STUDENTS: (groupId: number) => `/dashboard/group/${groupId}/students`,
  STUDENT: "/dashboard/student",
  SUBJECT: "/dashboard/subject",
  SCHEDULE: "/dashboard/schedule",
  TEACHER_SCHEDULE: "/dashboard/teacher-schedule",
  LOGIN: "/login",
};
