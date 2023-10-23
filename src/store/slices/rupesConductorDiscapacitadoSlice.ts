import { createSlice } from '@reduxjs/toolkit';

export const rupesConductorDiscapacitadoSlice = createSlice({
  name: 'rupesConductorDiscapacitado',
  initialState: {
    isLoadingRupesConductorDiscapacitado: false,
    isLoadingRupesConductorDiscapacitadoModal: false,
    rupesConductorDiscapacitado: [],
    activeRupeConductorDiscapacitado: {
      id: 0,
      beneficiario: 0,
      vehiculo: 0,
      telefonoContacto: '',
      observaciones: '',
      fechaOtorgamiento: '',
      fechaVencimiento: '',
      entregado: '',
      controlado: '',
      activo: true
    },
    success: '',
    error: '',
  },
  reducers: {

    onStartLoadingRupesConductorDiscapacitado: (state) => {
      state.isLoadingRupesConductorDiscapacitado = true;
      state.isLoadingRupesConductorDiscapacitadoModal = false;
      state.rupesConductorDiscapacitado = [];
      state.success = '';
      state.error = '';
    },

    onStartLoadingModalRupesConductorDiscapacitado: (state) => {
      state.isLoadingRupesConductorDiscapacitado = false;
      state.isLoadingRupesConductorDiscapacitadoModal = true;
      state.success = '';
      state.error = '';
    },

    onSetActiveRupeConductorDiscapacitado: (state, { payload }) => {
      state.activeRupeConductorDiscapacitado = payload;
    },

    onGetAllRupesConductorDiscapacitado: (state, { payload }) => {
      state.isLoadingRupesConductorDiscapacitado = false;
      state.isLoadingRupesConductorDiscapacitadoModal = false;
      state.rupesConductorDiscapacitado = payload;
      state.success = '';
      state.error = '';
    },

    onAddNewRupeConductorDiscapacitado: (state, { payload }) => {
      state.rupesConductorDiscapacitado.unshift(payload);
      state.isLoadingRupesConductorDiscapacitado = false;
      state.isLoadingRupesConductorDiscapacitadoModal = false;
    },

    onUpdateRupeConductorDiscapacitado: (state, { payload }) => {
      state.rupesConductorDiscapacitado = state.rupesConductorDiscapacitado.map( (rupeConductorDiscapacitado: any) => {
        if(rupeConductorDiscapacitado.id === payload.id) return payload;
        return rupeConductorDiscapacitado;
      });
      state.isLoadingRupesConductorDiscapacitado = false;
      state.isLoadingRupesConductorDiscapacitadoModal = false;
    },

    onActiveInactiveRupeConductorDiscapacitado: (state, { payload }) => {
      state.rupesConductorDiscapacitado = state.rupesConductorDiscapacitado.map( (rupeConductorDiscapacitado: any) => {
        if(rupeConductorDiscapacitado.id === payload.id) return payload;
        return rupeConductorDiscapacitado;
      });
      state.isLoadingRupesConductorDiscapacitado = false;
      state.isLoadingRupesConductorDiscapacitadoModal = false;
    },

    onDeleteRupeConductorDiscapacitado: (state, { payload }) => {
      state.rupesConductorDiscapacitado = state.rupesConductorDiscapacitado.filter( (rupeConductorDiscapacitado: any) => rupeConductorDiscapacitado.id !== payload.id );
      state.isLoadingRupesConductorDiscapacitado = false;
      state.isLoadingRupesConductorDiscapacitadoModal = false;
    },

    onErrorRupeConductorDiscapacitado: (state, { payload }) => {
      state.success = '';
      state.error = payload;
      state.isLoadingRupesConductorDiscapacitado = false;
      state.isLoadingRupesConductorDiscapacitadoModal = false;
    },

  }
});

export const {
  onStartLoadingRupesConductorDiscapacitado,
  onStartLoadingModalRupesConductorDiscapacitado,
  onSetActiveRupeConductorDiscapacitado,
  onGetAllRupesConductorDiscapacitado,
  onAddNewRupeConductorDiscapacitado,
  onUpdateRupeConductorDiscapacitado,
  onActiveInactiveRupeConductorDiscapacitado,
  onDeleteRupeConductorDiscapacitado,
  onErrorRupeConductorDiscapacitado
} = rupesConductorDiscapacitadoSlice.actions;

