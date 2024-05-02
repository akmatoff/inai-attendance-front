import Resource from "@/components/Resource";
import { ISubject } from "@/interfaces";
import { useSubjects } from "@/queries/subject";
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
import SubjectCreateModal from "./SubjectCreateModal";
import { Icons } from "@/components/Icons";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Название" },
  { key: "year", label: "Год" },
  { key: "semester", label: "Семестр" },
  { key: "actions", label: "Действия" },
];

export default function SubjectsPage() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { data: subjects, isLoading } = useSubjects();

  return (
    <Resource
      title="Предметы"
      buttonText="Создать предмет"
      onButtonClick={onOpen}
    >
      <Table aria-label="Предметы" classNames={{ tr: "h-14" }}>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={subjects || []}
          emptyContent="Нет существующих предметов."
          isLoading={isLoading}
        >
          {(subject) => (
            <TableRow key={subject.id}>
              {(columnKey) => (
                <TableCell>
                  <SubjectRow subject={subject} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <SubjectCreateModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </Resource>
  );
}

export function SubjectRow({
  subject,
  columnKey,
}: {
  subject: ISubject;
  columnKey: Key;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const cellValue = subject[columnKey as keyof ISubject];

  switch (columnKey) {
    case "actions":
      return (
        <div className="flex relative gap-3">
          <Tooltip content="Изменить предмет">
            <span className="cursor-pointer">
              <Icons.EDIT className="text-xl" onClick={onOpen} />
            </span>
          </Tooltip>

          <SubjectCreateModal
            isEdit
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
            subject={subject}
          />
        </div>
      );
    default:
      return cellValue;
  }
}
