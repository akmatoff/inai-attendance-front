import { ROUTES } from "@/constants/routes";
import { StorageKeys } from "@/constants/storageKeys";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";

export default function DashboardIndex() {
  const navigate = useNavigate();

  const isTeacher = useMemo(
    () => localStorage.getItem(StorageKeys.ROLE) === "TEACHER",
    []
  );

  useEffect(() => {
    if (isTeacher) {
      navigate(ROUTES.TEACHER_SCHEDULE);
    } else {
      navigate(ROUTES.USERS);
    }
  }, [isTeacher, navigate]);

  return null;
}
