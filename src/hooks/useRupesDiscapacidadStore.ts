import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../store/store';
import {
  onAddNewRupeDiscapacidad,
  onErrorRupeDiscapacidad,
  onGetAllRupesDiscapacidad,
  onSetActiveRupeDiscapacidad,
  onStartLoadingModalRupesDiscapacidad,
  onStartLoadingRupesDiscapacidad,
  onToggleRupesDiscapacidad,
  onActiveInactiveRupeDiscapacidad,
  onUpdateRupeDiscapacidad,
  onOpenLoading,
  onCloseLoading,
} from "../store/slices";
import { backendApi } from "../api";
import { notistack } from "../helpers";
import { useNavigate } from "react-router-dom";

export const useRupesDiscapacidadStore = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { 
      success, 
      error, 
      isLoadingRupesDiscapacidad, 
      isLoadingRupesDiscapacidadModal,
      rupesDiscapacidad,
      activeRupeDiscapacidad 
  } = useSelector((state: RootState) => state.rupesDiscapacidad);

  const setActiveRupeDiscapacidad = (rupeDiscapacidad) => {
    dispatch(onSetActiveRupeDiscapacidad(rupeDiscapacidad));
  }

  const imprimirOblea = async (id) => {

    try{
      const { data } = await backendApi.get(`rupe-discapacidad/imprimir-oblea/${id}`, {
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

  const getIdRupeDiscapacidad = async (id) => {
    
    dispatch(onStartLoadingRupesDiscapacidad());

    try {
      const { data } = await backendApi.get(`rupe-discapacidad/${id}`);
      dispatch(onSetActiveRupeDiscapacidad(data.rupe));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorRupeDiscapacidad(errorMessage));
    }

  }

  const getAllRupesDiscapacidad = async () => {

    dispatch(onStartLoadingRupesDiscapacidad());

    try {
      const { data } = await backendApi.get('rupe-discapacidad');
      dispatch(onGetAllRupesDiscapacidad(data.rupes));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorRupeDiscapacidad(errorMessage));
    }

  }

  const addNewRupeDiscapacidad = async (rupeDiscapacidadData: any) => {

    dispatch(onStartLoadingModalRupesDiscapacidad());

    try {
      const { data } = await backendApi.post('rupe-discapacidad', rupeDiscapacidadData);
      dispatch(onAddNewRupeDiscapacidad(data.rupe));
      dispatch(onToggleRupesDiscapacidad());
      notistack.success('RUPE creado correctamente');
      navigate(`/rupes-discapacidad/detalles/${data.rupe.id}`);
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorRupeDiscapacidad(errorMessage));
    }

  }

  const updateRupeDiscapacidad = async (rupeDiscapacidadData: any) => {
    
    dispatch(onStartLoadingModalRupesDiscapacidad());
    
    try{
      const { data } = await backendApi.patch(`rupe-discapacidad/${activeRupeDiscapacidad.id}`, rupeDiscapacidadData);
      dispatch(onUpdateRupeDiscapacidad(data.rupe));
      notistack.success('RUPE actualizado correctamente');
      dispatch(onToggleRupesDiscapacidad());
    }catch(error){
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorRupeDiscapacidad(errorMessage));
    }

  }

  const activeInactiveRupeDiscapacidad = async (rupeDiscapacidadData: any) => {

    dispatch(onOpenLoading(rupeDiscapacidadData.activo ? 'Alta de RUPE' : 'Baja de RUPE'));
    
    try{
      const { data } = await backendApi.patch(`rupe-discapacidad/${rupeDiscapacidadData.id}`, rupeDiscapacidadData);
      dispatch(onActiveInactiveRupeDiscapacidad(data.rupe));
      dispatch(onCloseLoading());
      notistack.success('RUPE actualizado correctamente');
    }catch(error){
      const errorMessage = error.response.data.message;
      dispatch(onCloseLoading());
      notistack.error(errorMessage);
      dispatch(onErrorRupeDiscapacidad(errorMessage));
    }

  }

  return {

    // Properties
    success,
    error,
    isLoadingRupesDiscapacidad,
    isLoadingRupesDiscapacidadModal,
    rupesDiscapacidad,
    activeRupeDiscapacidad,

    // Methods
    getIdRupeDiscapacidad,
    getAllRupesDiscapacidad,
    imprimirOblea,
    addNewRupeDiscapacidad,
    updateRupeDiscapacidad,
    setActiveRupeDiscapacidad,
    activeInactiveRupeDiscapacidad,

  }

}

