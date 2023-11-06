import { useEffect } from "react"
import { useRupesDiscapacidadStore } from "../../hooks"
import { RupesDiscapacidadHeader, RupesDiscapacidadTable } from "./components";

export const RupesDiscapacidadPage = () => {

  const { getAllRupesDiscapacidad } = useRupesDiscapacidadStore();
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    getAllRupesDiscapacidad();
  }, [])

  return (
    <>
      {/* Principal page */}
      <div className="w-11/12 md:w-2/3 mx-auto">
        <RupesDiscapacidadHeader />
        <RupesDiscapacidadTable />
      </div>

    </>
  )
}