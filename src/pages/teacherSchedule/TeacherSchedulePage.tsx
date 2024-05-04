import Resource from "@/components/Resource";
import {
  Image,
  Listbox,
  ListboxItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Key, useState } from "react";
import { ITeacherClassesForToday } from "@/interfaces";
import { Icons } from "@/components/Icons";
import { useTeacherClassesForToday } from "@/queries/teacher";
import { StorageKeys } from "@/constants/storageKeys";
import { generateQrCode } from "@/requests/class";
import CustomModal from "./CustomModal";
import { useTodayAttendance } from "@/queries/stats";

const columns = [
  { key: "subjectScheduleId", label: "ID" },
  { key: "subjectName", label: "Предмет" },
  { key: "classTime", label: "Время пары" },
  { key: "groupName", label: "Группа" },
  { key: "actions", label: "Действия" },
];

export default function TeacherSchedulePage() {
  const userId = Number(localStorage.getItem(StorageKeys.USER_ID));

  const { data: schedules, isLoading } = useTeacherClassesForToday(
    userId,
    !!userId
  );

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
          emptyContent="Нет пар на сегодня."
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
  schedule: ITeacherClassesForToday;
  columnKey: Key;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isAttendanceOpen,
    onOpen: onAttendanceOpen,
    onOpenChange: onAttendanceOpenChange,
  } = useDisclosure();

  const cellValue = schedule[columnKey as keyof ITeacherClassesForToday];

  const [qrCode, setQrCode] = useState("");

  const handleQrCode = () => {
    generateQrCode(schedule.subjectScheduleId).then((data) => {
      setQrCode(URL.createObjectURL(data));
      onOpen();
    });
  };

  const { data: todayAttendance, isLoading } = useTodayAttendance(
    schedule.subjectScheduleId,
    isAttendanceOpen
  );

  switch (columnKey) {
    case "actions":
      return (
        <div className="flex relative gap-3">
          <Tooltip content="Сгенерировать QR-код">
            <span className="cursor-pointer">
              <Icons.QR_CODE className="text-xl" onClick={handleQrCode} />
            </span>
          </Tooltip>

          <Tooltip content="Список присутствующих на сегодняшней паре">
            <span className="cursor-pointer">
              <Icons.CHECKMARK_CIRCLE
                className="text-xl"
                onClick={onAttendanceOpen}
              />
            </span>
          </Tooltip>

          <CustomModal
            title="Список присутствующих на сегодняшней паре"
            isOpen={isAttendanceOpen}
            onOpenChange={onAttendanceOpenChange}
          >
            {!isLoading && (
              <Listbox items={todayAttendance || []}>
                {(item) => <ListboxItem key={item}>{item}</ListboxItem>}
              </Listbox>
            )}
            {isLoading && <Spinner />}
          </CustomModal>

          {qrCode && (
            <CustomModal
              title="QR-код"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            >
              <Image width="100%" src={qrCode} alt="QR-Code" />
            </CustomModal>
          )}
        </div>
      );
    default:
      return cellValue;
  }
}
