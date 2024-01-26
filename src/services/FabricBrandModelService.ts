import CreateFabricModelRequest from '../dto/Request/CreateFabricModelRequest';
import UpdateFabricModelRequest from '../dto/Request/UpdateFabricModelRequest';
import FabricModelResponse from '../dto/Response/FabricModelResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import api from './Api';

export const addFabricModel = async (entity: CreateFabricModelRequest) => {
  return await api().post<ServiceResponse<FabricModelResponse>>(
    '/fabric-model',
    entity,
  );
};
export const updateFabricModel = async (entity: UpdateFabricModelRequest) => {
  return await api().put<ServiceResponse<FabricModelResponse>>(
    '/fabric-model',
    entity,
  );
};
export const deleteFabricModel = async (id: number) => {
  return await api().delete<ServiceResponse<FabricModelResponse>>(
    '/fabric-model/' + id,
  );
};
export const getFabricModelsByBrandId = async (brandId: number) => {
  return await api().get<ServiceResponse<FabricModelResponse>>(
    '/fabric-models/' + brandId,
  );
};
