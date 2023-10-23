import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../store/store';
import {
  onAddNewPersona,
  onErrorPersona,
  onGetAllPersonas,
  onSetActivePersona,
  onStartLoadingModalPersonas,
  onStartLoadingPersonas,
  onTogglePersonas,
  onActiveInactivePersona,
  onUpdatePersona,
  onOpenLoading,
  onCloseLoading,
} from "../store/slices";
import { backendApi } from "../api";
import { notistack } from "../helpers";

export const usePersonasStore = () => {

  const dispatch = useDispatch();

  const { 
      success, 
      error, 
      isLoadingPersonas, 
      isLoadingPersonasModal,
      personas,
      activePersona 
  } = useSelector((state: RootState) => state.personas);

  const setActivePersona = (persona) => {
    dispatch(onSetActivePersona(persona));
  }

  const getAllPersonas = async () => {

    dispatch(onStartLoadingPersonas());

    try {
      const { data } = await backendApi.get('personas');
      dispatch(onGetAllPersonas(data.personas));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorPersona(errorMessage));
    }

  }

  const addNewPersona = async (personaData: any) => {

    dispatch(onStartLoadingModalPersonas());

    try {
      const { data } = await backendApi.post('personas', personaData);
      dispatch(onAddNewPersona(data.persona));
      notistack.success('Persona creada correctamente');
      dispatch(onTogglePersonas());
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorPersona(errorMessage));
    }

  }

  const updatePersona = async (personaData: any) => {
    
    dispatch(onStartLoadingModalPersonas());
    
    try{
      const { data } = await backendApi.patch(`personas/${activePersona.id}`, personaData);
      dispatch(onUpdatePersona(data.persona));
      notistack.success('Persona actualizado correctamente');
      dispatch(onTogglePersonas());
    }catch(error){
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorPersona(errorMessage));
    }

  }

  const activeInactivePersona = async (personaData: any) => {

    dispatch(onOpenLoading(personaData.activo ? 'Alta de persona' : 'Baja de persona'));
    
    try{
      const { data } = await backendApi.patch(`personas/${personaData.id}`, personaData);
      dispatch(onActiveInactivePersona(data.persona));
      dispatch(onCloseLoading());
      notistack.success('Persona actualizada correctamente');
    }catch(error){
      const errorMessage = error.response.data.message;
      dispatch(onCloseLoading());
      notistack.error(errorMessage);
      dispatch(onErrorPersona(errorMessage));
    }

  }

  return {

    // Properties
    success,
    error,
    isLoadingPersonas,
    isLoadingPersonasModal,
    personas,
    activePersona,

    // Methods
    getAllPersonas,
    addNewPersona,
    updatePersona,
    setActivePersona,
    activeInactivePersona,

  }

}

