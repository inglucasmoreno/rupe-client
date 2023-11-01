import { Button, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import { useUiStore } from '../../hooks/useUiStore';
import { format } from "date-fns";
import { useRupesConductorDiscapacitadoRenovacionesStore } from '../../hooks/useRupesConductorDiscapacitadoRenovaciones';
import { useRupesConductorDiscapacitadoStore } from "../../hooks";

export const RupesConductorDiscapacitadoRenovacionesModal = () => {

  const { isRupesConductorDiscapacitadoRenovacionesOpen, toggleRupesConductorDiscapacitadoRenovaciones } = useUiStore();
  const { activeRupeConductorDiscapacitado } = useRupesConductorDiscapacitadoStore();
  const { addNewRupeConductorDiscapacitadoRenovacion, isLoadingRupesConductorDiscapacitadoRenovacionesModal } = useRupesConductorDiscapacitadoRenovacionesStore();

  const generarRenovacion = () => {
    addNewRupeConductorDiscapacitadoRenovacion({
      rupeConductorDiscapacitadoId: activeRupeConductorDiscapacitado.id
    });
  }

  return (
    <Modal isDismissable={false} isOpen={isRupesConductorDiscapacitadoRenovacionesOpen} onOpenChange={() => toggleRupesConductorDiscapacitadoRenovaciones()}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            Generando renovación
          </ModalHeader>

          <ModalBody className="pb-5">

            <p className="pb-2 font-semibold"> Datos de la renovacion </p>

            <div className="border border-gray-400">
              <div className="border-l-8 p-2 flex items-center justify-between border-green-500 dark:border-green-700">
                <span className="font-semibold"> Fecha de renovacion </span>
                <span> {format(new Date(Date.now()), 'dd/MM/yyyy')} </span>
              </div>
            </div>

            <div className="border border-gray-400">
              <div className="border-l-8 p-2 flex items-center justify-between border-red-500 dark:border-red-700">
                <span className="font-semibold"> Fecha de vencimineto </span>
                <span> {format(new Date(new Date().setMonth(new Date().getMonth() + 6)), 'dd/MM/yyyy')} </span>
              </div>
            </div>

            <Button isLoading={isLoadingRupesConductorDiscapacitadoRenovacionesModal} onClick={() => generarRenovacion()} color="success" className="text-white mt-4">
              {
                isLoadingRupesConductorDiscapacitadoRenovacionesModal ? 'Renovando' : 'Renovar'
              }
            </Button>

          </ModalBody>

        </>
      </ModalContent>
    </Modal >
  )

}