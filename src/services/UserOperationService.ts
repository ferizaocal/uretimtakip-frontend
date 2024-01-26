import CreateOperationCompleteRequest from '../dto/Request/CreateOperationCompleteRequest';
import OperationResponse from '../dto/Response/OperationResponse';
import {ProductionTrackingResponse} from '../dto/Response/ProductionTrackingResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import api from './Api';

export const getUserOperationByCompleted = async () => {
  return await api().get<ServiceResponse<ProductionTrackingResponse>>(
    '/user-operation/completed',
  );
};
export const getUserOperationByActive = async () => {
  return await api().get<ServiceResponse<ProductionTrackingResponse>>(
    '/user-operation/active',
  );
};

export const completedUserOperation = async (
  entity: CreateOperationCompleteRequest,
) => {
  return await api().post<ServiceResponse<OperationResponse>>(
    '/user-operation/complete',
    entity,
  );
};
