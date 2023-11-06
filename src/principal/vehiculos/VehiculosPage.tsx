import { useEffect } from "react"
import { useVehiculosStore } from "../../hooks"
import { VehiculosHeader, VehiculosTable } from ".";

export const VehiculosPage = () => {

  const { getAllVehiculos } = useVehiculosStore();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    getAllVehiculos();
  }, [])

  return (
    <>
      {/* Principal page */}
      <div className="w-11/12 md:w-2/3 mx-auto">
        <VehiculosHeader />
        <VehiculosTable />
      </div>
    </>
  )
}