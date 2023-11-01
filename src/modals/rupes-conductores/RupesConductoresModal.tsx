import { Button, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import { useUiStore } from '../../hooks/useUiStore';
import { usePersonasStore, useRupesConductorDiscapacitadoStore, useRupesConductorStore } from "../../hooks";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";

export const RupesConductoresModal = () => {

  const [errorDNI, setErrorDNI] = useState(false);
  const [dniBusqueda, setDniBusqueda] = useState('');
  const { isRupesConductorOpen, toggleRupesConductor } = useUiStore();
  const { isLoadingPersonasModal, getPersonaDNI, activePersona, setActivePersona } = usePersonasStore();
  const { activeRupeConductorDiscapacitado, isLoadingRupesConductorDiscapacitadoModal } = useRupesConductorDiscapacitadoStore();
  const { addNewRupeConductor } = useRupesConductorStore();


  useEffect(() => {

    if (isRupesConductorOpen) {
      limpiarConductor();
      setErrorDNI(false);
    }

  }, [isRupesConductorOpen])


  const buscarConductor = () => {
    if (dniBusqueda.trim() === '') return;
    getPersonaDNI(dniBusqueda);
  }

  const changeDniBusqueda = (e) => {
    setDniBusqueda(e.target.value);
  }

  const limpiarConductor = () => {
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

  const nuevoConductor = () => {

    if(activePersona.id === 0){
      setErrorDNI(true);
      return;
    }

    const data = {
      personaId: activePersona.id,
      rupeConductorDiscapacitadoId: activeRupeConductorDiscapacitado.id
    };
    
    addNewRupeConductor(data);

  }

  return (
    <Modal isDismissable={false} isOpen={isRupesConductorOpen} onOpenChange={() => toggleRupesConductor()}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            {
              activeRupeConductorDiscapacitado.id === 0 ? 'Actualizando conductor' : 'Agregando conductor'
            }
          </ModalHeader>

          <ModalBody className="pb-5">
            <div>

              {
                activePersona.id === 0 ?

                  <div>
                    <div className="flex items-center">

                      <input
                        onKeyUp={(e) => (e.key === 'Enter') && buscarConductor()}
                        onChange={changeDniBusqueda}
                        placeholder="DNI de conductor"
                        type="text"
                        className="equi-select w-full" />

                      {
                        !isLoadingPersonasModal ?

                          <Button
                            onPress={() => buscarConductor()}
                            className="ml-2"
                            isIconOnly
                            title="Buscar conductor"
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
                      <p className="mt-2 text-red-600 text-xs"> Debe seleccionar un conductor </p>
                    }
                  </div>

                  :

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm">Conductor: </p>
                      <p className="text-sm font-bold">{activePersona.apellido}, {activePersona.nombre}</p>
                    </div>
                    <Button onClick={() => limpiarConductor()} className="mt-3" color="danger">
                      Cambiar conductor
                    </Button>
                  </div>

              }

              {
                !isLoadingRupesConductorDiscapacitadoModal
                  ?
                  <Button onClick={() => nuevoConductor()} type="submit" className="text-white mt-6 w-full" variant="solid" color="success">
                    {
                      activeRupeConductorDiscapacitado.id === 0 ? 'Actualizar conductor' : 'Agregar conductor'
                    }
                  </Button>
                  :
                  <Button isLoading className="text-white mt-6 w-full" color="success" variant="solid">
                    Cargando
                  </Button>
              }


            </div>

          </ModalBody>

        </>
      </ModalContent>
    </Modal >
  )

}