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
  useDisclosure,
} from "@nextui-org/react";
import { Key } from "react";
import SubjectCreateModal from "./SubjectCreateModal";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Название" },
  { key: "year", label: "Год" },
  { key: "semester", label: "Семестр" },
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
  const cellValue = subject[columnKey as keyof ISubject];

  switch (columnKey) {
    default:
      return cellValue;
  }
}
