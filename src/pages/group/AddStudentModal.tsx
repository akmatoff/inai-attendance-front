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
  const { mutate, isPending } = useGroupStudentAdd({
    onSuccess: () => {
      toast.success("Студент успешно добавлен");
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
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Добавление студента в группу</ModalHeader>
            <ModalBody>
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
