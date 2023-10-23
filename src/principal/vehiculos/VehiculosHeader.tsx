import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { AddIcon, MenuIcon } from "../../icons"
import { useUiStore, useVehiculosStore } from "../../hooks";

export const VehiculosHeader = () => {

  const { toggleVehiculos } = useUiStore();
  const { vehiculos, setActiveVehiculo } = useVehiculosStore();

  const openVehiculosModal = () => {
    setActiveVehiculo({
      id: 0,
      dominio: '',
      marca: '',
      modelo: '',
      activo: true
    })
    toggleVehiculos();
  }

  return (
    <div className="flex items-center w-full">
      <div className="flex-grow md:ml-20">
        <div className="flex flex-col items-center mt-5">
          <h1 className="font-semibold text-xl"> LISTADO DE VEHICULOS </h1>
          <p className="text-sm text-slate-400"> Total de vehiculos: {vehiculos.length} </p>
        </div>
      </div>
      <div className="mt-5">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light">
              <MenuIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem onClick={() => openVehiculosModal()}>
              <div className="flex items-center">
                <AddIcon className="h-4 w-4" />
                <span className="ml-2">
                  Nuevo vehiculo
                </span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}