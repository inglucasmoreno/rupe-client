import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { AddIcon, MenuIcon } from "../../icons"
import { useUiStore, usePersonasStore } from "../../hooks";

export const PersonasHeader = () => {

  const { togglePersonas } = useUiStore();
  const { personas, setActivePersona } = usePersonasStore();

  const openPersonasModal = () => {
    setActivePersona({
      id: 0,
      apellido: '',
      nombre: '',
      dni: '',
      telefono: '',
      sexo: 'Masculino',
      discapacidad: false,
      activo: true
    })
    togglePersonas();
  }

  return (
    <div className="flex items-center w-full">
      <div className="flex-grow md:ml-20">
        <div className="flex flex-col items-center mt-5">
          <h1 className="font-semibold text-xl"> LISTADO DE PERSONAS </h1>
          <p className="text-sm text-slate-400"> Total de personas: {personas?.length} </p>
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
            <DropdownItem onClick={() => openPersonasModal()}>
              <div className="flex items-center">
                <AddIcon className="h-4 w-4" />
                <span className="ml-2">
                  Nueva persona
                </span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}