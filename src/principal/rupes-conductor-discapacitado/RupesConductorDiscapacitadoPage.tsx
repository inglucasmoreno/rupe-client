import { useEffect } from "react"
import { useRupesConductorDiscapacitadoStore } from "../../hooks"
import { RupesConductorDiscapacitadoHeader, RupesConductorDiscapacitadoTable } from "./components";

export const RupesConductorDiscapacitadoPage = () => {

  const { getAllRupesConductorDiscapacitado } = useRupesConductorDiscapacitadoStore();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    getAllRupesConductorDiscapacitado();
  }, [])

  return (
    <>
      {/* Principal page */}
      <div className="w-11/12 md:w-2/3 mx-auto">
        <RupesConductorDiscapacitadoHeader />
        <RupesConductorDiscapacitadoTable />
      </div>
    </>
  )
}