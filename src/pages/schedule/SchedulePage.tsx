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
import ScheduleCreateModal from "./ScheduleCreateModal";
import { ISchedule } from "@/interfaces";
import { Icons } from "@/components/Icons";

const columns = [
  { key: "subjectScheduleId", label: "ID" },
  { key: "subjectName", label: "Предмет" },
  { key: "classTime", label: "Время пары" },
  { key: "classDay", label: "День пары" },
  { key: "teacher", label: "Преподаватель" },
  { key: "groupName", label: "Группа" },
  { key: "actions", label: "Действия" },
];

export default function SchedulePage() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { data: schedules, isLoading } = useSchedules();

  return (
    <Resource title="Пары" buttonText="Создать пару" onButtonClick={onOpen}>
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

      <ScheduleCreateModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </Resource>
  );
}

export function ScheduleRow({
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
      return (
        <div className="flex relative gap-3">
          <Tooltip content="Изменить предмет">
            <span className="cursor-pointer">
              <Icons.EDIT className="text-xl" onClick={onOpen} />
            </span>
          </Tooltip>

          <ScheduleCreateModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
            isEdit
            schedule={schedule}
          />
        </div>
      );
    default:
      return cellValue;
  }
}
