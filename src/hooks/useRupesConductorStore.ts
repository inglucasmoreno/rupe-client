import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../store/store';
import {
  onAddNewRupeConductor,
  onErrorRupeConductor,
  onGetAllRupesConductor,
  onSetActiveRupeConductor,
  onStartLoadingModalRupesConductor,
  onStartLoadingRupesConductor,
  onToggleRupesConductor,
  onActiveInactiveRupeConductor,
  onUpdateRupeConductor,
  onOpenLoading,
  onCloseLoading,
} from "../store/slices";
import { backendApi } from "../api";
import { notistack } from "../helpers";

export const useRupesConductorStore = () => {

  const dispatch = useDispatch();

  const { 
      success, 
      error, 
      isLoadingRupesConductor, 
      isLoadingRupesConductorModal,
      rupesConductor,
      activeRupeConductor 
  } = useSelector((state: RootState) => state.rupesConductor);

  const setActiveRupeConductor = (rupeConductor) => {
    dispatch(onSetActiveRupeConductor(rupeConductor));
  }

  const getAllRupesConductor = async () => {

    dispatch(onStartLoadingRupesConductor());

    try {
      const { data } = await backendApi.get('rupe-conductores');
      dispatch(onGetAllRupesConductor(data.conductores));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorRupeConductor(errorMessage));
    }

  }

  const addNewRupeConductor = async (rupeConductorData: any) => {

    dispatch(onStartLoadingModalRupesConductor());

    try {
      const { data } = await backendApi.post('rupe-conductores', rupeConductorData);
      dispatch(onAddNewRupeConductor(data.conductor));
      notistack.success('Conductor creado correctamente');
      dispatch(onToggleRupesConductor());
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorRupeConductor(errorMessage));
    }

  }

  const updateRupeConductor = async (rupeConductorData: any) => {
    
    dispatch(onStartLoadingModalRupesConductor());
    
    try{
      const { data } = await backendApi.patch(`rupe-conductores/${activeRupeConductor.id}`, rupeConductorData);
      dispatch(onUpdateRupeConductor(data.conductor));
      notistack.success('Conductor actualizado correctamente');
      dispatch(onToggleRupesConductor());
    }catch(error){
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorRupeConductor(errorMessage));
    }

  }

  const activeInactiveRupeConductor = async (rupeConductorData: any) => {

    dispatch(onOpenLoading(rupeConductorData.activo ? 'Alta de conductor' : 'Baja de conductor'));
    
    try{
      const { data } = await backendApi.patch(`rupe-conductores/${rupeConductorData.id}`, rupeConductorData);
      dispatch(onActiveInactiveRupeConductor(data.conductor));
      dispatch(onCloseLoading());
      notistack.success('Conductor actualizado correctamente');
    }catch(error){
      const errorMessage = error.response.data.message;
      dispatch(onCloseLoading());
      notistack.error(errorMessage);
      dispatch(onErrorRupeConductor(errorMessage));
    }

  }

  return {

    // Properties
    success,
    error,
    isLoadingRupesConductor,
    isLoadingRupesConductorModal,
    rupesConductor,
    activeRupeConductor,

    // Methods
    getAllRupesConductor,
    addNewRupeConductor,
    updateRupeConductor,
    setActiveRupeConductor,
    activeInactiveRupeConductor,

  }

}

