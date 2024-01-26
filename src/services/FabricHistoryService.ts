import CreateFabricHistoryRequest from '../dto/Request/CreateFabricHistoryRequest';
import FabricHistoryResponse from '../dto/Response/FabricHistoryResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import api from './Api';

export const addFabricEntry = async (entity: CreateFabricHistoryRequest) => {
  return await api().post<ServiceResponse<FabricHistoryResponse>>(
    '/fabric-history',
    entity,
  );
};
export const getFabricHistory = async (fabricId: number) => {
  return await api().get<ServiceResponse<FabricHistoryResponse>>(
    `/fabric-histories/${fabricId}`,
  );
};
export const deleteFabricHistory = async (id: number) => {
  return await api().delete<ServiceResponse<FabricHistoryResponse>>(
    `/fabric-history/${id}`,
  );
};
