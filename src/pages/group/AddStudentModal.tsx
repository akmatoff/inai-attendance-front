import { ApiConstants } from "@/constants/apiConstants";
import { IGroup, IStudent } from "@/interfaces";
import { useAllStudents, useGroupStudentAdd } from "@/queries/group";
import {
  Button,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
  group: IGroup;
}

export default function AddStudentModal({
  isOpen,
  onOpenChange,
  onClose,
  group,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useGroupStudentAdd({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ApiConstants.STUDENTS_LIST],
        refetchType: "all",
      });
      toast.success("Студент успешно добавлен");
      onClose();
    },
    onError: () => {
      onClose();
    },
  });

  const { data: students, isLoading } = useAllStudents();

  const [selectedStudent, setSelectedStudent] = useState<IStudent>();

  const handleAddStudent = () => {
    if (!selectedStudent) return;

    mutate({ groupId: group.id, studentId: selectedStudent.id });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="h-[620px]">
        {(onClose) => (
          <>
            <ModalHeader>Добавление студента в группу</ModalHeader>
            <ModalBody className="overflow-y-scroll">
              {!isLoading && (
                <Listbox
                  label="Список студентов"
                  items={students || []}
                  selectionMode="single"
                >
                  {(student) => (
                    <ListboxItem
                      key={student.id}
                      onClick={() => setSelectedStudent(student)}
                    >
                      {student.name}
                    </ListboxItem>
                  )}
                </Listbox>
              )}

              {isLoading && <Spinner />}
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="bordered" onPress={onClose}>
                Отменить
              </Button>
              <Button
                color="primary"
                isLoading={isPending}
                onPress={handleAddStudent}
                isDisabled={!selectedStudent}
              >
                Добавить
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
