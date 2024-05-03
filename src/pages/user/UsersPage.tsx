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
import { Key, useCallback } from "react";
import { IUser } from "@/interfaces";
import { Icons } from "@/components/Icons";
import { useUserActivate, useUserDeactivate, useUsers } from "@/queries/user";
import UserCreateModal from "./UserCreateModal";
import ChangePasswordPopover from "./ChangePasswordPopover";
import ChangeGroupModal from "./ChangeGroupModal";
import ConfirmModal from "@/components/ConfirmModal";
import toast from "react-hot-toast";

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
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onOpenChange: onConfirmOpenChange,
    onClose: onConfirmClose,
  } = useDisclosure();
  const {
    isOpen: isChangeGroupOpen,
    onOpen: onChangeGroupOpen,
    onOpenChange: onChangeGroupOpenChange,
    onClose: onChangeGroupClose,
  } = useDisclosure();

  const { mutate: deactivateUser, isPending } = useUserDeactivate({
    onSuccess: () => {
      onConfirmClose();
      toast.success("Пользователь деактивирован успешно");
    },
  });

  const { mutate: activateUser } = useUserActivate({
    onSuccess: () => toast.success("Пользователь активирован успешно"),
  });

  const cellValue = user[columnKey as keyof IUser];

  const handleUserDeactivate = useCallback(() => {
    deactivateUser(user.id);
  }, [user.id, deactivateUser]);

  switch (columnKey) {
    case "actions":
      return (
        <div className="flex relative gap-3">
          <Tooltip content="Изменить Ф.И.О">
            <span className="cursor-pointer">
              <Icons.EDIT className="text-xl" onClick={onOpen} />
            </span>
          </Tooltip>
          <ChangePasswordPopover
            userId={user.id}
            trigger={
              <span className="cursor-pointer">
                <Icons.PASSWORD className="text-xl" />
              </span>
            }
          />
          {user.role === "Студент" && (
            <Tooltip content="Изменить группу">
              <span className="cursor-pointer">
                <Icons.GROUP_ADD
                  className="text-xl"
                  onClick={onChangeGroupOpen}
                />
              </span>
            </Tooltip>
          )}
          <Tooltip content="Деактивировать пользователя">
            <span className="cursor-pointer">
              <Icons.REMOVE_CIRCLE
                className="text-xl text-danger"
                onClick={onConfirmOpen}
              />
            </span>
          </Tooltip>
          <Tooltip content="Активировать пользователя">
            <span className="cursor-pointer">
              <Icons.CHECKMARK_CIRCLE
                className="text-xl text-success"
                onClick={() => activateUser(user.id)}
              />
            </span>
          </Tooltip>

          <ConfirmModal
            isOpen={isConfirmOpen}
            onOpenChange={onConfirmOpenChange}
            isLoading={isPending}
            title="Деактивация пользователя"
            description="Вы уверены, что хотите деактивировать данного пользователя?"
            onConfirm={handleUserDeactivate}
          />

          <ChangeGroupModal
            isOpen={isChangeGroupOpen}
            onOpenChange={onChangeGroupOpenChange}
            onClose={onChangeGroupClose}
            user={user}
          />

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
