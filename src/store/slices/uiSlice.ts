import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDarkMode: false,
    isUserOpen: false,
    isPersonasOpen: false,
    isRupesDiscapacidadOpen: false,
    isRupesConductorDiscapacitadoOpen: false,
    isRupesConductorOpen: false,
    isVehiculosOpen: false,
    isChangePasswordOpen: false,
    isProfileOpen: false,
    isLoadingOpen: false,
    loadingMessage: '',
  },
  reducers: {

    // Modo oscuro

    onInitDarkMode: (state, { payload }) => {
      state.isDarkMode = payload;
    },

    onToggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },

    // Usuarios

    onToggleNewUser: (state) => {
      state.isUserOpen = !state.isUserOpen;
    },

    // Perfil

    onToggleProfile: (state) => {
      state.isProfileOpen = !state.isProfileOpen;
    },

    onToggleChangePassword: (state) => {
      state.isChangePasswordOpen = !state.isChangePasswordOpen;
    },

    // Personas

    onTogglePersonas: (state) => {
      state.isPersonasOpen = !state.isPersonasOpen;
    },

    // RUPES - Discapacidad

    onToggleRupesDiscapacidad: (state) => {
      state.isRupesDiscapacidadOpen = !state.isRupesDiscapacidadOpen;
    },

    // RUPES - Conductor Discapacitado

    onToggleRupesConductorDiscapacitado: (state) => {
      state.isRupesConductorDiscapacitadoOpen = !state.isRupesConductorDiscapacitadoOpen;
    },

    // RUPES - Conductor

    onToggleRupesConductor: (state) => {
      state.isRupesConductorOpen = !state.isRupesConductorOpen;
    },

    // Vehiculos

    onToggleVehiculos: (state) => {
      state.isVehiculosOpen = !state.isVehiculosOpen;
    },

    // Loading - Modal de carga

    onOpenLoading: (state, { payload }) => {
      state.isLoadingOpen = true;
      state.loadingMessage = payload;
    },

    onCloseLoading: (state) => {
      state.isLoadingOpen = false;
      state.loadingMessage = '';
    },
  }

});

export const {
  onInitDarkMode,
  onToggleDarkMode,
  onToggleNewUser,
  onTogglePersonas,
  onToggleRupesDiscapacidad,
  onToggleRupesConductorDiscapacitado,
  onToggleRupesConductor,
  onToggleVehiculos,
  onToggleProfile,
  onToggleChangePassword,
  onOpenLoading,
  onCloseLoading,
} = uiSlice.actions;
