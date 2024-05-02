export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  GROUP: "/dashboard/group",
  GROUP_STUDENTS: (groupId: number) => `/dashboard/group/${groupId}/students`,
  STUDENT: "/dashboard/student",
  SUBJECT: "/dashboard/subject",
  SCHEDULE: "/dashboard/schedule",
  LOGIN: "/login",
};
