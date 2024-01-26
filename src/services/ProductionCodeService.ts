import ProductionCodeHistory from '../dto/Response/ProductionCodeHistory';
import ProductionCodeResponse from '../dto/Response/ProductionCodeResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import api from './Api';

export const getAllProductionCodes = async () => {
  return await api().get<ServiceResponse<ProductionCodeResponse>>(
    '/production-codes',
  );
};
export const addProductionCode = async (name: string) => {
  return await api().post<ServiceResponse<ProductionCodeResponse>>(
    `/production-code`,
    {
      name,
    },
  );
};
export const deleteProductionCode = async (id: number) => {
  return await api().delete<ServiceResponse<ProductionCodeResponse>>(
    `/production-code/${id}`,
  );
};
export const updateProductionCode = async (id: number, name: string) => {
  return await api().put<ServiceResponse<ProductionCodeResponse>>(
    `/production-code/${id}`,
    {name},
  );
};
export const getProductionCodeHistoryById = async (id: number) => {
  return await api().get<ServiceResponse<ProductionCodeHistory>>(
    `/production-code/history/${id}`,
  );
};
