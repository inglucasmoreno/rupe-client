import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import { useUiStore } from '../../hooks/useUiStore';
import { useForm } from "react-hook-form";
import { IPersonas } from "../../interfaces/Personas";
import { useEffect } from "react";
import { usePersonasStore } from "../../hooks";
import { SexoItems } from "../../constants";

export const PersonasModal = () => {

  const { isPersonasOpen, togglePersonas } = useUiStore();
  const { activePersona, updatePersona, addNewPersona, isLoadingPersonasModal } = usePersonasStore();
  const { register, reset, handleSubmit, formState: { errors } } = useForm<IPersonas>();

  useEffect(() => {
    if (isPersonasOpen) reset()
  }, [isPersonasOpen])

  const onSubmit = handleSubmit((data) => {

    if (activePersona.id !== 0) {
      updatePersona(data);
    } else {
      addNewPersona(data);
    }

  })

  return (
    <Modal isDismissable={false} isOpen={isPersonasOpen} onOpenChange={() => togglePersonas()}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            {
              activePersona.id === 0 ? 'Nueva persona' : 'Actualizando persona'
            }
          </ModalHeader>

          <ModalBody className="pb-5">

            <form onSubmit={onSubmit}>
              <Input
                type="text"
                autoFocus
                variant="bordered"
                defaultValue={activePersona.id === 0 ? '' : activePersona.apellido}
                validationState={errors.apellido ? 'invalid' : 'valid'}
                errorMessage={errors?.apellido?.message}
                label="Apellido"
                {...register('apellido', {
                  required: { value: true, message: 'El campo es obligatorio' }
                })}
              />

              <Input
                type="text"
                variant="bordered"
                className="mt-4"
                defaultValue={activePersona.id === 0 ? '' : activePersona.nombre}
                validationState={errors.nombre ? 'invalid' : 'valid'}
                errorMessage={errors?.nombre?.message}
                label="Nombre"
                {...register('nombre', {
                  required: { value: true, message: 'El campo es obligatorio' }
                })}
              />

              <Input
                type="text"
                variant="bordered"
                className="mt-4"
                defaultValue={activePersona.id === 0 ? '' : activePersona.dni}
                validationState={errors.dni ? 'invalid' : 'valid'}
                errorMessage={errors?.dni?.message}
                label="DNI"
                {...register('dni', {
                  required: { value: true, message: 'El campo es obligatorio' }
                })}
              />

              <Input
                type="text"
                variant="bordered"
                className="mt-4"
                defaultValue={activePersona.id === 0 ? '' : activePersona.telefono}
                validationState={errors.telefono ? 'invalid' : 'valid'}
                errorMessage={errors?.telefono?.message}
                label="Telefono"
                {...register('telefono')}
              />

              <select
                className='equi-select w-full mt-4'
                defaultValue={activePersona.id === 0 ? '' : String(activePersona.sexo)}
                {...register('sexo', {
                  required: { value: true, message: 'El campo es obligatorio' }
                })}
              >
                {
                  SexoItems.map((item) => (
                    <option key={item.key} value={item.value}> {item.description} </option>
                  ))
                }
              </select>

              {
                !isLoadingPersonasModal
                  ?
                  <Button type="submit" className="text-white mt-6 w-full" variant="solid" color="success">
                    {
                      activePersona.id === 0 ? 'Crear persona' : 'Actualizar persona'
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