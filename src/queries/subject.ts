import { ApiConstants } from "@/constants/apiConstants";
import {
  IScheduleCreate,
  ISubjectCreate,
  MutationQueryParams,
} from "@/interfaces";
import {
  createSubject,
  createSubjectSchedule,
  getSchedules,
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

export const useSubjectCreate = ({
  onSuccess,
  onError,
}: MutationQueryParams) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: ISubjectCreate) => createSubject(data),
    onSuccess,
    onError,
  });

  return {
    mutate,
    isPending,
  };
};

export const useSubjectUpdate = ({
  onSuccess,
  onError,
}: MutationQueryParams) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ data, id }: { data: ISubjectCreate; id: number }) =>
      updateSubject(id, data),
    onSuccess,
    onError,
  });

  return {
    mutate,
    isPending,
  };
};

export const useScheduleMutation = ({
  onSuccess,
  onError,
}: MutationQueryParams) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ data, id }: { data: IScheduleCreate; id?: number }) =>
      id ? updateSubjectSchedule(id, data) : createSubjectSchedule(data),
    onSuccess,
    onError,
  });

  return {
    mutate,
    isPending,
  };
};

export const useSchedules = () => {
  const { data, isLoading } = useQuery({
    queryFn: getSchedules,
    queryKey: [ApiConstants.SCHEDULES_LIST],
  });

  return {
    data,
    isLoading,
  };
};
