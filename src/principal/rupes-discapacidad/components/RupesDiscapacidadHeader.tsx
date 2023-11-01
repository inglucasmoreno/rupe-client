import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { AddIcon, MenuIcon } from "../../../icons"
import { useUiStore, useRupesDiscapacidadStore } from "../../../hooks";

export const RupesDiscapacidadHeader = () => {

  const { toggleRupesDiscapacidad } = useUiStore();
  const { rupesDiscapacidad, setActiveRupeDiscapacidad } = useRupesDiscapacidadStore();

  const openRupesDiscapacidadModal = () => {
    setActiveRupeDiscapacidad({
      id: 0,                  
      beneficiario: 0,       
      vehiculo: 0,            
      telefonoContacto: '',    
      observaciones: '',       
      fechaOtorgamiento: '',   
      fechaVencimiento: '',    
      entregado: false,           
      controlado: false,          
      activo: true,              
    })
    toggleRupesDiscapacidad();
  }

  return (
    <div className="flex items-center w-full">
      <div className="flex-grow md:ml-20">
        <div className="flex flex-col items-center mt-5">
          <h1 className="font-semibold text-xl"> RUPES - DISCAPACIDAD </h1>
          <p className="text-sm text-slate-400"> Total de RUPES: {rupesDiscapacidad?.length} </p>
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
            <DropdownItem onClick={() => openRupesDiscapacidadModal()}>
              <div className="flex items-center">
                <AddIcon className="h-4 w-4" />
                <span className="ml-2">
                  Nuevo RUPE
                </span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}