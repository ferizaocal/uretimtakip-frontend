import CreateOperationRequest from '../dto/Request/CreateOperationRequest';
import UpdateOperationRequest from '../dto/Request/UpdateOperationRequest';
import OperationResponse from '../dto/Response/OperationResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import api from './Api';

export const createOperation = async (entity: CreateOperationRequest) => {
  return await api().post<ServiceResponse<OperationResponse>>(
    '/operations',
    entity,
  );
};
export const updateOperation = async (entity: UpdateOperationRequest) => {
  return await api().put<ServiceResponse<OperationResponse>>(
    `/operations`,
    entity,
  );
};
export const getOperations = async () => {
  return await api().get<ServiceResponse<OperationResponse>>('/operations');
};
export const getOperationsByActive = async () => {
  return await api().get<ServiceResponse<OperationResponse>>(
    `/operations/active/`,
  );
};
export const getNextOperation = async (
  productionTrackingId: number,
  currentOperationId: number,
) => {
  return await api().get<ServiceResponse<OperationResponse>>(
    `/operation/next/${productionTrackingId}/${currentOperationId}`,
  );
};
