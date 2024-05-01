import { IUserCreate } from "@/interfaces";
import {
  activateUser,
  changeStudentGroup,
  changeUsername,
  changeUserPassword,
  createAdmin,
  createStudent,
  createTeacher,
  deactivateUser,
} from "@/requests/user";
import { useMutation } from "@tanstack/react-query";

export const useStudentCreate = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ groupId, data }: { data: IUserCreate; groupId: number }) =>
      createStudent(groupId, data),
  });

  return {
    mutate,
    isPending,
  };
};

export const useTeacherCreate = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: IUserCreate) => createTeacher(data),
  });

  return {
    mutate,
    isPending,
  };
};

export const useAdminCreate = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: IUserCreate) => createAdmin(data),
  });

  return {
    mutate,
    isPending,
  };
};

export const useUserActivate = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => activateUser(id),
  });

  return {
    mutate,
    isPending,
  };
};

export const useUserDeactivate = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => deactivateUser(id),
  });

  return {
    mutate,
    isPending,
  };
};

export const useUsernameChange = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ data, id }: { data: IUserCreate; id: number }) =>
      changeUsername(id, data),
  });

  return {
    mutate,
    isPending,
  };
};

export const usePasswordChange = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ data, id }: { data: IUserCreate; id: number }) =>
      changeUserPassword(id, data),
  });

  return {
    mutate,
    isPending,
  };
};

export const useStudentGroupChange = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      studentId,
      groupId,
    }: {
      studentId: number;
      groupId: number;
    }) => changeStudentGroup(studentId, groupId),
  });

  return {
    mutate,
    isPending,
  };
};
