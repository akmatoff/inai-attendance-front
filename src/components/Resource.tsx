import { Button, Card, CardBody } from "@nextui-org/react";
import { ReactNode } from "react";
import { Icons } from "./Icons";

interface Props {
  title: string;
  children?: ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function Resource({
  title,
  buttonText,
  onButtonClick,
  children,
}: Props) {
  return (
    <div className="flex flex-col w-full gap-4">
      <Card className="px-2">
        <CardBody>
          <div className="flex justify-between items-center">
            <h1 className="font-semibold">{title}</h1>

            <Button
              color="primary"
              variant="light"
              endContent={<Icons.ADD className="text-2xl" />}
              onPress={onButtonClick}
            >
              {buttonText || "Создать"}
            </Button>
          </div>
        </CardBody>
      </Card>

      {children}
    </div>
  );
}
