import { ApiConstants } from "@/constants/apiConstants";
import {
  getTeacherClassesByYearSemester,
  getTeacherClassesForToday,
  getTeacherClassesForWeek,
  getTeachers,
} from "@/requests/teacher";
import { useQuery } from "@tanstack/react-query";

export const useTeachers = () => {
  const { data, isLoading } = useQuery({
    queryFn: getTeachers,
    queryKey: [ApiConstants.TEACHERS_LIST],
  });

  return {
    data,
    isLoading,
  };
};

export const useTeacherClassesForToday = (
  teacherId: number,
  enabled: boolean = true
) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getTeacherClassesForToday(teacherId),
    queryKey: [ApiConstants.TEACHER_CLASSES_TODAY, teacherId],
    enabled,
  });

  return {
    data,
    isLoading,
  };
};

export const useTeacherClassesForWeek = (teacherId: number) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getTeacherClassesForWeek(teacherId),
    queryKey: [ApiConstants.TEACHER_CLASSES_WEEK, teacherId],
  });

  return {
    data,
    isLoading,
  };
};

export const useTeacherClassesByYearSemester = (
  year: number,
  semester: number
) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getTeacherClassesByYearSemester(year, semester),
    queryKey: [ApiConstants.TEACHER_CLASSES_BY_YEAR_SEMESTER, year, semester],
  });

  return {
    data,
    isLoading,
  };
};
