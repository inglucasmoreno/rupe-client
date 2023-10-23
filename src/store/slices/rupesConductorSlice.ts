import { createSlice } from '@reduxjs/toolkit';

export const rupesConductorSlice = createSlice({
  name: 'rupesConductor',
  initialState: {
    isLoadingRupesConductor: false,
    isLoadingRupesConductorModal: false,
    rupesConductor: [],
    activeRupeConductor: {
      id: 0,
      persona: 0,
      rupeConductorDiscapacitado: 0,
      activo: true
    },
    success: '',
    error: '',
  },
  reducers: {

    onStartLoadingRupesConductor: (state) => {
      state.isLoadingRupesConductor = true;
      state.isLoadingRupesConductorModal = false;
      state.rupesConductor = [];
      state.success = '';
      state.error = '';
    },

    onStartLoadingModalRupesConductor: (state) => {
      state.isLoadingRupesConductor = false;
      state.isLoadingRupesConductorModal = true;
      state.success = '';
      state.error = '';
    },

    onSetActiveRupeConductor: (state, { payload }) => {
      state.activeRupeConductor = payload;
    },

    onGetAllRupesConductor: (state, { payload }) => {
      state.isLoadingRupesConductor = false;
      state.isLoadingRupesConductorModal = false;
      state.rupesConductor = payload;
      state.success = '';
      state.error = '';
    },

    onAddNewRupeConductor: (state, { payload }) => {
      state.rupesConductor.unshift(payload);
      state.isLoadingRupesConductor = false;
      state.isLoadingRupesConductorModal = false;
    },

    onUpdateRupeConductor: (state, { payload }) => {
      state.rupesConductor = state.rupesConductor.map( (rupeConductor: any) => {
        if(rupeConductor.id === payload.id) return payload;
        return rupeConductor;
      });
      state.isLoadingRupesConductor = false;
      state.isLoadingRupesConductorModal = false;
    },

    onActiveInactiveRupeConductor: (state, { payload }) => {
      state.rupesConductor = state.rupesConductor.map( (rupeConductor: any) => {
        if(rupeConductor.id === payload.id) return payload;
        return rupeConductor;
      });
      state.isLoadingRupesConductor = false;
      state.isLoadingRupesConductorModal = false;
    },

    onDeleteRupeConductor: (state, { payload }) => {
      state.rupesConductor = state.rupesConductor.filter( (rupeConductor: any) => rupeConductor.id !== payload.id );
      state.isLoadingRupesConductor = false;
      state.isLoadingRupesConductorModal = false;
    },

    onErrorRupeConductor: (state, { payload }) => {
      state.success = '';
      state.error = payload;
      state.isLoadingRupesConductor = false;
      state.isLoadingRupesConductorModal = false;
    },

  }
});

export const {
  onStartLoadingRupesConductor,
  onStartLoadingModalRupesConductor,
  onSetActiveRupeConductor,
  onGetAllRupesConductor,
  onAddNewRupeConductor,
  onUpdateRupeConductor,
  onActiveInactiveRupeConductor,
  onDeleteRupeConductor,
  onErrorRupeConductor
} = rupesConductorSlice.actions;

