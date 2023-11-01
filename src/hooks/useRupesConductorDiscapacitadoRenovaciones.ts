import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../store/store';
import {
  onAddNewRupeConductorDiscapacitadoRenovacion,
  onErrorRupeConductorDiscapacitadoRenovaciones,
  onGetAllRupesConductorDiscapacitadoRenovaciones,
  onSetActiveRupeConductorDiscapacitadoRenovacion,
  onStartLoadingModalRupesConductorDiscapacitadoRenovaciones,
  onStartLoadingRupesConductorDiscapacitadoRenovaciones,
  onToggleRupesConductorDiscapacitadoRenovaciones,
  onActiveInactiveRupeConductorDiscapacitadoRenovacion,
  onUpdateRupeConductorDiscapacitadoRenovacion,
  onOpenLoading,
  onCloseLoading,
  onSetActiveRupeConductorDiscapacitado,
} from "../store/slices";
import { backendApi } from "../api";
import { notistack } from "../helpers";

export const useRupesConductorDiscapacitadoRenovacionesStore = () => {

  const dispatch = useDispatch();

  const { 
      success, 
      error, 
      isLoadingRupesConductorDiscapacitadoRenovaciones, 
      isLoadingRupesConductorDiscapacitadoRenovacionesModal,
      rupesConductorDiscapacitadoRenovaciones,
      activeRupeConductorDiscapacitadoRenovacion
  } = useSelector((state: RootState) => state.rupesConductorDiscapacitadoRenovaciones);

  const setActiveRupeConductorDiscapacitadoRenovaciones = (rupeConductorDiscapacitadoRenovacion) => {
    dispatch(onSetActiveRupeConductorDiscapacitadoRenovacion(rupeConductorDiscapacitadoRenovacion));
  }

  const getIdRupeConductorDiscapacitadoRenovacion = async (id) => {
    
    dispatch(onStartLoadingRupesConductorDiscapacitadoRenovaciones());

    try {
      const { data } = await backendApi.get(`rupe-conductor-discapacitado-renovaciones/${id}`);
      dispatch(onSetActiveRupeConductorDiscapacitadoRenovacion(data.renovacion));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorRupeConductorDiscapacitadoRenovaciones(errorMessage));
    }

  }

  const getAllRupesConductorDiscapacitadoRenovaciones = async (idRupe: number) => {

    dispatch(onStartLoadingRupesConductorDiscapacitadoRenovaciones());

    try {
      const { data } = await backendApi.get(`rupe-conductor-discapacitado-renovaciones?rupe=${idRupe}`);
      dispatch(onGetAllRupesConductorDiscapacitadoRenovaciones(data.renovaciones));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorRupeConductorDiscapacitadoRenovaciones(errorMessage));
    }

  }

  const addNewRupeConductorDiscapacitadoRenovacion = async (rupeConductorDiscapacitadoRenovacionData: any) => {

    dispatch(onStartLoadingModalRupesConductorDiscapacitadoRenovaciones());

    try {
      const { data } = await backendApi.post('rupe-conductor-discapacitado-renovaciones', rupeConductorDiscapacitadoRenovacionData);
      dispatch(onAddNewRupeConductorDiscapacitadoRenovacion(data.renovacion));
      dispatch(onSetActiveRupeConductorDiscapacitado(data.rupe));
      dispatch(onToggleRupesConductorDiscapacitadoRenovaciones());
      notistack.success('Renovacion creada correctamente');
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorRupeConductorDiscapacitadoRenovaciones(errorMessage));
    }

  }

  const updateRupeConductorDiscapacitadoRenovacion = async (rupeConductorDiscapacitadoRenovacionData: any) => {
    
    dispatch(onStartLoadingModalRupesConductorDiscapacitadoRenovaciones());
    
    try{
      const { data } = await backendApi.patch(`rupe-conductor-discapacitado-renovaciones/${activeRupeConductorDiscapacitadoRenovacion.id}`, rupeConductorDiscapacitadoRenovacionData);
      dispatch(onUpdateRupeConductorDiscapacitadoRenovacion(data.renovacion));
      notistack.success('Renovacion actualizada correctamente');
      dispatch(onToggleRupesConductorDiscapacitadoRenovaciones());
    }catch(error){
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorRupeConductorDiscapacitadoRenovaciones(errorMessage));
    }

  }

  const activeInactiveRupeConductorDiscapacitadoRenovacion = async (rupeConductorDiscapacitadoRenovacionData: any) => {

    dispatch(onOpenLoading(rupeConductorDiscapacitadoRenovacionData.activo ? 'Alta de renovacion' : 'Baja de renovacion'));
    
    try{
      const { data } = await backendApi.patch(`rupe-conductor-discapacitado-renovaciones/${rupeConductorDiscapacitadoRenovacionData.id}`, rupeConductorDiscapacitadoRenovacionData);
      dispatch(onActiveInactiveRupeConductorDiscapacitadoRenovacion(data.renovacion));
      dispatch(onCloseLoading());
      notistack.success('Renovacion actualizada correctamente');
    }catch(error){
      const errorMessage = error.response.data.message;
      dispatch(onCloseLoading());
      notistack.error(errorMessage);
      dispatch(onErrorRupeConductorDiscapacitadoRenovaciones(errorMessage));
    }

  }

  return {

    // Properties
    success,
    error,
    isLoadingRupesConductorDiscapacitadoRenovaciones,
    isLoadingRupesConductorDiscapacitadoRenovacionesModal,
    rupesConductorDiscapacitadoRenovaciones,
    activeRupeConductorDiscapacitadoRenovacion,

    // Methods
    getIdRupeConductorDiscapacitadoRenovacion,
    getAllRupesConductorDiscapacitadoRenovaciones,
    addNewRupeConductorDiscapacitadoRenovacion,
    updateRupeConductorDiscapacitadoRenovacion,
    activeInactiveRupeConductorDiscapacitadoRenovacion,
    setActiveRupeConductorDiscapacitadoRenovaciones

  }

}

