import Resource from "@/components/Resource";
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
import { IUser } from "@/interfaces";
import { Icons } from "@/components/Icons";
import { useUsers } from "@/queries/user";
import UserCreateModal from "./UserCreateModal";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Ф.И.О" },
  { key: "username", label: "Логин" },
  { key: "role", label: "Роль" },
  { key: "group", label: "Группа" },
  { key: "actions", label: "Действия" },
];

export default function UsersPage() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { data: users, isLoading } = useUsers();

  return (
    <Resource
      title="Пользователи"
      buttonText="Создать пользователя"
      onButtonClick={onOpen}
    >
      <Table aria-label="Пользователи" classNames={{ tr: "h-14" }}>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={users || []}
          emptyContent="Нет существующих пользователей."
          isLoading={isLoading}
        >
          {(user) => (
            <TableRow key={user.id}>
              {(columnKey) => (
                <TableCell>
                  <UserRow user={user} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <UserCreateModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </Resource>
  );
}

export function UserRow({ user, columnKey }: { user: IUser; columnKey: Key }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const cellValue = user[columnKey as keyof IUser];

  switch (columnKey) {
    case "actions":
      return (
        <div className="flex relative gap-3">
          <Tooltip content="Изменить Ф.И.О">
            <span className="cursor-pointer">
              <Icons.EDIT className="text-xl" onClick={onOpen} />
            </span>
          </Tooltip>

          <UserCreateModal
            isEdit
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
            user={user}
          />
        </div>
      );
    default:
      return cellValue;
  }
}
