import { createSlice } from '@reduxjs/toolkit';

export const vehiculosSlice = createSlice({
  name: 'vehiculos',
  initialState: {
    isLoadingVehiculos: false,
    isLoadingVehiculosModal: false,
    vehiculos: [],
    activeVehiculo: {
      id: 0,
      dominio: '',
      marca: '',
      modelo: '',
      activo: true
    },
    success: '',
    error: '',
  },
  reducers: {

    onStartLoadingVehiculos: (state) => {
      state.isLoadingVehiculos = true;
      state.isLoadingVehiculosModal = false;
      state.vehiculos = [];
      state.success = '';
      state.error = '';
    },

    onStartLoadingModalVehiculos: (state) => {
      state.isLoadingVehiculos = false;
      state.isLoadingVehiculosModal = true;
      state.success = '';
      state.error = '';
    },

    onSetActiveVehiculo: (state, { payload }) => {
      state.activeVehiculo = payload;
    },

    onGetAllVehiculos: (state, { payload }) => {
      state.isLoadingVehiculos = false;
      state.isLoadingVehiculosModal = false;
      state.vehiculos = payload;
      state.success = '';
      state.error = '';
    },

    onAddNewVehiculo: (state, { payload }) => {
      state.vehiculos.unshift(payload);
      state.isLoadingVehiculos = false;
      state.isLoadingVehiculosModal = false;
    },

    onUpdateVehiculo: (state, { payload }) => {
      state.vehiculos = state.vehiculos.map( (vehiculo: any) => {
        if(vehiculo.id === payload.id) return payload;
        return vehiculo;
      });
      state.isLoadingVehiculos = false;
      state.isLoadingVehiculosModal = false;
    },

    onActiveInactiveVehiculo: (state, { payload }) => {
      state.vehiculos = state.vehiculos.map( (vehiculo: any) => {
        if(vehiculo.id === payload.id) return payload;
        return vehiculo;
      });
      state.isLoadingVehiculos = false;
      state.isLoadingVehiculosModal = false;
    },

    onDeleteVehiculo: (state, { payload }) => {
      state.vehiculos = state.vehiculos.filter( (vehiculo: any) => vehiculo.id !== payload.id );
      state.isLoadingVehiculos = false;
      state.isLoadingVehiculosModal = false;
    },

    onErrorVehiculo: (state, { payload }) => {
      state.success = '';
      state.error = payload;
      state.isLoadingVehiculos = false;
      state.isLoadingVehiculosModal = false;
    },

  }
});

export const {
  onStartLoadingVehiculos,
  onStartLoadingModalVehiculos,
  onSetActiveVehiculo,
  onGetAllVehiculos,
  onAddNewVehiculo,
  onUpdateVehiculo,
  onActiveInactiveVehiculo,
  onDeleteVehiculo,
  onErrorVehiculo
} = vehiculosSlice.actions;

