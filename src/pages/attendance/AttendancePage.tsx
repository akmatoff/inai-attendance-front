import Resource from "@/components/Resource";
import { useAttendanceStats } from "@/queries/stats";
import {
  Button,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import dayjs from "dayjs";
import { Icons } from "@/components/Icons";

const columns = [
  { key: "id", label: "ID" },
  { key: "fullName", label: "Ф.И.О" },
];

export default function AttendancePage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [sort, setSort] = useState<"desc" | "asc">("desc");
  const [from, setFrom] = useState(dayjs().format("YYYY-MM-DD"));
  const [till, setTill] = useState(dayjs().format("YYYY-MM-DD"));

  const { data: students, isLoading } = useAttendanceStats({
    sort,
    groupId: +id!,
    from,
    till,
  });

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
      <Resource title="Посещаемость студентов">
        <Table aria-label="Группы" classNames={{ tr: "h-14" }}>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={students || []}
            emptyContent="Статистика по посещаемости отсутствует."
            isLoading={isLoading}
          >
            {(student) => (
              <TableRow key={student.id}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(student, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Resource>
    </div>
  );
}
