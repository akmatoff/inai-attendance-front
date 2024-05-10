import { ApiConstants } from "@/constants/apiConstants";
import { ISchedule } from "@/interfaces";
import { useClassDays, useClassTimes } from "@/queries/class";
import { useGroups } from "@/queries/group";
import { useScheduleMutation, useSubjects } from "@/queries/subject";
import { useTeachers } from "@/queries/teacher";
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
  isEdit?: boolean;
  schedule?: ISchedule;
}

export default function ScheduleCreateModal({
  isOpen,
  onOpenChange,
  onClose,
  schedule,
  isEdit = false,
}: Props) {
  const queryClient = useQueryClient();

  const { data: classTimes } = useClassTimes();
  const { data: classDays } = useClassDays();
  const { data: groups } = useGroups();
  const { data: teachers } = useTeachers();
  const { data: subjects } = useSubjects();

  const [classTimeId, setClassTimeId] = useState<number | undefined>();
  const [classDayId, setClassDayId] = useState<number | undefined>();
  const [groupId, setGroupId] = useState<number | undefined>();
  const [teacherId, setTeacherId] = useState<number | undefined>();
  const [subjectId, setSubjectId] = useState<number | undefined>();

  const { mutate, isPending: isCreating } = useScheduleMutation({
    onSuccess: () => {
      onClose();
      toast.success("Успешно");
      queryClient.invalidateQueries({
        queryKey: [ApiConstants.SCHEDULES_LIST],
        refetchType: "all",
      });
    },
  });

  const handleCreate = () => {
    if (classTimeId && classDayId && groupId && teacherId && subjectId) {
      if (schedule && isEdit) {
        mutate({
          id: schedule.subjectScheduleId,
          data: { classTimeId, classDayId, groupId, teacherId, subjectId },
        });
        return;
      }

      mutate({
        data: { classTimeId, classDayId, groupId, teacherId, subjectId },
      });
    }
  };

  useEffect(() => {
    if (schedule) {
      setClassTimeId(
        classTimes?.find((classTime) => classTime.time === schedule.classTime)
          ?.id
      );
      return;
    }
    setClassTimeId(classTimes?.[0]?.id);
  }, [classTimes, schedule]);

  useEffect(() => {
    if (schedule) {
      setClassDayId(
        classDays?.find((classDay) => classDay.name === schedule.classDay)?.id
      );
      return;
    }

    setClassDayId(classDays?.[0]?.id);
  }, [classDays, schedule]);

  useEffect(() => {
    if (schedule) {
      setGroupId(schedule.groupId);
      return;
    }
    setGroupId(groups?.[0]?.id);
  }, [groups, schedule]);

  useEffect(() => {
    if (schedule) {
      setTeacherId(
        teachers?.find((teacher) => teacher.name === schedule.teacher)?.id
      );
      return;
    }
    setTeacherId(teachers?.[0]?.id);
  }, [teachers, schedule]);

  useEffect(() => {
    if (schedule) {
      setSubjectId(
        subjects?.find((subject) => subject.name === schedule.subjectName)?.id
      );
      return;
    }
    setSubjectId(subjects?.[0]?.id);
  }, [subjects, schedule]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent aria-label="Создать пару">
        {(onClose) => (
          <>
            <ModalHeader>
              {!isEdit ? "Создание пары" : "Редактирование пары"}
            </ModalHeader>
            <ModalBody>
              <Select
                label="Время пары"
                placeholder="Выберите время пары..."
                items={classTimes || []}
                selectedKeys={[classTimeId || 0]}
                onChange={(e) => setClassTimeId(+e.target.value)}
              >
                {(classTime) => (
                  <SelectItem key={classTime.id}>{classTime.time}</SelectItem>
                )}
              </Select>
              <Select
                label="День пары"
                placeholder="Выберите день пары..."
                items={classDays || []}
                selectedKeys={[classDayId || 0]}
                onChange={(e) => setClassDayId(+e.target.value)}
              >
                {(classDay) => (
                  <SelectItem key={classDay.id}>{classDay.name}</SelectItem>
                )}
              </Select>
              <Select
                label="Группа"
                placeholder="Выберите группу..."
                items={groups || []}
                selectedKeys={[groupId || 0]}
                onChange={(e) => setGroupId(+e.target.value)}
              >
                {(group) => (
                  <SelectItem key={group.id}>{group.name}</SelectItem>
                )}
              </Select>
              <Select
                label="Преподаватель"
                placeholder="Выберите преподавателя..."
                items={teachers || []}
                selectedKeys={[teacherId || 0]}
                onChange={(e) => setTeacherId(+e.target.value)}
              >
                {(teacher) => (
                  <SelectItem key={teacher.id}>{teacher.name}</SelectItem>
                )}
              </Select>
              <Select
                label="Предмет"
                placeholder="Выберите предмет..."
                items={subjects || []}
                selectedKeys={[subjectId || 0]}
                onChange={(e) => setSubjectId(+e.target.value)}
              >
                {(subject) => (
                  <SelectItem key={subject.id}>{subject.name}</SelectItem>
                )}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="bordered" onPress={onClose}>
                Отменить
              </Button>
              <Button
                color="primary"
                onPress={handleCreate}
                isLoading={isCreating}
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
