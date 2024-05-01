export class ApiConstants {
  static BASE_URL = "http://localhost:8080";
  static API_URL = this.BASE_URL.concat("/api/v1");
  static LOGIN = this.API_URL.concat("/login");
}
