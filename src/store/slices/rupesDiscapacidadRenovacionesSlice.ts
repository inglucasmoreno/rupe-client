import { createSlice } from '@reduxjs/toolkit';

export const rupesDiscapacidadRenovacionesSlice = createSlice({
  name: 'rupesDiscapacidadRenovaciones',
  initialState: {
    isLoadingRupesDiscapacidadRenovaciones: false,
    isLoadingRupesDiscapacidadRenovacionesModal: false,
    rupesDiscapacidadRenovaciones: [],
    activeRupeDiscapacidadRenovacion: {
      id: 0,
      rupeDiscapacidad: 0,
      activo: true
    },
    success: '',
    error: '',
  },
  reducers: {

    onStartLoadingRupesDiscapacidadRenovaciones: (state) => {
      state.isLoadingRupesDiscapacidadRenovaciones = true;
      state.isLoadingRupesDiscapacidadRenovacionesModal = false;
      state.rupesDiscapacidadRenovaciones = [];
      state.success = '';
      state.error = '';
    },

    onStartLoadingModalRupesDiscapacidadRenovaciones: (state) => {
      state.isLoadingRupesDiscapacidadRenovaciones = false;
      state.isLoadingRupesDiscapacidadRenovacionesModal = true;
      state.success = '';
      state.error = '';
    },

    onSetActiveRupeDiscapacidadRenovacion: (state, { payload }) => {
      state.isLoadingRupesDiscapacidadRenovaciones = false;
      state.isLoadingRupesDiscapacidadRenovacionesModal = false;
      state.activeRupeDiscapacidadRenovacion = payload;
    },

    onGetAllRupesDiscapacidadRenovaciones: (state, { payload }) => {
      state.isLoadingRupesDiscapacidadRenovaciones = false;
      state.isLoadingRupesDiscapacidadRenovacionesModal = false;
      state.rupesDiscapacidadRenovaciones = payload;
      state.success = '';
      state.error = '';
    },

    onAddNewRupeDiscapacidadRenovacion: (state, { payload }) => {
      state.rupesDiscapacidadRenovaciones.unshift(payload);
      state.isLoadingRupesDiscapacidadRenovaciones = false;
      state.isLoadingRupesDiscapacidadRenovacionesModal = false;
    },

    onUpdateRupeDiscapacidadRenovacion: (state, { payload }) => {
      state.activeRupeDiscapacidadRenovacion = payload;
      state.rupesDiscapacidadRenovaciones = state.rupesDiscapacidadRenovaciones.map( (rupeDiscapacidadRenovacion: any) => {
        if(rupeDiscapacidadRenovacion.id === payload.id) return payload;
        return rupeDiscapacidadRenovacion;
      });
      state.isLoadingRupesDiscapacidadRenovaciones = false;
      state.isLoadingRupesDiscapacidadRenovacionesModal = false;
    },

    onActiveInactiveRupeDiscapacidadRenovacion: (state, { payload }) => {
      state.rupesDiscapacidadRenovaciones = state.rupesDiscapacidadRenovaciones.map( (rupeDiscapacidadRenovacion: any) => {
        if(rupeDiscapacidadRenovacion.id === payload.id) return payload;
        return rupeDiscapacidadRenovacion;
      });
      state.isLoadingRupesDiscapacidadRenovaciones = false;
      state.isLoadingRupesDiscapacidadRenovacionesModal = false;
    },

    onDeleteRupeDiscapacidadRenovacion: (state, { payload }) => {
      state.rupesDiscapacidadRenovaciones = state.rupesDiscapacidadRenovaciones.filter( (rupeDiscapacidadRenovacion: any) => rupeDiscapacidadRenovacion.id !== payload.id );
      state.isLoadingRupesDiscapacidadRenovaciones = false;
      state.isLoadingRupesDiscapacidadRenovacionesModal = false;
    },

    onErrorRupeDiscapacidadRenovaciones: (state, { payload }) => {
      state.success = '';
      state.error = payload;
      state.isLoadingRupesDiscapacidadRenovaciones = false;
      state.isLoadingRupesDiscapacidadRenovacionesModal = false;
    },

  }
});

export const {
  onStartLoadingRupesDiscapacidadRenovaciones,
  onStartLoadingModalRupesDiscapacidadRenovaciones,
  onSetActiveRupeDiscapacidadRenovacion,
  onGetAllRupesDiscapacidadRenovaciones,
  onAddNewRupeDiscapacidadRenovacion,
  onUpdateRupeDiscapacidadRenovacion,
  onActiveInactiveRupeDiscapacidadRenovacion,
  onDeleteRupeDiscapacidadRenovacion,
  onErrorRupeDiscapacidadRenovaciones
} = rupesDiscapacidadRenovacionesSlice.actions;

