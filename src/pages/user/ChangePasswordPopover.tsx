import { usePasswordChange } from "@/queries/user";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { ReactNode, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  trigger: ReactNode;
  userId: number;
}

export default function ChangePasswordPopover({ trigger, userId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");

  const { mutate, isPending } = usePasswordChange({
    onSuccess: () => {
      toast.success("Пароль изменен успешно");
      setIsOpen(false);
    },
  });

  const handleChange = () => {
    mutate({ id: userId, text: password });
  };

  return (
    <Popover
      placement="bottom"
      showArrow
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-4 py-2">
          <Input
            label="Новый пароль"
            placeholder="Введите пароль..."
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            color="primary"
            isDisabled={!password.length}
            isLoading={isPending}
            onPress={handleChange}
          >
            Сохранить
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
