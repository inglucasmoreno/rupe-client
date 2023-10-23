import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../store/store';
import {
  onAddNewRupeConductorDiscapacitado,
  onErrorRupeConductorDiscapacitado,
  onGetAllRupesConductorDiscapacitado,
  onSetActiveRupeConductorDiscapacitado,
  onStartLoadingModalRupesConductorDiscapacitado,
  onStartLoadingRupesConductorDiscapacitado,
  onToggleRupesConductorDiscapacitado,
  onActiveInactiveRupeConductorDiscapacitado,
  onUpdateRupeConductorDiscapacitado,
  onOpenLoading,
  onCloseLoading,
} from "../store/slices";
import { backendApi } from "../api";
import { notistack } from "../helpers";

export const useRupesConductorDiscapacitadoStore = () => {

  const dispatch = useDispatch();

  const { 
      success, 
      error, 
      isLoadingRupesConductorDiscapacitado, 
      isLoadingRupesConductorDiscapacitadoModal,
      rupesConductorDiscapacitado,
      activeRupeConductorDiscapacitado 
  } = useSelector((state: RootState) => state.rupesConductorDiscapacitado);

  const setActiveRupeConductorDiscapacitado = (rupeConductorDiscapacitado) => {
    dispatch(onSetActiveRupeConductorDiscapacitado(rupeConductorDiscapacitado));
  }

  const getAllRupesConductorDiscapacitado = async () => {

    dispatch(onStartLoadingRupesConductorDiscapacitado());

    try {
      const { data } = await backendApi.get('rupe-conductor-discapacitado');
      dispatch(onGetAllRupesConductorDiscapacitado(data.rupes));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorRupeConductorDiscapacitado(errorMessage));
    }

  }

  const addNewRupeConductorDiscapacitado = async (rupeConductorDiscapacitadoData: any) => {

    dispatch(onStartLoadingModalRupesConductorDiscapacitado());

    try {
      const { data } = await backendApi.post('rupe-conductor-discapacitado', rupeConductorDiscapacitadoData);
      dispatch(onAddNewRupeConductorDiscapacitado(data.rupe));
      notistack.success('RUPE conductor discapacitado creado correctamente');
      dispatch(onToggleRupesConductorDiscapacitado());
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorRupeConductorDiscapacitado(errorMessage));
    }

  }

  const updateRupeConductorDiscapacitado = async (rupeConductorDiscapacitadoData: any) => {
    
    dispatch(onStartLoadingModalRupesConductorDiscapacitado());
    
    try{
      const { data } = await backendApi.patch(`rupe-conductor-discapacitado/${activeRupeConductorDiscapacitado.id}`, rupeConductorDiscapacitadoData);
      dispatch(onUpdateRupeConductorDiscapacitado(data.rupe));
      notistack.success('RUPE conductor discapacitado actualizado correctamente');
      dispatch(onToggleRupesConductorDiscapacitado());
    }catch(error){
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorRupeConductorDiscapacitado(errorMessage));
    }

  }

  const activeInactiveRupeConductorDiscapacitado = async (rupeConductorDiscapacitadoData: any) => {

    dispatch(onOpenLoading(rupeConductorDiscapacitadoData.activo ? 'Alta de RUPE' : 'Baja de RUPE'));
    
    try{
      const { data } = await backendApi.patch(`rupe-conductor-discapacitado/${rupeConductorDiscapacitadoData.id}`, rupeConductorDiscapacitadoData);
      dispatch(onActiveInactiveRupeConductorDiscapacitado(data.rupe));
      dispatch(onCloseLoading());
      notistack.success('RUPE conductor discapacitado actualizado correctamente');
    }catch(error){
      const errorMessage = error.response.data.message;
      dispatch(onCloseLoading());
      notistack.error(errorMessage);
      dispatch(onErrorRupeConductorDiscapacitado(errorMessage));
    }

  }

  return {

    // Properties
    success,
    error,
    isLoadingRupesConductorDiscapacitado,
    isLoadingRupesConductorDiscapacitadoModal,
    rupesConductorDiscapacitado,
    activeRupeConductorDiscapacitado,

    // Methods
    getAllRupesConductorDiscapacitado,
    addNewRupeConductorDiscapacitado,
    updateRupeConductorDiscapacitado,
    setActiveRupeConductorDiscapacitado,
    activeInactiveRupeConductorDiscapacitado,

  }

}

