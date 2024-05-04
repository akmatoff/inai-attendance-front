import Resource from "@/components/Resource";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useMemo } from "react";
import { useTeacherClassesForWeek } from "@/queries/teacher";
import { StorageKeys } from "@/constants/storageKeys";
import { ITeacherClassForWeekMapped } from "@/interfaces";

const columns = [
  { key: "subjectScheduleId", label: "ID" },
  { key: "subjectName", label: "Предмет" },
  { key: "classTime", label: "Время пары" },
  { key: "groupName", label: "Группа" },
];

export default function TeacherScheduleForWeek() {
  const userId = Number(localStorage.getItem(StorageKeys.USER_ID));

  const { data: schedules, isLoading } = useTeacherClassesForWeek(
    userId,
    !!userId
  );

  const mappedSchedules = useMemo(() => {
    if (!schedules) return [];

    const mapped = Object.keys(schedules).map((week) => {
      return {
        weekDay: week,
        schedules: schedules[week],
      } as ITeacherClassForWeekMapped;
    });

    return mapped || [];
  }, [schedules]);

  return (
    <Resource title="Список моих пар на неделю">
      {mappedSchedules.map((scheduleWeek) => (
        <>
          <h1 className="font-semibold">{scheduleWeek.weekDay}</h1>
          <Table aria-label="Пары" classNames={{ tr: "h-10" }}>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={scheduleWeek.schedules || []}
              emptyContent="Нет пар на этот день недели."
              isLoading={isLoading}
            >
              {(schedule) => (
                <TableRow key={schedule.subjectScheduleId}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(schedule, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      ))}
    </Resource>
  );
}
