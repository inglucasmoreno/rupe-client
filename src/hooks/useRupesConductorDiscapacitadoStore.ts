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
import { useNavigate } from "react-router-dom";

export const useRupesConductorDiscapacitadoStore = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const imprimirOblea = async (id) => {

    try{
      const { data } = await backendApi.get(`rupe-conductor-discapacitado/imprimir-oblea/${id}`, {
        responseType: 'blob'
      });
      const file = new Blob([data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    }catch(error){
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
    }

  }

  const getIdRupeConductorDiscapacitado = async (id) => {
    
    dispatch(onStartLoadingRupesConductorDiscapacitado());

    try {
      const { data } = await backendApi.get(`rupe-conductor-discapacitado/${id}`);
      dispatch(onSetActiveRupeConductorDiscapacitado(data.rupe));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorRupeConductorDiscapacitado(errorMessage));
    }

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
      navigate(`/rupes-conductor-discapacitado/detalles/${data.rupe.id}`);
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
    getIdRupeConductorDiscapacitado,
    addNewRupeConductorDiscapacitado,
    updateRupeConductorDiscapacitado,
    setActiveRupeConductorDiscapacitado,
    activeInactiveRupeConductorDiscapacitado,
    imprimirOblea,

  }

}

