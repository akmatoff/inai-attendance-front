import Resource from "@/components/Resource";
import { useGroups } from "@/queries/group";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import GroupCreateModal from "./GroupCreateModal";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Название" },
];

export default function GroupPage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { data: groups, isLoading } = useGroups();

  return (
    <Resource title="Группы" buttonText="Создать группу" onButtonClick={onOpen}>
      <Table>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={groups || []}
          emptyContent="Нет существующих групп."
          isLoading={isLoading}
        >
          {(group) => (
            <TableRow key={group.id}>
              {(columnkey) => (
                <TableCell>{getKeyValue(group, columnkey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <GroupCreateModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </Resource>
  );
}
