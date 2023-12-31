import { configureStore } from '@reduxjs/toolkit'
import { 
  authSlice, 
  sidebarSlice, 
  uiSlice, 
  usersSlice,
  vehiculosSlice,
  personasSlice,
  confirmModalSlice,
  rupesDiscapacidadSlice,
  rupesConductorDiscapacitadoSlice,
  rupesConductorSlice,
  rupesDiscapacidadRenovacionesSlice,
  rupesConductorDiscapacitadoRenovacionesSlice,
} from './slices'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    sidebar: sidebarSlice.reducer,
    users: usersSlice.reducer,
    personas: personasSlice.reducer,
    rupesDiscapacidad: rupesDiscapacidadSlice.reducer,
    rupesDiscapacidadRenovaciones: rupesDiscapacidadRenovacionesSlice.reducer,
    rupesConductorDiscapacitado: rupesConductorDiscapacitadoSlice.reducer,
    rupesConductorDiscapacitadoRenovaciones: rupesConductorDiscapacitadoRenovacionesSlice.reducer,
    rupesConductor: rupesConductorSlice.reducer,
    vehiculos: vehiculosSlice.reducer,
    ui: uiSlice.reducer,
    confirmModal: confirmModalSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
