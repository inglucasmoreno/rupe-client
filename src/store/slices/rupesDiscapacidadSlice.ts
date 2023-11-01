import { createSlice } from '@reduxjs/toolkit';

export const rupesDiscapacidadSlice = createSlice({
  name: 'rupesDiscapacidad',
  initialState: {
    isLoadingRupesDiscapacidad: false,
    isLoadingRupesDiscapacidadModal: false,
    rupesDiscapacidad: [],
    activeRupeDiscapacidad: {
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

    onStartLoadingRupesDiscapacidad: (state) => {
      state.isLoadingRupesDiscapacidad = true;
      state.isLoadingRupesDiscapacidadModal = false;
      state.rupesDiscapacidad = [];
      state.success = '';
      state.error = '';
    },

    onStartLoadingModalRupesDiscapacidad: (state) => {
      state.isLoadingRupesDiscapacidad = false;
      state.isLoadingRupesDiscapacidadModal = true;
      state.success = '';
      state.error = '';
    },

    onSetActiveRupeDiscapacidad: (state, { payload }) => {
      state.isLoadingRupesDiscapacidad = false;
      state.isLoadingRupesDiscapacidadModal = false;
      state.activeRupeDiscapacidad = payload;
    },

    onGetAllRupesDiscapacidad: (state, { payload }) => {
      state.isLoadingRupesDiscapacidad = false;
      state.isLoadingRupesDiscapacidadModal = false;
      state.rupesDiscapacidad = payload;
      state.success = '';
      state.error = '';
    },

    onAddNewRupeDiscapacidad: (state, { payload }) => {
      state.rupesDiscapacidad.unshift(payload);
      state.isLoadingRupesDiscapacidad = false;
      state.isLoadingRupesDiscapacidadModal = false;
    },

    onUpdateRupeDiscapacidad: (state, { payload }) => {
      state.activeRupeDiscapacidad = payload;
      state.rupesDiscapacidad = state.rupesDiscapacidad.map( (rupeDiscapacidad: any) => {
        if(rupeDiscapacidad.id === payload.id) return payload;
        return rupeDiscapacidad;
      });
      state.isLoadingRupesDiscapacidad = false;
      state.isLoadingRupesDiscapacidadModal = false;
    },

    onActiveInactiveRupeDiscapacidad: (state, { payload }) => {
      state.rupesDiscapacidad = state.rupesDiscapacidad.map( (rupeDiscapacidad: any) => {
        if(rupeDiscapacidad.id === payload.id) return payload;
        return rupeDiscapacidad;
      });
      state.isLoadingRupesDiscapacidad = false;
      state.isLoadingRupesDiscapacidadModal = false;
    },

    onDeleteRupeDiscapacidad: (state, { payload }) => {
      state.rupesDiscapacidad = state.rupesDiscapacidad.filter( (rupeDiscapacidad: any) => rupeDiscapacidad.id !== payload.id );
      state.isLoadingRupesDiscapacidad = false;
      state.isLoadingRupesDiscapacidadModal = false;
    },

    onErrorRupeDiscapacidad: (state, { payload }) => {
      state.success = '';
      state.error = payload;
      state.isLoadingRupesDiscapacidad = false;
      state.isLoadingRupesDiscapacidadModal = false;
    },

  }
});

export const {
  onStartLoadingRupesDiscapacidad,
  onStartLoadingModalRupesDiscapacidad,
  onSetActiveRupeDiscapacidad,
  onGetAllRupesDiscapacidad,
  onAddNewRupeDiscapacidad,
  onUpdateRupeDiscapacidad,
  onActiveInactiveRupeDiscapacidad,
  onDeleteRupeDiscapacidad,
  onErrorRupeDiscapacidad
} = rupesDiscapacidadSlice.actions;

