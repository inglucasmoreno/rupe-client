import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import { useUiStore } from '../../hooks/useUiStore';
import { useForm } from "react-hook-form";
import { IVehiculos } from "../../interfaces/Vehiculos";
import { useEffect } from "react";
import { useVehiculosStore } from "../../hooks";

export const VehiculosModal = () => {

  const { isVehiculosOpen, toggleVehiculos } = useUiStore();
  const { activeVehiculo, updateVehiculo, addNewVehiculo, isLoadingVehiculosModal } = useVehiculosStore();
  const { register, reset, handleSubmit, formState: { errors } } = useForm<IVehiculos>();

  useEffect(() => {
    if (isVehiculosOpen) reset()
  }, [isVehiculosOpen])

  const onSubmit = handleSubmit((data) => {

    console.log(data);

    if (activeVehiculo.id !== 0) {
      updateVehiculo(data);
    } else {
      addNewVehiculo(data);
    }

  })

  return (
    <Modal isDismissable={false} isOpen={isVehiculosOpen} onOpenChange={() => toggleVehiculos()}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            {
              activeVehiculo.id === 0 ? 'Nueva vehiculo' : 'Actualizando vehiculo'
            }
          </ModalHeader>

          <ModalBody className="pb-5">

            <form onSubmit={onSubmit}>
              <Input
                type="text"
                autoFocus
                variant="bordered"
                defaultValue={activeVehiculo.id === 0 ? '' : activeVehiculo.dominio}
                validationState={errors.dominio ? 'invalid' : 'valid'}
                errorMessage={errors?.dominio?.message}
                label="Dominio"
                {...register('dominio', {
                  required: { value: true, message: 'El campo es obligatorio' }
                })}
              />

              <Input
                type="text"
                autoFocus
                variant="bordered"
                className="mt-4"
                defaultValue={activeVehiculo.id === 0 ? '' : activeVehiculo.marca}
                validationState={errors.marca ? 'invalid' : 'valid'}
                errorMessage={errors?.marca?.message}
                label="Marca"
                {...register('marca', {
                  required: { value: true, message: 'El campo es obligatorio' }
                })}
              />

              <Input
                type="text"
                autoFocus
                variant="bordered"
                className="mt-4"
                defaultValue={activeVehiculo.id === 0 ? '' : activeVehiculo.modelo}
                validationState={errors.modelo ? 'invalid' : 'valid'}
                errorMessage={errors?.modelo?.message}
                label="Modelo"
                {...register('modelo', {
                  required: { value: true, message: 'El campo es obligatorio' }
                })}
              />

              {
                !isLoadingVehiculosModal
                  ?
                  <Button type="submit" className="text-white mt-6 w-full" variant="solid" color="success">
                    {
                      activeVehiculo.id === 0 ? 'Crear vehiculo' : 'Actualizar vehiculo'
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