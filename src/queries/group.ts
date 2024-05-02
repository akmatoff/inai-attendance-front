import { ApiConstants } from "@/constants/apiConstants";
import { MutationQueryParams } from "@/interfaces";
import {
  addStudentToGroup,
  changeGroupName,
  createGroup,
  getAllStudents,
  getGroups,
  getGroupStudents,
  removeGroupStudent,
} from "@/requests/group";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGroups = () => {
  const { data, isLoading } = useQuery({
    queryFn: getGroups,
    queryKey: [ApiConstants.GROUPS_LIST],
  });

  return {
    data,
    isLoading,
  };
};

export const useGroupCreation = ({
  onSuccess,
  onError,
}: MutationQueryParams) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (name: string) => createGroup(name),
    onSuccess: () => {
      onSuccess?.();
      toast.success("Группа создана успешно");
    },
    onError: () => {
      onError?.();
      toast.error("Произошла ошибка");
    },
  });

  return {
    mutate,
    isPending,
  };
};

export const useGroupStudents = (id: number) => {
  const { data, isLoading } = useQuery({
    queryFn: () => getGroupStudents(id),
    queryKey: [ApiConstants.GROUP, id],
  });

  return {
    data,
    isLoading,
  };
};

export const useGroupNameChange = ({
  onSuccess,
  onError,
}: MutationQueryParams) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { groupId: number; name: string }) =>
      changeGroupName(data),
    onSuccess: () => {
      onSuccess?.();
      toast.success("Имя группы изменено успешно");
    },
    onError: () => {
      onError?.();
      toast.error("Произошла ошибка");
    },
  });

  return {
    mutate,
    isPending,
  };
};

export const useGroupStudentAdd = ({
  onSuccess,
  onError,
}: MutationQueryParams) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { groupId: number; studentId: number }) =>
      addStudentToGroup(data),
    onSuccess,
    onError,
  });

  return {
    mutate,
    isPending,
  };
};

export const useGroupStudentRemove = ({
  onSuccess,
  onError,
}: MutationQueryParams) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { groupId: number; studentId: number }) =>
      removeGroupStudent(data),
    onSuccess,
    onError,
  });

  return {
    mutate,
    isPending,
  };
};

export const useAllStudents = () => {
  const { data, isLoading } = useQuery({
    queryFn: getAllStudents,
    queryKey: [ApiConstants.STUDENTS_LIST],
  });

  return {
    data,
    isLoading,
  };
};
