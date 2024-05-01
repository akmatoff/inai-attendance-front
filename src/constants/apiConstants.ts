export class ApiConstants {
  static BASE_URL = "http://localhost:8080";
  static API_URL = this.BASE_URL.concat("/api/v1");
  static LOGIN = this.API_URL.concat("/login");
  static SUBJECT = this.API_URL.concat("/subject");
  static GROUP = this.API_URL.concat("/group");
  static SCHEDULE = this.SUBJECT.concat("/schedule");
  // Lists
  static SUBJECTS_LIST = this.API_URL.concat("/options/subjects");
  static GROUPS_LIST = this.API_URL.concat("/options/groups");
  static GROUPS_LIST_WITH_STUDENTS = this.GROUP.concat("/all");
  static TEACHERS_LIST = this.API_URL.concat("/options/teachers");
  static ROLES_LIST = this.API_URL.concat("/options/roles");
  static CLASS_TIMES_LIST = this.API_URL.concat("/options/class-times");
  static CLASS_DAYS_LIST = this.API_URL.concat("/options/class-days");
}
