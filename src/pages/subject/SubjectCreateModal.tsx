import { ApiConstants } from "@/constants/apiConstants";
import { ISubject, ISubjectCreate } from "@/interfaces";
import { useSubjectCreate, useSubjectUpdate } from "@/queries/subject";
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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
  isEdit?: boolean;
  subject?: ISubject;
}

export default function SubjectCreateModal({
  isOpen,
  onOpenChange,
  onClose,
  subject,
  isEdit = false,
}: Props) {
  const queryClient = useQueryClient();

  const subjectForm = useForm<ISubjectCreate>({
    defaultValues: {
      name: "",
      year: 2024,
      semester: 1,
    },
  });

  const { mutate: create, isPending: isCreating } = useSubjectCreate({
    onSuccess: () => {
      toast.success("Предмет создан успешно");
      onClose();
      queryClient.invalidateQueries({
        queryKey: [ApiConstants.SUBJECTS_LIST],
        refetchType: "all",
      });
    },
  });

  const { mutate: update, isPending: isUpdating } = useSubjectUpdate({
    onSuccess: () => {
      toast.success("Обновлено успешно");
      queryClient.invalidateQueries({
        queryKey: [ApiConstants.SUBJECTS_LIST],
        refetchType: "all",
      });
      onClose();
    },
  });

  const onSubmit: SubmitHandler<ISubjectCreate> = (data: ISubjectCreate) => {
    if (subject && isEdit) {
      update({ data, id: subject.id });
      return;
    }
    create(data);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <form onSubmit={subjectForm.handleSubmit(onSubmit)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {!isEdit ? "Создание предмета" : "Редактирование предмета"}
              </ModalHeader>
              <ModalBody>
                <Controller
                  control={subjectForm.control}
                  name="name"
                  render={({ field }) => (
                    <Input
                      label="Название"
                      placeholder="Введите название предмета..."
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={subjectForm.control}
                  name="year"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Год"
                      placeholder="Введите год предмета..."
                      type="number"
                      value={field.value?.toString()}
                    />
                  )}
                />
                <Controller
                  control={subjectForm.control}
                  name="semester"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Семестр"
                      placeholder="Введите семестр предмета..."
                      type="number"
                      value={field.value?.toString()}
                    />
                  )}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="bordered" onPress={onClose}>
                  Отменить
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  isLoading={isCreating || isUpdating}
                  isDisabled={
                    Object.values(subjectForm.formState.errors).length > 0 ||
                    !subjectForm.formState.isDirty
                  }
                >
                  {!isEdit ? "Создать" : "Изменить"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </form>
    </Modal>
  );
}
