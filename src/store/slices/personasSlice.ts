import { createSlice } from '@reduxjs/toolkit';

export const personasSlice = createSlice({
  name: 'personas',
  initialState: {
    isLoadingPersonas: false,
    isLoadingPersonasModal: false,
    personas: [],
    activePersona: {
      id: 0,
      apellido: '',
      nombre: '',
      dni: '',
      telefono: '',
      sexo: 'Masculino',
      discapacidad: false,
      activo: true
    },
    success: '',
    error: '',
  },
  reducers: {

    onStartLoadingPersonas: (state) => {
      state.isLoadingPersonas = true;
      state.isLoadingPersonasModal = false;
      state.personas = [];
      state.success = '';
      state.error = '';
    },

    onStartLoadingModalPersonas: (state) => {
      state.isLoadingPersonas = false;
      state.isLoadingPersonasModal = true;
      state.success = '';
      state.error = '';
    },

    onSetActivePersona: (state, { payload }) => {
      state.activePersona = payload;
    },

    onGetAllPersonas: (state, { payload }) => {
      state.isLoadingPersonas = false;
      state.isLoadingPersonasModal = false;
      state.personas = payload;
      state.success = '';
      state.error = '';
    },

    onAddNewPersona: (state, { payload }) => {
      state.personas.unshift(payload);
      state.isLoadingPersonas = false;
      state.isLoadingPersonasModal = false;
    },

    onUpdatePersona: (state, { payload }) => {
      state.personas = state.personas.map( (persona: any) => {
        if(persona.id === payload.id) return payload;
        return persona;
      });
      state.isLoadingPersonas = false;
      state.isLoadingPersonasModal = false;
    },

    onActiveInactivePersona: (state, { payload }) => {
      state.personas = state.personas.map( (persona: any) => {
        if(persona.id === payload.id) return payload;
        return persona;
      });
      state.isLoadingPersonas = false;
      state.isLoadingPersonasModal = false;
    },

    onDeletePersona: (state, { payload }) => {
      state.personas = state.personas.filter( (persona: any) => persona.id !== payload.id );
      state.isLoadingPersonas = false;
      state.isLoadingPersonasModal = false;
    },

    onErrorPersona: (state, { payload }) => {
      state.success = '';
      state.error = payload;
      state.isLoadingPersonas = false;
      state.isLoadingPersonasModal = false;
    },

  }
});

export const {
  onStartLoadingPersonas,
  onStartLoadingModalPersonas,
  onSetActivePersona,
  onGetAllPersonas,
  onAddNewPersona,
  onUpdatePersona,
  onActiveInactivePersona,
  onDeletePersona,
  onErrorPersona
} = personasSlice.actions;

