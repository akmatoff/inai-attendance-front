import Resource from "@/components/Resource";
import { useGroupStudents } from "@/queries/group";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useParams } from "react-router";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Ф.И.О" },
  { key: "actions", label: "Действия" },
];

export default function GroupStudents() {
  const { id } = useParams();

  const { data: students, isLoading } = useGroupStudents(+id!);

  return (
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
                  {getKeyValue(student, columnKey)}
                  {/* <GroupRow group={group} columnKey={columnkey} /> */}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Resource>
  );
}
