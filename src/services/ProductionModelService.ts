import CreateProductionModelRequest from '../dto/Request/CreateProductionModelRequest';
import ProductionModelResponse from '../dto/Response/ProductionModelResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import api from './Api';

export const createProductionModel = async (
  entity: CreateProductionModelRequest,
) => {
  return await api().post<ServiceResponse<ProductionModelResponse>>(
    '/production-model',
    entity,
  );
};
export const getAllProductionModels = async () => {
  return await api().get<ServiceResponse<ProductionModelResponse>>(
    '/production-models',
  );
};
export const deleteProductionModel = async (id: number) => {
  return await api().delete<ServiceResponse<ProductionModelResponse>>(
    '/production-model/' + id,
  );
};
export const updateProductModelStatusById = async (id: number) => {
  return await api().put<ServiceResponse<ProductionModelResponse>>(
    '/production-model/' + id,
  );
};
export const getAllProductionModelsByActive = async () => {
  return await api().get<ServiceResponse<ProductionModelResponse>>(
    '/production-models/active',
  );
};
