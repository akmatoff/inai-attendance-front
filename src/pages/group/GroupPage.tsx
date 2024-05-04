import Resource from "@/components/Resource";
import { useGroups } from "@/queries/group";
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
import GroupCreateModal from "./GroupCreateModal";
import { Key, useMemo } from "react";
import { IGroup } from "@/interfaces";
import { Icons } from "@/components/Icons";
import AddStudentModal from "./AddStudentModal";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";
import { StorageKeys } from "@/constants/storageKeys";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Название" },
  { key: "actions", label: "Действия" },
];

export default function GroupPage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { data: groups, isLoading } = useGroups();

  return (
    <Resource title="Группы" buttonText="Создать группу" onButtonClick={onOpen}>
      <Table aria-label="Группы" classNames={{ tr: "h-14" }}>
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
                <TableCell>
                  <GroupRow group={group} columnKey={columnkey} />
                </TableCell>
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

export function GroupRow({
  group,
  columnKey,
}: {
  group: IGroup;
  columnKey: Key;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isAddStudentOpen,
    onOpen: onAddStudentOpen,
    onOpenChange: onAddStudentOpenChange,
    onClose: onAddStudentClose,
  } = useDisclosure();

  const navigate = useNavigate();

  const cellValue = group[columnKey as keyof IGroup];

  const isAdmin = useMemo(
    () => localStorage.getItem(StorageKeys.ROLE) === "ADMIN",
    []
  );

  switch (columnKey) {
    case "actions":
      return (
        <div className="flex relative items-center gap-3">
          {isAdmin && (
            <Tooltip content="Изменить название">
              <span className="cursor-pointer" onClick={onOpen}>
                <Icons.EDIT className="text-xl" />
              </span>
            </Tooltip>
          )}

          {isAdmin && (
            <Tooltip content="Добавить студента">
              <span className="cursor-pointer">
                <Icons.ADD
                  className="text-xl text-success"
                  onClick={onAddStudentOpen}
                />
              </span>
            </Tooltip>
          )}

          <Tooltip content="Получить список студентов">
            <span className="cursor-pointer">
              <Icons.USER_LIST
                className="text-xl"
                onClick={() => navigate(ROUTES.GROUP_STUDENTS(group.id))}
              />
            </span>
          </Tooltip>

          <AddStudentModal
            isOpen={isAddStudentOpen}
            onOpenChange={onAddStudentOpenChange}
            onClose={onAddStudentClose}
            group={group}
          />

          <GroupCreateModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
            group={group}
            isEdit
          />
        </div>
      );
    default:
      return cellValue;
  }
}
