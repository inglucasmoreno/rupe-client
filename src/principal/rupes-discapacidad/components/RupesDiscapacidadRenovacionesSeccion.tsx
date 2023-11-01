import { Button } from "@nextui-org/react"
import { useRupesDiscapacidadStore, useUiStore } from "../../../hooks"
import { useEffect } from "react";
import { useRupesDiscapacidadRenovacionesStore } from "../../../hooks/useRupesDiscapacidadRenovaciones";
import { format } from "date-fns";


export const RupesDiscapacidadRenovacionesSeccion = () => {

  const { activeRupeDiscapacidad } = useRupesDiscapacidadStore();
  const { toggleRupesDiscapacidadRenovaciones } = useUiStore();
  const {
    getAllRupesDiscapacidadRenovaciones,
    isLoadingRupesDiscapacidadRenovaciones,
    rupesDiscapacidadRenovaciones
  } = useRupesDiscapacidadRenovacionesStore();

  useEffect(() => {
    getAllRupesDiscapacidadRenovaciones(activeRupeDiscapacidad?.id);
  }, [])

  const abrirModalRenovacion = () => {
    toggleRupesDiscapacidadRenovaciones();
  }

  return (
    <div>
      <h1 className="text-lg text-center font-semibold">
        RENOVACION DE RUPE
      </h1>
      <div className="p-2">
        <div className="w-full flex items-center justify-center mt-4">
          <Button onClick={() => abrirModalRenovacion()} className="mx-auto" color="secondary">
            Generar renovación
          </Button>
        </div>

        {
          isLoadingRupesDiscapacidadRenovaciones ?

            <div className="text-lg text-zinc-500 dark:text-zinc-300 text-center mt-8">
              Cargando renovaciones...
            </div>

            :

            <div className="mt-4">

              {
                rupesDiscapacidadRenovaciones?.length === 0 ?

                  <div className="text-lg text-zinc-500 dark:text-zinc-300 text-center mt-8">
                    No hay renovaciones registradas
                  </div>

                  :

                  <div className="text-center w-max shadow border border-gray-300 mx-auto bg-zinc-100 dark:bg-zinc-800 p-4 mt-10">
                    <h2 className="text-lg font-semibold"> FECHA DE ULTIMA RENOVACION </h2>
                    <p className="bg-secondary rounded text-white p-2 w-max mx-auto mt-4">
                      {
                        activeRupeDiscapacidad &&
                        format(new Date(activeRupeDiscapacidad?.fechaOtorgamiento), 'dd/MM/yyyy')
                      }
                    </p>
                  </div>

              }

            </div>

        }



      </div>
    </div>
  )
}

