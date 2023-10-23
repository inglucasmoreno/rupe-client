import { createSlice } from '@reduxjs/toolkit';

export const confirmModalSlice = createSlice({
  name: 'confirmModal',
  initialState: {
    isConfirmOpen: false,
    isConfirm: false,
    actionConfirm: '',
    message: '',
    textConfirm: '',
    textCancel: '',
  },
  reducers: {
    onOpenConfirm: (state, { payload }) => {
      state.isConfirmOpen = true;
      state.isConfirm = false;
      state.actionConfirm = payload.actionConfirm;
      state.message = payload.message ? payload.message : 'Estas seguro?';
      state.textCancel = payload.textCancel ? payload.textCancel : 'Cancelar';
      state.textConfirm = payload.textConfirm ? payload.textConfirm : 'Aceptar';
    },
    onCloseConfirm: (state) => {
      state.isConfirmOpen = false;
      state.actionConfirm = '';
    },
    onConfirm: (state) => {
      state.isConfirm = true;
      state.isConfirmOpen = false;
    },
  }
});

export const {
  onOpenConfirm,
  onCloseConfirm,
  onConfirm
} = confirmModalSlice.actions;
