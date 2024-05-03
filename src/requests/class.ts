import { ApiConstants } from "@/constants/apiConstants";
import { request } from "./request";
import { IClassDay, IClassTime } from "@/interfaces";

export const getClassTimes = async (): Promise<IClassTime[]> => {
  return request.get(ApiConstants.CLASS_TIMES_LIST).then(({ data }) => data);
};

export const getClassDays = async (): Promise<IClassDay[]> => {
  return request.get(ApiConstants.CLASS_DAYS_LIST).then(({ data }) => data);
};

export const generateQrCode = async (subjectScheduleId: number) => {
  return request
    .get(ApiConstants.QR_CODE, {
      params: { subjectScheduleId },
      responseType: "arraybuffer",
    })
    .then((res) => {
      const blob = new Blob([res.data]);
      return new File([blob], "qr_code.png", { type: "image/png" });
    });
};
