import { Icons } from "@/components/Icons";
import Resource from "@/components/Resource";
import { useGroupStudents } from "@/queries/group";
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
import { useNavigate, useParams } from "react-router";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Ф.И.О" },
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
                    {getKeyValue(student, columnKey)}
                    {/* <GroupRow group={group} columnKey={columnkey} /> */}
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
