import { useEffect } from "react"
import { usePersonasStore } from "../../hooks"
import { PersonasHeader, PersonasTable } from ".";

export const PersonasPage = () => {

  const { getAllPersonas } = usePersonasStore();

  useEffect(() => {
    getAllPersonas();
  }, [])

  return (
    <>
      {/* Principal page */}
      <div className="w-11/12 md:w-2/3 mx-auto">
        <PersonasHeader />
        <PersonasTable />
      </div>
    </>
  )
}