import { useEffect } from "react"
import { useVehiculosStore } from "../../hooks"
import { VehiculosHeader, VehiculosTable } from ".";
import { VehiculosModal } from "../../modals/vehiculos/VehiculosModal";
// import { VehiculosModal } from "../../modals";

export const VehiculosPage = () => {

  const { getAllVehiculos } = useVehiculosStore();

  useEffect(() => {
    getAllVehiculos();
  }, [])

  return (
    <>

      {/* Modal componente - Vehiculos */}
      <VehiculosModal />

      {/* Principal page */}
      <div className="w-11/12 md:w-2/3 mx-auto">
        <VehiculosHeader />
        <VehiculosTable />
      </div>

    </>
  )
}