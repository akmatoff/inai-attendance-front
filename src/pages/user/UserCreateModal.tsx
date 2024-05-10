import { ApiConstants } from "@/constants/apiConstants";
import { IUser, IUserCreate } from "@/interfaces";
import { useGroups } from "@/queries/group";
import {
  useAdminCreate,
  useStudentCreate,
  useTeacherCreate,
  useUsernameChange,
} from "@/queries/user";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
  isEdit?: boolean;
  user?: IUser;
}

export default function UserCreateModal({
  isOpen,
  onOpenChange,
  onClose,
  user,
  isEdit = false,
}: Props) {
  const queryClient = useQueryClient();

  const [userData, setUserData] = useState<IUserCreate>({
    firstName: "",
    lastName: "",
    middleName: "",
  });

  const [currentUserType, setCurrentUserType] = useState("STUDENT");

  const isDisabled = useMemo(
    () =>
      !userData.firstName.length ||
      !userData.lastName.length ||
      !userData.middleName.length,
    [userData]
  );

  const { data: groups } = useGroups();

  const { mutate: createTeacher, isPending: isCreatingTeacher } =
    useTeacherCreate({
      onSuccess: () => {
        onClose();
        toast.success("Преподаватель создан успешно");
        queryClient.invalidateQueries({
          queryKey: [ApiConstants.USERS_LIST],
          refetchType: "all",
        });
      },
    });
  const { mutate: createStudent, isPending: isCreatingStudent } =
    useStudentCreate({
      onSuccess: () => {
        onClose();
        toast.success("Студент создан успешно");
        queryClient.invalidateQueries({
          queryKey: [ApiConstants.USERS_LIST],
          refetchType: "all",
        });
      },
    });
  const { mutate: createAdmin, isPending: isCreatingAdmin } = useAdminCreate({
    onSuccess: () => {
      onClose();
      toast.success("Администратор создан успешно");
      queryClient.invalidateQueries({
        queryKey: [ApiConstants.USERS_LIST],
        refetchType: "all",
      });
    },
  });

  const { mutate: changeName, isPending: isChangingName } = useUsernameChange({
    onSuccess: () => {
      onClose();
      toast.success("Ф.И.О изменено");
      queryClient.invalidateQueries({
        queryKey: [ApiConstants.USERS_LIST],
        refetchType: "all",
      });
    },
  });

  const handleCreate = () => {
    if (isEdit && user) {
      changeName({ data: userData, id: user.id });
      return;
    }

    switch (currentUserType) {
      case "STUDENT":
        createStudent({ data: userData, groupId: userData.groupId! });
        break;
      case "TEACHER":
        createTeacher(userData);
        break;
      case "ADMIN":
        createAdmin(userData);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    if (groups && !isEdit && !user) {
      if (groups[0]?.id) {
        setUserData({ ...userData, groupId: groups[0].id });
      } else {
        setUserData({ ...userData });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent aria-label="Создать пользователя">
        {(onClose) => (
          <>
            <ModalHeader>
              {!isEdit
                ? "Создание пользователя"
                : "Редактирование пользователя"}
            </ModalHeader>
            <ModalBody>
              <Input
                label="Имя пользователя"
                placeholder="Введите имя пользователя..."
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
              />
              <Input
                label="Фамилия пользователя"
                placeholder="Введите фамилию пользователя..."
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
              />
              <Input
                label="Отчество пользователя"
                placeholder="Введите отчество пользователя..."
                onChange={(e) =>
                  setUserData({ ...userData, middleName: e.target.value })
                }
              />

              {currentUserType === "STUDENT" && !isEdit && (
                <Select
                  label="Группа"
                  placeholder="Выберите группу..."
                  items={groups || []}
                  selectedKeys={[userData.groupId?.toString() || ""]}
                  onChange={(e) =>
                    setUserData({ ...userData, groupId: +e.target.value })
                  }
                >
                  {(group) => (
                    <SelectItem key={group.id}>{group.name}</SelectItem>
                  )}
                </Select>
              )}

              {!isEdit && (
                <Select
                  label="Тип пользователя"
                  placeholder="Выберите тип пользователя..."
                  selectedKeys={[currentUserType]}
                  onChange={(e) => setCurrentUserType(e.target.value)}
                >
                  <SelectItem key="STUDENT">Студент</SelectItem>
                  <SelectItem key="TEACHER">Преподаватель</SelectItem>
                  <SelectItem key="ADMIN">Администратор</SelectItem>
                </Select>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="bordered" onPress={onClose}>
                Отменить
              </Button>
              <Button
                color="primary"
                onPress={handleCreate}
                isDisabled={
                  isDisabled ||
                  (currentUserType === "STUDENT" &&
                    !userData.groupId &&
                    !isEdit)
                }
                isLoading={
                  isCreatingAdmin ||
                  isCreatingStudent ||
                  isCreatingTeacher ||
                  isChangingName
                }
              >
                {!isEdit ? "Создать" : "Изменить"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
