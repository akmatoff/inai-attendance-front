import { ApiConstants } from "@/constants/apiConstants";
import { request } from "./request";
import { IClassDay, IClassTime } from "@/interfaces";

export const getClassTimes = async (): Promise<IClassTime[]> => {
  return request.get(ApiConstants.CLASS_TIMES_LIST).then(({ data }) => data);
};

export const getClassDays = async (): Promise<IClassDay[]> => {
  return request.get(ApiConstants.CLASS_DAYS_LIST).then(({ data }) => data);
};
