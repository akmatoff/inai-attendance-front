import ConfirmModal from "@/components/ConfirmModal";
import { Icons } from "@/components/Icons";
import Resource from "@/components/Resource";
import { ApiConstants } from "@/constants/apiConstants";
import { IGroupStudent } from "@/interfaces";
import { useGroupStudentRemove, useGroupStudents } from "@/queries/group";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { Key } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const columns = [
  { key: "id", label: "ID" },
  { key: "fullName", label: "Ф.И.О" },
  { key: "actions", label: "Действия" },
];

export default function GroupStudents() {
  const { id } = useParams();

  const { data: students, isLoading } = useGroupStudents(+id!);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <Button
        size="md"
        variant="light"
        startContent={<Icons.ARROW_LEFT className="text-md" />}
        onPress={() => navigate(-1)}
      >
        Назад
      </Button>
      <Resource title="Студенты">
        <Table aria-label="Группы" classNames={{ tr: "h-14" }}>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={students || []}
            emptyContent="Нет студентов в данной группе."
            isLoading={isLoading}
          >
            {(student) => (
              <TableRow key={student.id}>
                {(columnKey) => (
                  <TableCell>
                    <StudentRow columnKey={columnKey} student={student} />
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Resource>
    </div>
  );
}

function StudentRow({
  student,
  columnKey,
}: {
  student: IGroupStudent;
  columnKey: Key;
}) {
  const cellValue = student[columnKey as keyof IGroupStudent];

  const { id } = useParams();

  const queryClient = useQueryClient();

  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();

  const { mutate: removeStudent, isPending } = useGroupStudentRemove({
    onSuccess: () => {
      toast.success("Успешно удалено");
      queryClient.invalidateQueries({
        queryKey: [ApiConstants.STUDENTS_LIST],
        refetchType: "all",
      });
      onClose();
    },
    onError: () => {
      onClose();
    },
  });

  const handleDelete = () => {
    if (!id) return;

    removeStudent({ studentId: student.id, groupId: +id });
  };

  switch (columnKey) {
    case "actions":
      return (
        <div className="flex relative items-center gap-3">
          <Tooltip content="Удалить студента из группы">
            <span className="cursor-pointer">
              <Icons.DELETE className="text-2xl text-danger" onClick={onOpen} />
            </span>
          </Tooltip>

          <ConfirmModal
            title="Удаление студента из группы"
            description="Вы уверены, что хотите удалить данного студента?"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onConfirm={handleDelete}
            isLoading={isPending}
          />
        </div>
      );
    default:
      return cellValue;
  }
}
