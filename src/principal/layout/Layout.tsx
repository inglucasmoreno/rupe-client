import { Navbar } from "."
import { ChangePasswordModal, PersonasModal, RupesConductorDiscapacitadoModal, RupesConductorDiscapacitadoRenovacionesModal, RupesConductoresModal, RupesDiscapacidadModal, RupesDiscapacidadRenovacionesModal, UserModal, VehiculosModal } from "../../modals"

export const Layout = ({ children }: any) => {
  return (
    <div>

      <Navbar />

      {/* Modals */}
      <PersonasModal />
      <VehiculosModal />
      <RupesConductoresModal />
      <RupesDiscapacidadModal />
      <RupesDiscapacidadRenovacionesModal />
      <RupesConductorDiscapacitadoModal />
      <RupesConductorDiscapacitadoRenovacionesModal />
      <UserModal />
      <ChangePasswordModal />

      <div className="h-screen">
        {children}
      </div>
    </div>
  )
}

