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
            <div className="flex items-center gap-2">
              <Icons.LIST className="text-xl" />
              <h1 className="font-semibold">{title}</h1>
            </div>

            {onButtonClick && (
              <Button
                size="sm"
                radius="lg"
                color="primary"
                variant="light"
                endContent={<Icons.ADD className="text-2xl" />}
                onPress={onButtonClick}
              >
                {buttonText || "Создать"}
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      {children}
    </div>
  );
}
