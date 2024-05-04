import { ApiConstants } from "@/constants/apiConstants";
import { IUser } from "@/interfaces";
import { useGroups } from "@/queries/group";
import { useStudentGroupChange } from "@/queries/user";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
  user: IUser;
}

export default function ChangeGroupModal({
  isOpen,
  onClose,
  onOpenChange,
  user,
}: Props) {
  const queryClient = useQueryClient();

  const { data: groups } = useGroups();
  const { mutate, isPending } = useStudentGroupChange({
    onSuccess: () => {
      onClose();
      toast.success("Группа изменена успешно");
      queryClient.invalidateQueries({
        queryKey: [ApiConstants.USERS_LIST],
        refetchType: "all",
      });

      queryClient.invalidateQueries({
        queryKey: [ApiConstants.GROUP],
        refetchType: "all",
      });
    },
  });

  const [groupId, setGroupId] = useState("");

  const handleChange = () => {
    mutate({ studentId: user.id, groupId: +groupId });
  };

  useEffect(() => {
    if (groups) {
      const currentUserGroupId = groups
        .find((group) => group.name === user.group)
        ?.id.toString();

      if (currentUserGroupId) setGroupId(currentUserGroupId);
    }
  }, [groups, user.group]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}>
      <ModalContent aria-label="Изменить группу студента">
        {(onClose) => (
          <>
            <ModalHeader>Изменение группы студента</ModalHeader>
            <ModalBody>
              <Select
                label="Группа"
                placeholder="Выберите группу..."
                items={groups || []}
                selectedKeys={[groupId || ""]}
                onChange={(e) => setGroupId(e.target.value)}
              >
                {(group) => (
                  <SelectItem key={group.id}>{group.name}</SelectItem>
                )}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="bordered" onPress={onClose}>
                Отменить
              </Button>
              <Button
                color="primary"
                onPress={handleChange}
                isLoading={isPending}
                isDisabled={!groupId}
              >
                Сохранить
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
