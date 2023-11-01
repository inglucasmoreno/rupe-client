import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "../home"
import { Layout } from "../layout"
import { UsersPage } from "../users/UsersPage"
import { LoadingModal } from "../../modals"
import { useAuthStore } from "../../hooks"
import { PersonasPage } from "../personas"
import { VehiculosPage } from "../vehiculos"
import { RupeDiscapacidadDetallesPage, RupesDiscapacidadPage } from "../rupes-discapacidad"
import { RupesConductorDiscapacitadoPage } from "../rupes-conductor-discapacitado"
import { RupesConductorDiscapacitadoDetallesPage } from "../rupes-conductor-discapacitado/RupesConductorDiscapacitadoDetallesPage"

export const PrincipalRouter = () => {

  const { user }: any = useAuthStore();

  // useEffect(() => {
  //   checkAuthToken();
  // }, [])

  return (
    <Layout>
      <LoadingModal />
      <Routes>
  
        <Route path="/" element={<HomePage />} />

        {/* Admin Routes */}
        {
          user.role === 'ADMIN_ROLE' &&
          <>
            <Route path="/usuarios" element={<UsersPage />} />
          </>
        }

        {/* General routes */}
        <Route path="/personas" element={<PersonasPage />} />
        <Route path="/rupes-discapacidad" element={<RupesDiscapacidadPage />} />
        <Route path="/rupes-discapacidad/detalles/:id" element={<RupeDiscapacidadDetallesPage />} />
        <Route path="/rupes-conductor-discapacitado" element={<RupesConductorDiscapacitadoPage />} />
        <Route path="/rupes-conductor-discapacitado/detalles/:id" element={<RupesConductorDiscapacitadoDetallesPage />} />
        <Route path="/vehiculos" element={<VehiculosPage />} />
        <Route path="/*" element={<Navigate to="/" />} />

      </Routes>
    </Layout>
  )
}

