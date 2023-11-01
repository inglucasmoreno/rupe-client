import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { AddIcon, MenuIcon } from "../../../icons"
import { useConfirmModalStore, useRupesConductorDiscapacitadoStore, useRupesConductorStore, useUiStore } from "../../../hooks"
import { useEffect, useState } from "react";


export const RupesConductoresDiscapacitadoConductoresSeccion = () => {

  const { toggleRupesConductor } = useUiStore();
  const [conductorSelected, setConductorSelected] = useState(null);
  const { openConfirm, isConfirm, actionConfirm } = useConfirmModalStore();
  const { getAllRupesConductor, rupesConductor, isLoadingRupesConductor, deleteRupeConductor } = useRupesConductorStore();
  const { activeRupeConductorDiscapacitado } = useRupesConductorDiscapacitadoStore();

  useEffect(() => {
    getAllRupesConductor(activeRupeConductorDiscapacitado.id.toString());
  }, [])

  const abrirNuevoConductorModal = () => {
    toggleRupesConductor();
  }

  useEffect(() => {
    if (
      isConfirm &&
      conductorSelected &&
      actionConfirm === 'DeleteConductor'
    ) deleteRupeConductor(conductorSelected.id);
  }, [isConfirm])

  // Modal confirmacion - Active/Inactive conductor

  const openDeleteConductorModal = (conductor) => {
    setConductorSelected(conductor);
    openConfirm({
      message: `Estas por eliminar un conductor a ${conductor.persona.nombre}`,
      textConfirm: 'Eliminar',
      textCancel: 'Cancelar',
      actionConfirm: 'DeleteConductor'
    });
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          LISTADO DE CONDUCTORES
        </h1>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light">
              <MenuIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem >
              <div className="flex items-center">
                <AddIcon className="h-4 w-4" />
                <span className="ml-2" onClick={() => abrirNuevoConductorModal()}>
                  Agregar conductor
                </span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>


      {

        isLoadingRupesConductor ?

          <div className="flex items-center justify-center mt-4 mb-4">
            <span className="text-lg text-gray-400">
              Cargando conductores...
            </span>
          </div>

          :

          <div className="mt-4">

            {
              rupesConductor.length == 0 ?
                <div className="flex flex-col items-center justify-center">
                  <span className="text-lg text-gray-400">
                    No hay conductores cargados
                  </span>
                  <Button onClick={() => abrirNuevoConductorModal()} className="mt-4 text-white" color="secondary">
                    Agregar conductor
                  </Button>
                </div>

                :

                <div>
                  {
                    rupesConductor.map((conductor: any) =>
                      <div className="p-4 flex items-center justify-between border border-gray-400 mb-4">
                        <div className="flex items-center">
                          <img className="w-16" src="/assets/beneficiario.svg" />
                          <div className="ml-4">
                            <h1 className="text-lg font-semibold">
                              {conductor.persona.apellido} {conductor.persona.nombre}
                            </h1>
                            <p className="text-base text-zinc-600 dark:text-zinc-400">
                              DNI {conductor.persona.dni}
                            </p>
                            {
                              conductor.persona.telefono &&
                              <p className="text-base text-zinc-600 dark:text-zinc-400">
                                Tel. {conductor.persona.telefono}
                              </p>
                            }
                          </div>
                        </div>
                        <Button onClick={() => openDeleteConductorModal(conductor)} color="danger">
                          Eliminar
                        </Button>
                      </div>
                    )
                  }
                </div>

            }

          </div>

      }

    </>


  )
}

