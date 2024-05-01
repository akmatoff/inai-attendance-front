import { ILogin } from "@/interfaces/auth";
import { request } from "./request";
import { ApiConstants } from "@/constants/apiConstants";

export const login = (data: ILogin) =>
  request.post(ApiConstants.LOGIN, data).then(({ data }) => data);
