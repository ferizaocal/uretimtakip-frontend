import CreateFabricRequest from '../dto/Request/CreateFabricRequest';
import FabricFromModelResponse from '../dto/Response/FabricFromModelResponse';
import FabricResponse from '../dto/Response/FabricResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import api from './Api';

export const addFabric = async (fabric: CreateFabricRequest) => {
  return await api().post<ServiceResponse<FabricResponse>>('/fabric', fabric);
};
export const deleteFabric = async (fabricId: number) => {
  return await api().delete<ServiceResponse<FabricResponse>>(
    `/fabric/${fabricId}`,
  );
};
export const getFabrics = async () => {
  return await api().get<ServiceResponse<FabricResponse>>('/fabrics');
};
export const getAllFromFabricModel = async () => {
  return await api().get<ServiceResponse<FabricFromModelResponse>>(
    '/fabrics/from-model',
  );
};
