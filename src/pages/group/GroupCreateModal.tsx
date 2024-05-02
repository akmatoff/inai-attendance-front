import { ApiConstants } from "@/constants/apiConstants";
import { useGroupCreation } from "@/queries/group";
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
}

export default function GroupCreateModal({
  isOpen,
  onOpenChange,
  onClose,
}: Props) {
  const queryClient = useQueryClient();
  const [groupName, setGroupName] = useState("");
  const { mutate, isPending } = useGroupCreation({
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: [ApiConstants.GROUPS_LIST],
        refetchType: "all",
      });
    },
  });

  const handleCreate = () => {
    mutate(groupName);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Создание группы</ModalHeader>
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
                isLoading={isPending}
                onPress={handleCreate}
              >
                Создать
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
