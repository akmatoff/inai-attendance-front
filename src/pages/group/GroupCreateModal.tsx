import { ApiConstants } from "@/constants/apiConstants";
import { IGroup } from "@/interfaces";
import { useGroupCreation, useGroupNameChange } from "@/queries/group";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
  isEdit?: boolean;
  group?: IGroup;
}

export default function GroupCreateModal({
  isOpen,
  onOpenChange,
  onClose,
  group,
  isEdit = false,
}: Props) {
  const queryClient = useQueryClient();

  const [groupName, setGroupName] = useState(group?.name || "");

  const { mutate: create, isPending: isCreating } = useGroupCreation({
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: [ApiConstants.GROUPS_LIST],
        refetchType: "all",
      });
    },
  });

  const { mutate: changeName, isPending: isUpdating } = useGroupNameChange({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ApiConstants.GROUPS_LIST],
        refetchType: "all",
      });
      onClose();
    },
  });

  const handleCreate = () => {
    if (group && isEdit) {
      changeName({ groupId: group.id, name: groupName });
      return;
    }

    create(groupName);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              {!isEdit ? "Создание группы" : "Редактирование группы"}
            </ModalHeader>
            <ModalBody>
              <Input
                label="Название"
                placeholder="Введите название группы..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="bordered" onPress={onClose}>
                Отменить
              </Button>
              <Button
                color="primary"
                isLoading={isCreating || isUpdating}
                onPress={handleCreate}
                isDisabled={groupName.length < 3 || groupName === group?.name}
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
