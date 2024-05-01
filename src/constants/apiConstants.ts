export class ApiConstants {
  static BASE_URL = "http://localhost:8080";
  static API_URL = this.BASE_URL.concat("/api/v1");
  static LOGIN = this.API_URL.concat("/login");
  static SUBJECT = this.API_URL.concat("/subject");
  static GROUP = this.API_URL.concat("/group");
  static GROUP_ADD_STUDENT = this.GROUP.concat("/add/student");
  static GROUP_REMOVE_STUDENT = this.GROUP.concat("/remove/student");
  static GROUP_NAME = this.GROUP.concat("/name");
  static SCHEDULE = this.SUBJECT.concat("/schedule");
  static TEACHER_CLASSES_TODAY = this.SUBJECT.concat("/classes/today");
  static TEACHER_CLASSES_WEEK = this.SUBJECT.concat("/classes/week");
  static TEACHER_CLASSES_BY_YEAR_SEMESTER = this.SUBJECT.concat(
    "/classes-by-year-semester"
  );
  // Lists
  static SUBJECTS_LIST = this.API_URL.concat("/options/subjects");
  static GROUPS_LIST = this.API_URL.concat("/options/groups");
  static GROUPS_LIST_WITH_STUDENTS = this.GROUP.concat("/all");
  static TEACHERS_LIST = this.API_URL.concat("/options/teachers");
  static ROLES_LIST = this.API_URL.concat("/options/roles");
  static CLASS_TIMES_LIST = this.API_URL.concat("/options/class-times");
  static CLASS_DAYS_LIST = this.API_URL.concat("/options/class-days");

  static USER = this.API_URL.concat("/user");
  static USER_TEACHER = this.USER.concat("/teacher");
  static USER_STUDENT = this.USER.concat("/student");
  static USER_ADMIN = this.USER.concat("/admin");
}
