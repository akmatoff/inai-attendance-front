import Resource from "@/components/Resource";
import { useAttendanceStats } from "@/queries/stats";
import {
  Button,
  Checkbox,
  DateRangePicker,
  getKeyValue,
  Select,
  SelectItem,
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
import { parseDate } from "@internationalized/date";
import { useSubjects } from "@/queries/subject";

const columns = [
  { key: "fullName", label: "Ф.И.О" },
  { key: "absenceNum", label: "Количество пропусков" },
];

type Sort = "asc" | "desc";

export default function AttendancePage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [sort, setSort] = useState<Sort>("desc");
  const [from, setFrom] = useState(dayjs().format("YYYY-MM-DD"));
  const [till, setTill] = useState(dayjs().format("YYYY-MM-DD"));
  const [subjectId, setSubjectId] = useState<number>();
  const [isSortByName, setIsSortByName] = useState(false);

  const { data: subjects } = useSubjects();

  const { data: students, isLoading } = useAttendanceStats({
    sort,
    groupId: +id!,
    from,
    till,
    subjectId,
    name: isSortByName,
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
        <div className="flex gap-4">
          <Select
            selectedKeys={[sort]}
            onChange={(e) => setSort(e.target.value as Sort)}
            label="Сортировка по количеству пропусков"
            labelPlacement="outside"
          >
            <SelectItem key="desc">По убыванию</SelectItem>
            <SelectItem key="asc">По возрастанию</SelectItem>
          </Select>

          <Select
            label="Предмет"
            labelPlacement="outside"
            placeholder="Сортировать по предмету..."
            items={subjects || []}
            onChange={(e) => setSubjectId(+e.target.value)}
          >
            {(subject) => (
              <SelectItem key={subject.id}>{subject.name}</SelectItem>
            )}
          </Select>

          <DateRangePicker
            label="Сортировка по датам"
            labelPlacement="outside"
            defaultValue={{
              start: parseDate(from),
              end: parseDate(till),
            }}
            onChange={(dateRange) => {
              setFrom(dateRange.start.toString());
              setTill(dateRange.end.toString());
            }}
          />

          <Checkbox isSelected={isSortByName} onValueChange={setIsSortByName}>
            Сортировка по имени
          </Checkbox>
        </div>

        <Table
          aria-label="Статистика посещаемости студентов"
          classNames={{ tr: "h-14" }}
        >
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
              <TableRow key={student.name + Math.random().toString()}>
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
