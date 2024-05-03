import Resource from "@/components/Resource";
import { useSchedules } from "@/queries/subject";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Key } from "react";
import { ISchedule } from "@/interfaces";
import { Icons } from "@/components/Icons";

const columns = [
  { key: "subjectScheduleId", label: "ID" },
  { key: "subjectName", label: "Предмет" },
  { key: "classTime", label: "Время пары" },
  { key: "groupName", label: "Группа" },
  { key: "actions", label: "Действия" },
];

export default function TeacherSchedulePage() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { data: schedules, isLoading } = useSchedules();

  return (
    <Resource title="Список моих пар на сегодня">
      <Table aria-label="Пары" classNames={{ tr: "h-14" }}>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={schedules || []}
          emptyContent="Нет существующих пар."
          isLoading={isLoading}
        >
          {(schedule) => (
            <TableRow key={schedule.subjectScheduleId}>
              {(columnKey) => (
                <TableCell>
                  <ScheduleRow schedule={schedule} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Resource>
  );
}

function ScheduleRow({
  schedule,
  columnKey,
}: {
  schedule: ISchedule;
  columnKey: Key;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const cellValue = schedule[columnKey as keyof ISchedule];

  switch (columnKey) {
    case "actions":
      return <div className="flex relative gap-3"></div>;
    default:
      return cellValue;
  }
}
