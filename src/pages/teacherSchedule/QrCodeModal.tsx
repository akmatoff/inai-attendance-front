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
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children?: ReactNode;
}

export default function QrCodeModal({ isOpen, onOpenChange, children }: Props) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>QR-код</ModalHeader>
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
