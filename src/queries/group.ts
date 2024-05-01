import { ApiConstants } from "@/constants/apiConstants";
import {
  addStudentToGroup,
  changeGroupName,
  createGroup,
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

export const useGroupCreation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (name: string) => createGroup(name),
    onSuccess: () => {
      toast.success("Группа создана успешно");
    },
    onError: () => {
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

export const useGroupNameChange = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { groupId: number; name: string }) =>
      changeGroupName(data),
    onSuccess: () => {
      toast.success("Имя группы изменено успешно");
    },
    onError: () => {
      toast.error("Произошла ошибка");
    },
  });

  return {
    mutate,
    isPending,
  };
};

export const useGroupStudentAdd = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { groupId: number; studentId: number }) =>
      addStudentToGroup(data),
  });

  return {
    mutate,
    isPending,
  };
};

export const useGroupStudentRemove = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { groupId: number; studentId: number }) =>
      removeGroupStudent(data),
  });

  return {
    mutate,
    isPending,
  };
};
