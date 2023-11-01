import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../store/store';
import {
  onAddNewRupeDiscapacidadRenovacion,
  onErrorRupeDiscapacidadRenovaciones,
  onGetAllRupesDiscapacidadRenovaciones,
  onSetActiveRupeDiscapacidadRenovacion,
  onStartLoadingModalRupesDiscapacidadRenovaciones,
  onStartLoadingRupesDiscapacidadRenovaciones,
  onToggleRupesDiscapacidadRenovaciones,
  onActiveInactiveRupeDiscapacidadRenovacion,
  onUpdateRupeDiscapacidadRenovacion,
  onSetActiveRupeDiscapacidad,
  onOpenLoading,
  onCloseLoading,
} from "../store/slices";
import { backendApi } from "../api";
import { notistack } from "../helpers";

export const useRupesDiscapacidadRenovacionesStore = () => {

  const dispatch = useDispatch();

  const { 
      success, 
      error, 
      isLoadingRupesDiscapacidadRenovaciones, 
      isLoadingRupesDiscapacidadRenovacionesModal,
      rupesDiscapacidadRenovaciones,
      activeRupeDiscapacidadRenovacion
  } = useSelector((state: RootState) => state.rupesDiscapacidadRenovaciones);

  const setActiveRupeDiscapacidadRenovaciones = (rupeDiscapacidadRenovacion) => {
    dispatch(onSetActiveRupeDiscapacidadRenovacion(rupeDiscapacidadRenovacion));
  }

  const getIdRupeDiscapacidadRenovacion = async (id) => {
    
    dispatch(onStartLoadingRupesDiscapacidadRenovaciones());

    try {
      const { data } = await backendApi.get(`rupe-discapacidad-renovaciones/${id}`);
      dispatch(onSetActiveRupeDiscapacidadRenovacion(data.renovacion));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorRupeDiscapacidadRenovaciones(errorMessage));
    }

  }

  const getAllRupesDiscapacidadRenovaciones = async (idRupe: number) => {

    dispatch(onStartLoadingRupesDiscapacidadRenovaciones());

    try {
      const { data } = await backendApi.get(`rupe-discapacidad-renovaciones?rupe=${idRupe}`);
      dispatch(onGetAllRupesDiscapacidadRenovaciones(data.renovaciones));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorRupeDiscapacidadRenovaciones(errorMessage));
    }

  }

  const addNewRupeDiscapacidadRenovacion = async (rupeDiscapacidadRenovacionData: any) => {

    dispatch(onStartLoadingModalRupesDiscapacidadRenovaciones());

    try {
      const { data } = await backendApi.post('rupe-discapacidad-renovaciones', rupeDiscapacidadRenovacionData);
      dispatch(onAddNewRupeDiscapacidadRenovacion(data.renovacion));
      dispatch(onSetActiveRupeDiscapacidad(data.rupe));
      dispatch(onToggleRupesDiscapacidadRenovaciones());
      notistack.success('Renovacion creada correctamente');
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorRupeDiscapacidadRenovaciones(errorMessage));
    }

  }

  const updateRupeDiscapacidadRenovacion = async (rupeDiscapacidadRenovacionData: any) => {
    
    dispatch(onStartLoadingModalRupesDiscapacidadRenovaciones());
    
    try{
      const { data } = await backendApi.patch(`rupe-discapacidad-renovaciones/${activeRupeDiscapacidadRenovacion.id}`, rupeDiscapacidadRenovacionData);
      dispatch(onUpdateRupeDiscapacidadRenovacion(data.renovacion));
      notistack.success('Renovacion actualizada correctamente');
      dispatch(onToggleRupesDiscapacidadRenovaciones());
    }catch(error){
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorRupeDiscapacidadRenovaciones(errorMessage));
    }

  }

  const activeInactiveRupeDiscapacidadRenovacion = async (rupeDiscapacidadRenovacionData: any) => {

    dispatch(onOpenLoading(rupeDiscapacidadRenovacionData.activo ? 'Alta de renovacion' : 'Baja de renovacion'));
    
    try{
      const { data } = await backendApi.patch(`rupe-discapacidad-renovaciones/${rupeDiscapacidadRenovacionData.id}`, rupeDiscapacidadRenovacionData);
      dispatch(onActiveInactiveRupeDiscapacidadRenovacion(data.renovacion));
      dispatch(onCloseLoading());
      notistack.success('Renovacion actualizada correctamente');
    }catch(error){
      const errorMessage = error.response.data.message;
      dispatch(onCloseLoading());
      notistack.error(errorMessage);
      dispatch(onErrorRupeDiscapacidadRenovaciones(errorMessage));
    }

  }

  return {

    // Properties
    success,
    error,
    isLoadingRupesDiscapacidadRenovaciones,
    isLoadingRupesDiscapacidadRenovacionesModal,
    rupesDiscapacidadRenovaciones,
    activeRupeDiscapacidadRenovacion,

    // Methods
    getIdRupeDiscapacidadRenovacion,
    getAllRupesDiscapacidadRenovaciones,
    addNewRupeDiscapacidadRenovacion,
    updateRupeDiscapacidadRenovacion,
    activeInactiveRupeDiscapacidadRenovacion,
    setActiveRupeDiscapacidadRenovaciones

  }

}

