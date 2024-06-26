import { ApiConstants } from "@/constants/apiConstants";
import { IUserCreate, MutationQueryParams } from "@/interfaces";
import {
  activateUser,
  changeStudentGroup,
  changeUsername,
  changeUserPassword,
  createAdmin,
  createStudent,
  createTeacher,
  deactivateUser,
  getUsers,
} from "@/requests/user";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  const { data, isLoading } = useQuery({
    queryFn: getUsers,
    queryKey: [ApiConstants.USERS_LIST],
  });

  return {
    data,
    isLoading,
  };
};

export const useStudentCreate = ({
  onSuccess,
  onError,
}: MutationQueryParams) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ groupId, data }: { data: IUserCreate; groupId: number }) =>
      createStudent(groupId, data),
    onSuccess,
    onError,
  });

  return {
    mutate,
    isPending,
  };
};

export const useTeacherCreate = ({
  onSuccess,
  onError,
}: MutationQueryParams) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: IUserCreate) => createTeacher(data),
    onSuccess,
    onError,
  });

  return {
    mutate,
    isPending,
  };
};

export const useAdminCreate = ({ onSuccess, onError }: MutationQueryParams) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: IUserCreate) => createAdmin(data),
    onSuccess,
    onError,
  });

  return {
    mutate,
    isPending,
  };
};

export const useUserActivate = ({ onSuccess }: MutationQueryParams) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => activateUser(id),
    onSuccess,
  });

  return {
    mutate,
    isPending,
  };
};

export const useUserDeactivate = ({ onSuccess }: MutationQueryParams) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => deactivateUser(id),
    onSuccess,
  });

  return {
    mutate,
    isPending,
  };
};

export const useUsernameChange = ({
  onSuccess,
  onError,
}: MutationQueryParams) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ data, id }: { data: IUserCreate; id: number }) =>
      changeUsername(id, data),
    onSuccess,
    onError,
  });

  return {
    mutate,
    isPending,
  };
};

export const usePasswordChange = ({
  onSuccess,
  onError,
}: MutationQueryParams) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ text, id }: { text: string; id: number }) =>
      changeUserPassword(id, text),
    onSuccess,
    onError,
  });

  return {
    mutate,
    isPending,
  };
};

export const useStudentGroupChange = ({ onSuccess }: MutationQueryParams) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      studentId,
      groupId,
    }: {
      studentId: number;
      groupId: number;
    }) => changeStudentGroup(studentId, groupId),
    onSuccess,
  });

  return {
    mutate,
    isPending,
  };
};
