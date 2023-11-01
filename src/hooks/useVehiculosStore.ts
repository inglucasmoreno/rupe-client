import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../store/store';
import {
  onAddNewVehiculo,
  onErrorVehiculo,
  onGetAllVehiculos,
  onSetActiveVehiculo,
  onStartLoadingModalVehiculos,
  onStartLoadingVehiculos,
  onToggleVehiculos,
  onActiveInactiveVehiculo,
  onUpdateVehiculo,
  onOpenLoading,
  onCloseLoading,
} from "../store/slices";
import { backendApi } from "../api";
import { notistack } from "../helpers";

export const useVehiculosStore = () => {

  const dispatch = useDispatch();

  const { 
      success, 
      error, 
      isLoadingVehiculos, 
      isLoadingVehiculosModal,
      vehiculos,
      activeVehiculo 
  } = useSelector((state: RootState) => state.vehiculos);

  const setActiveVehiculo = (vehiculo) => {
    dispatch(onSetActiveVehiculo(vehiculo));
  }

  const getVehiculoDominio = async (dominio: string) => {
    
    dispatch(onStartLoadingModalVehiculos());

    try{
      const { data } = await backendApi.get(`vehiculos/parametro/dominio/${dominio}`);
      dispatch(onSetActiveVehiculo(data.vehiculo));
    }catch(error){
       // Vehiculo activa -> Vacio
       dispatch(onSetActiveVehiculo({      
        id: 0,
        dominio: '',
        marca: '',
        modelo: '',
        activo: true
      }));
      // Se abre el modal -> Nuevo vehiculo
      dispatch(onToggleVehiculos());
    }

  }

  const getAllVehiculos = async () => {

    dispatch(onStartLoadingVehiculos());

    try {
      const { data } = await backendApi.get('vehiculos');
      dispatch(onGetAllVehiculos(data.vehiculos));
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorVehiculo(errorMessage));
    }

  }

  const addNewVehiculo = async (vehiculoData: any) => {

    dispatch(onStartLoadingModalVehiculos());

    try {
      const { data } = await backendApi.post('vehiculos', vehiculoData);
      dispatch(onAddNewVehiculo(data.vehiculo));
      notistack.success('Vehiculo creado correctamente');
      dispatch(onToggleVehiculos());
    } catch (error) {
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorVehiculo(errorMessage));
    }

  }

  const updateVehiculo = async (vehiculoData: any) => {
    
    dispatch(onStartLoadingModalVehiculos());
    
    try{
      const { data } = await backendApi.patch(`vehiculos/${activeVehiculo.id}`, vehiculoData);
      dispatch(onUpdateVehiculo(data.vehiculo));
      notistack.success('Vehiculo actualizado correctamente');
      dispatch(onToggleVehiculos());
    }catch(error){
      const errorMessage = error.response.data.message;
      notistack.error(errorMessage);
      dispatch(onErrorVehiculo(errorMessage));
    }

  }

  const activeInactiveVehiculo = async (vehiculoData: any) => {

    dispatch(onOpenLoading(vehiculoData.activo ? 'Alta de vehiculo' : 'Baja de vehiculo'));
    
    try{
      const { data } = await backendApi.patch(`vehiculos/${vehiculoData.id}`, vehiculoData);
      dispatch(onActiveInactiveVehiculo(data.vehiculo));
      dispatch(onCloseLoading());
      notistack.success('Vehiculo actualizado correctamente');
    }catch(error){
      const errorMessage = error.response.data.message;
      dispatch(onCloseLoading());
      notistack.error(errorMessage);
      dispatch(onErrorVehiculo(errorMessage));
    }

  }

  return {

    // Properties
    success,
    error,
    isLoadingVehiculos,
    isLoadingVehiculosModal,
    vehiculos,
    activeVehiculo,

    // Methods
    getAllVehiculos,
    getVehiculoDominio,
    addNewVehiculo,
    updateVehiculo,
    setActiveVehiculo,
    activeInactiveVehiculo,

  }

}

