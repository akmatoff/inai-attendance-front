import { ApiConstants } from "@/constants/apiConstants";
import { request } from "./request";

export const getClassTimes = async () => {
  return request.get(ApiConstants.CLASS_TIMES_LIST).then(({ data }) => data);
};

export const getClassDays = async () => {
  return request.get(ApiConstants.CLASS_DAYS_LIST).then(({ data }) => data);
};
