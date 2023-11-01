import { useEffect } from "react"
import { useRupesConductorDiscapacitadoStore, useUiStore } from "../../hooks"
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaCalendarCheck, FaCalendarXmark } from "react-icons/fa6";
import { Card, CardBody, Tab, Tabs, CardHeader, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { format } from "date-fns";
import { EditIcon, MenuIcon } from "../../icons";
import { RupesConductorDiscapacitadoRenovacionesSeccion, RupesConductoresDiscapacitadoConductoresSeccion } from "./components";

export const RupesConductorDiscapacitadoDetallesPage = () => {

  const navigate = useNavigate()

  // Obtener id del rupe desde la direccion como parametro

  const { getIdRupeConductorDiscapacitado, activeRupeConductorDiscapacitado, isLoadingRupesConductorDiscapacitado }: any = useRupesConductorDiscapacitadoStore();
  const { toggleRupesConductorDiscapacitado } = useUiStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) getIdRupeConductorDiscapacitado(id)
  }, [])

  const openUpdateRupeDiscapacidadModal = () => {
    toggleRupesConductorDiscapacitado();
  }

  return (
    <>

      {

          isLoadingRupesConductorDiscapacitado ?
          
          <div className="flex items-center justify-center mt-4 mb-4">
            <span className="text-lg text-gray-400">
              Cargando RUPE...
            </span>
          </div>

          :

          <div>
            {/* Principal page */}
            <div className="w-11/12 md:w-1/2 mx-auto mt-4">
              <div className="flex items-center justify-between">
                <button title="Regresar" onClick={() => navigate(-1)} className="p-2 ml-2 hover:text-secondary">
                  <FaArrowLeft className="text-2xl" />
                </button>
                <div className="text-center mr-8">
                  <h1 className="font-semibold text-2xl pt-2"> DETALLES DE RUPE </h1>
                  <p className="text-xl"> Nro. {activeRupeConductorDiscapacitado.id.toString().padStart(8, '0')} </p>
                </div>
                <div></div>
              </div>
              <div className="flex w-full flex-col">

                <Tabs size="lg" color="secondary" className="mx-auto mt-4">

                  <Tab key="detalles" title="Detalles generales">
                    <Card>
                      <CardHeader className="px-5 flex items-center justify-between font-semibold text-xl">
                        <h1> DETALLES GENERALES </h1>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button variant="light">
                              <MenuIcon />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem onClick={() => openUpdateRupeDiscapacidadModal()}>
                              <div className="flex items-center">
                                <EditIcon className="h-4 w-4" />
                                <span className="ml-2">
                                  Editar RUPE
                                </span>
                              </div>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </CardHeader>
                      <CardBody className="text-lg">
                        <p> Rupe Nro. <span className="font-semibold"> {activeRupeConductorDiscapacitado?.id.toString().padStart(8, '0')} </span> </p>
                        <p className="text-md mt-1"> Tel. de contacto: <span className="font-semibold"> {activeRupeConductorDiscapacitado.telefonoContacto} </span> </p>

                        <div className="flex text-sm md:text-lg items-center justify-between mt-4">
                          <p className="text-center text-base bg-green-100 dark:bg-red-800 border border-gray-400 w-1/2">
                            <div className="flex justify-center items-center p-2">
                              <FaCalendarCheck className="mr-2" />
                              <span>
                                Otorgamiento:
                              </span>
                              <span className="font-semibold ml-2">
                                {activeRupeConductorDiscapacitado?.fechaOtorgamiento && format(new Date(activeRupeConductorDiscapacitado?.fechaOtorgamiento), 'dd/MM/yyyy')}
                              </span>
                            </div>
                          </p>
                          <p className="text-center text-base bg-red-100 dark:bg-green-800 border border-gray-400 w-1/2">
                            <div className="flex items-center justify-center p-2">
                              <FaCalendarXmark className="mr-2" />
                              <span>
                                Vencimiento:
                              </span>
                              <span className="font-semibold ml-1">
                                {activeRupeConductorDiscapacitado?.fechaVencimiento && format(new Date(activeRupeConductorDiscapacitado?.fechaVencimiento), 'dd/MM/yyyy')}
                              </span>
                            </div>
                          </p>
                        </div>

                        <div className="border border-gray-400 mt-4">
                          <p className="bg-gray-100 dark:bg-zinc-800 p-2 border-b border-gray-400 font-semibold"> Beneficiario </p>
                          <div className="p-2 flex items-center">
                            <img src="/assets/beneficiario.svg" className="w-20" alt="Beneficiario.svg" />
                            <div className="ml-4">
                              <p className="font-semibold text-md"> {activeRupeConductorDiscapacitado?.beneficiario.apellido} {activeRupeConductorDiscapacitado?.beneficiario.nombre} </p>
                              <div className="text-gray-500 text-base dark:text-zinc-400">
                                <p> DNI {activeRupeConductorDiscapacitado?.beneficiario.dni} </p>    
                                {
                                  activeRupeConductorDiscapacitado?.beneficiario.telefono &&
                                  <p> Tel. {activeRupeConductorDiscapacitado?.beneficiario.telefono} </p>
                                }
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border border-gray-400 mt-4">
                          <p className="bg-gray-100 dark:bg-zinc-800  p-2 border-b border-gray-400 font-semibold"> Vehículo </p>
                          <div className="p-2 flex items-center">
                            <img src="/assets/vehiculo.svg" className="w-20" alt="Vehiculo.svg" />
                            <div className="ml-4">
                              <p className="font-semibold text-md"> {activeRupeConductorDiscapacitado.vehiculo.marca} {activeRupeConductorDiscapacitado.vehiculo.modelo} </p>
                              <div className="text-gray-500 text-base dark:text-zinc-400">
                                <p>  {activeRupeConductorDiscapacitado.vehiculo.dominio} </p>
                              </div>
                            </div>
                          </div>
                        </div>

                      </CardBody>
                    </Card>
                  </Tab>

                  <Tab key="conductores" title="Conductores">
                    <Card>
                      <CardBody>
                        <RupesConductoresDiscapacitadoConductoresSeccion />
                      </CardBody>
                    </Card>
                  </Tab>

                  <Tab key="renovaciones" title="Renovaciones">
                    <Card>
                      <CardBody>
                        <RupesConductorDiscapacitadoRenovacionesSeccion />
                      </CardBody>
                    </Card>
                  </Tab>

                </Tabs>

              </div>
              <div>

              </div>
            </div>
          </div>

      }




    </>
  )
}