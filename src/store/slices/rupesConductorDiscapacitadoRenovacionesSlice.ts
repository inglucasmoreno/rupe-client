import { createSlice } from '@reduxjs/toolkit';

export const rupesConductorDiscapacitadoRenovacionesSlice = createSlice({
  name: 'rupesConductorDiscapacitadoRenovaciones',
  initialState: {
    isLoadingRupesConductorDiscapacitadoRenovaciones: false,
    isLoadingRupesConductorDiscapacitadoRenovacionesModal: false,
    rupesConductorDiscapacitadoRenovaciones: [],
    activeRupeConductorDiscapacitadoRenovacion: {
      id: 0,
      rupeConductorDiscapacitado: 0,
      activo: true
    },
    success: '',
    error: '',
  },
  reducers: {

    onStartLoadingRupesConductorDiscapacitadoRenovaciones: (state) => {
      state.isLoadingRupesConductorDiscapacitadoRenovaciones = true;
      state.isLoadingRupesConductorDiscapacitadoRenovacionesModal = false;
      state.rupesConductorDiscapacitadoRenovaciones = [];
      state.success = '';
      state.error = '';
    },

    onStartLoadingModalRupesConductorDiscapacitadoRenovaciones: (state) => {
      state.isLoadingRupesConductorDiscapacitadoRenovaciones = false;
      state.isLoadingRupesConductorDiscapacitadoRenovacionesModal = true;
      state.success = '';
      state.error = '';
    },

    onSetActiveRupeConductorDiscapacitadoRenovacion: (state, { payload }) => {
      state.isLoadingRupesConductorDiscapacitadoRenovaciones = false;
      state.isLoadingRupesConductorDiscapacitadoRenovacionesModal = false;
      state.activeRupeConductorDiscapacitadoRenovacion = payload;
    },

    onGetAllRupesConductorDiscapacitadoRenovaciones: (state, { payload }) => {
      state.isLoadingRupesConductorDiscapacitadoRenovaciones = false;
      state.isLoadingRupesConductorDiscapacitadoRenovacionesModal = false;
      state.rupesConductorDiscapacitadoRenovaciones = payload;
      state.success = '';
      state.error = '';
    },

    onAddNewRupeConductorDiscapacitadoRenovacion: (state, { payload }) => {
      state.rupesConductorDiscapacitadoRenovaciones.unshift(payload);
      state.isLoadingRupesConductorDiscapacitadoRenovaciones = false;
      state.isLoadingRupesConductorDiscapacitadoRenovacionesModal = false;
    },

    onUpdateRupeConductorDiscapacitadoRenovacion: (state, { payload }) => {
      state.activeRupeConductorDiscapacitadoRenovacion = payload;
      state.rupesConductorDiscapacitadoRenovaciones = state.rupesConductorDiscapacitadoRenovaciones.map( (rupeConductorDiscapacitadoRenovacion: any) => {
        if(rupeConductorDiscapacitadoRenovacion.id === payload.id) return payload;
        return rupeConductorDiscapacitadoRenovacion;
      });
      state.isLoadingRupesConductorDiscapacitadoRenovaciones = false;
      state.isLoadingRupesConductorDiscapacitadoRenovacionesModal = false;
    },

    onActiveInactiveRupeConductorDiscapacitadoRenovacion: (state, { payload }) => {
      state.rupesConductorDiscapacitadoRenovaciones = state.rupesConductorDiscapacitadoRenovaciones.map( (rupeConductorDiscapacitadoRenovacion: any) => {
        if(rupeConductorDiscapacitadoRenovacion.id === payload.id) return payload;
        return rupeConductorDiscapacitadoRenovacion;
      });
      state.isLoadingRupesConductorDiscapacitadoRenovaciones = false;
      state.isLoadingRupesConductorDiscapacitadoRenovacionesModal = false;
    },

    onDeleteRupeConductorDiscapacitadoRenovacion: (state, { payload }) => {
      state.rupesConductorDiscapacitadoRenovaciones = state.rupesConductorDiscapacitadoRenovaciones.filter( (rupeConductorDiscapacitadoRenovacion: any) => rupeConductorDiscapacitadoRenovacion.id !== payload.id );
      state.isLoadingRupesConductorDiscapacitadoRenovaciones = false;
      state.isLoadingRupesConductorDiscapacitadoRenovacionesModal = false;
    },

    onErrorRupeConductorDiscapacitadoRenovaciones: (state, { payload }) => {
      state.success = '';
      state.error = payload;
      state.isLoadingRupesConductorDiscapacitadoRenovaciones = false;
      state.isLoadingRupesConductorDiscapacitadoRenovacionesModal = false;
    },

  }
});

export const {
  onStartLoadingRupesConductorDiscapacitadoRenovaciones,
  onStartLoadingModalRupesConductorDiscapacitadoRenovaciones,
  onSetActiveRupeConductorDiscapacitadoRenovacion,
  onGetAllRupesConductorDiscapacitadoRenovaciones,
  onAddNewRupeConductorDiscapacitadoRenovacion,
  onUpdateRupeConductorDiscapacitadoRenovacion,
  onActiveInactiveRupeConductorDiscapacitadoRenovacion,
  onDeleteRupeConductorDiscapacitadoRenovacion,
  onErrorRupeConductorDiscapacitadoRenovaciones
} = rupesConductorDiscapacitadoRenovacionesSlice.actions;

