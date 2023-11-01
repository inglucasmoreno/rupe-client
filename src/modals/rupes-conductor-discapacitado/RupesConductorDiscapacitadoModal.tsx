import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import { useUiStore } from '../../hooks/useUiStore';
import { useForm } from "react-hook-form";
import { IRupesDiscapacidad } from "../../interfaces/RupesDiscapacidad";
import { useEffect, useState } from "react";
import { usePersonasStore, useRupesConductorDiscapacitadoStore, useVehiculosStore } from "../../hooks";
import { BsSearch } from "react-icons/bs";

export const RupesConductorDiscapacitadoModal = () => {

  const [errorDNI, setErrorDNI] = useState(false);
  const [errorDominio, setErrorDominio] = useState(false);
  const [dniBusqueda, setDniBusqueda] = useState('');
  const [dominioBusqueda, setDominioBusqueda] = useState('');
  const { getPersonaDNI, isLoadingPersonasModal, activePersona, setActivePersona } = usePersonasStore();
  const { getVehiculoDominio, isLoadingVehiculosModal, activeVehiculo, setActiveVehiculo } = useVehiculosStore();
  const { isRupesConductorDiscapacitadoOpen, toggleRupesConductorDiscapacitado } = useUiStore();
  const { activeRupeConductorDiscapacitado, updateRupeConductorDiscapacitado, addNewRupeConductorDiscapacitado, isLoadingRupesConductorDiscapacitadoModal } = useRupesConductorDiscapacitadoStore();
  const { register, reset, handleSubmit, formState: { errors } } = useForm<IRupesDiscapacidad>();

  useEffect(() => {
    
    if (isRupesConductorDiscapacitadoOpen) {
      limpiarBeneficiario();
      limpiarVehiculo();
      setErrorDNI(false);
      setErrorDominio(false);
      reset()
    }
    
    if(activeRupeConductorDiscapacitado.id !== 0){
      setActivePersona(activeRupeConductorDiscapacitado.beneficiario);
      setActiveVehiculo(activeRupeConductorDiscapacitado.vehiculo);
    }
  
  }, [isRupesConductorDiscapacitadoOpen])

  // Beneficiarios

  const buscarBeneficiario = () => {
    if(dniBusqueda.trim() === '') return;
    getPersonaDNI(dniBusqueda);
  }

  const changeDniBusqueda = (e) => {
    setDniBusqueda(e.target.value);
  }

  const limpiarBeneficiario = () => {
    setDniBusqueda('');
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
  }

  // Vehiculo

  const buscarVehiculo = () => {
    if(dominioBusqueda.trim() === '') return;
    getVehiculoDominio(dominioBusqueda);
  }

  const changeDominioBusqueda = (e) => {
    setDominioBusqueda(e.target.value);
  }

  const limpiarVehiculo = () => {
    setDominioBusqueda('');
    setActiveVehiculo({
      id: 0,
      apellido: '',
      nombre: '',
      dni: '',
      telefono: '',
      sexo: 'Masculino',
      discapacidad: false,
      activo: true
    })
  }

  // Generales

  const onSubmit = handleSubmit((data: { telefonoContacto: string, observaciones: string }) => {
    
    if(activePersona.id === 0){
      setErrorDNI(true);
      return;
    }

    if(activeVehiculo.id === 0){
      setErrorDominio(true);
      return;
    }

    const dataRUPE = {
      vehiculoId: activeVehiculo.id,
      beneficiarioId: activePersona.id,
      telefonoContacto: data.telefonoContacto,
      observaciones: data.observaciones,
    }

    if (activeRupeConductorDiscapacitado.id !== 0) {
      updateRupeConductorDiscapacitado(dataRUPE);
    } else {
      addNewRupeConductorDiscapacitado(dataRUPE);
    }

  })

  return (
    <Modal isDismissable={false} isOpen={isRupesConductorDiscapacitadoOpen} onOpenChange={() => toggleRupesConductorDiscapacitado()}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            {
              activeRupeConductorDiscapacitado.id === 0 ? 'Nuevo RUPE - COND. DISCAPACITADO' : 'Actualizando RUPE - COND. DISCAPACITADO'
            }
          </ModalHeader>

          <ModalBody className="pb-5">

            {

              activePersona.id === 0 ?

              <div>
                <div className="flex items-center">

                  <input
                    onKeyUp={(e) => (e.key === 'Enter') && buscarBeneficiario()}
                    onChange={changeDniBusqueda}
                    placeholder="DNI de beneficiario"
                    type="text"
                    className="equi-select w-full" />

                  {
                    !isLoadingPersonasModal ?

                      <Button
                        onPress={() => buscarBeneficiario()}
                        className="ml-2"
                        isIconOnly
                        title="Buscar beneficiario"
                        color="secondary">
                        <BsSearch />
                      </Button> :
                      <Button isLoading className="text-white ml-2" color="secondary" variant="solid">
                        Buscando
                      </Button>
                  }
                </div>
                {
                  errorDNI &&
                  <p className="mt-2 text-red-600 text-xs"> Debe seleccionar un beneficiario </p>
                }
              </div>

                :
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm">Beneficiario: </p>
                    <p className="text-sm font-bold">{activePersona.apellido}, {activePersona.nombre}</p>
                  </div>
                  <Button onClick={() => limpiarBeneficiario()} className="mt-3" color="danger">
                    Cambiar beneficiario
                  </Button>
                </div>

            }


            {

              activeVehiculo.id === 0 ?

              <div>
                <div className="flex items-center mt-1">
                  <input
                    onKeyUp={(e) => (e.key === 'Enter') && buscarVehiculo()}
                    onChange={changeDominioBusqueda}
                    placeholder="Dominio de vehiculo"
                    type="text"
                    className="equi-select w-full" />

                  {
                    !isLoadingVehiculosModal ?

                      <Button
                        onPress={() => buscarVehiculo()}
                        className="ml-2"
                        isIconOnly
                        title="Buscar vehiculo"
                        color="secondary">
                        <BsSearch />
                      </Button> :
                      <Button isLoading className="text-white ml-2" color="secondary" variant="solid">
                        Buscando
                      </Button>
                  }
                </div>
                {
                  errorDominio &&
                  <p className="mt-2 text-red-600 text-xs"> Debe seleccionar un vehiculo </p>
                }
              </div>

                :

                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm">Vehiculo: </p>
                    <p className="text-sm font-bold">{activeVehiculo.dominio}, {activeVehiculo.marca} {activeVehiculo.modelo}</p>
                  </div>
                  <Button onClick={() => limpiarVehiculo()} className="mt-3" color="danger">
                    Cambiar vehiculo
                  </Button>
                </div>

            }

            <form onSubmit={onSubmit}>

              <Input
                type="text"
                className="mt-2"
                defaultValue={activeRupeConductorDiscapacitado.id === 0 ? '' : activeRupeConductorDiscapacitado.telefonoContacto}
                validationState={errors.telefonoContacto ? 'invalid' : 'valid'}
                errorMessage={errors?.telefonoContacto?.message}
                variant="bordered"
                label="Telefono de contacto"
                {...register('telefonoContacto', {
                  required: { value: true, message: 'El campo es obligatorio' }
                })}
              />

              {
                !isLoadingRupesConductorDiscapacitadoModal
                  ?
                  <Button type="submit" className="text-white mt-6 w-full" variant="solid" color="success">
                    {
                      activeRupeConductorDiscapacitado.id === 0 ? 'Crear RUPE' : 'Actualizar RUPE'
                    }
                  </Button>
                  :
                  <Button isLoading className="text-white mt-6 w-full" color="success" variant="solid">
                    Cargando
                  </Button>
              }

            </form>

          </ModalBody>

        </>
      </ModalContent>
    </Modal>
  )

}