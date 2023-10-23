import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useConfirmModalStore } from "../../hooks";

export const ConfirmModal = () => {

  const { 
    isConfirmOpen,
    textConfirm,
    textCancel,
    closeConfirm, 
    message,
    confirm,
  } = useConfirmModalStore();

  return (
    <>
      {/* <Modal isOpen={true} onOpenChange={onOpenChange}> */}
      <Modal onClose={closeConfirm} isOpen={isConfirmOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
								Presta atención!
							</ModalHeader>
              
							<ModalBody>
								{ message }
              </ModalBody>

              <ModalFooter className="w-full flex items-center">
                <Button onClick={ confirm } className="w-1/2 text-white" color="success">
                  { textConfirm }
                </Button>
                <Button onClick={ closeConfirm } className="w-1/2" color="danger" onPress={onClose}>
                  { textCancel }
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

