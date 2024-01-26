import CreateFabricBrandRequest from '../dto/Request/CreateFabricBrandRequest';
import UpdateFabricBrandRequest from '../dto/Request/UpdateFabricBrandRequest';
import FabricBrandResponse from '../dto/Response/FabricBrandResponse';
import FabricBrandWithModelResponse from '../dto/Response/FabricBrandWithModelResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import api from './Api';

export const addFabricBrand = async (entity: CreateFabricBrandRequest) => {
  return await api().post<ServiceResponse<FabricBrandResponse>>(
    '/fabric-brand',
    entity,
  );
};
export const updateFabricBrand = async (entity: UpdateFabricBrandRequest) => {
  return await api().put<ServiceResponse<FabricBrandResponse>>(
    `/fabric-brand`,
    entity,
  );
};
export const deleteFabricBrand = async (id: number) => {
  return await api().delete<ServiceResponse<FabricBrandResponse>>(
    `/fabric-brand/${id}`,
  );
};
export const getAllFabricBrands = async () => {
  return await api().get<ServiceResponse<FabricBrandWithModelResponse>>(
    '/fabric-brands',
  );
};
