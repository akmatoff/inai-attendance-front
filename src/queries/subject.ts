import { ApiConstants } from "@/constants/apiConstants";
import { ISchedule, ISubjectCreate } from "@/interfaces";
import {
  createSubject,
  createSubjectSchedule,
  getSubjects,
  updateSubject,
  updateSubjectSchedule,
} from "@/requests/subject";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSubjects = () => {
  const { data, isLoading } = useQuery({
    queryFn: getSubjects,
    queryKey: [ApiConstants.SUBJECTS_LIST],
  });

  return {
    data,
    isLoading,
  };
};

export const useSubjectCreate = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: ISubjectCreate) => createSubject(data),
  });

  return {
    mutate,
    isPending,
  };
};

export const useSubjectUpdate = (id: number) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: ISubjectCreate) => updateSubject(id, data),
  });

  return {
    mutate,
    isPending,
  };
};

export const useScheduleMutation = (id: number) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: ISchedule) =>
      id ? updateSubjectSchedule(id, data) : createSubjectSchedule(data),
  });

  return {
    mutate,
    isPending,
  };
};
