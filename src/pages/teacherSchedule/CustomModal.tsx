import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ReactNode } from "react";

interface Props {
  title: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children?: ReactNode;
}

export default function CustomModal({
  title,
  isOpen,
  onOpenChange,
  children,
}: Props) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                ОК
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
