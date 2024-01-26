import {Dayjs} from 'dayjs';
import AgeGroupResponse from './AgeGroupResponse';
import OperationResponse from './OperationResponse';
import ProductionCodeResponse from './ProductionCodeResponse';
import ProductionModelResponse from './ProductionModelResponse';
import ProductionTrackingFabricResponse from './ProductionTrackingFabricResponse';
import {UserOperationResponse} from './UserOperationResponse';
import ProductionTrackingHistoryResponse from './ProductionTrackingHistoryResponse';

export interface ProductionTrackingResponse {
  id?: number;
  operationId?: number;
  partyNumber?: number;
  description?: string;
  createdDate: Dayjs;
  totalMetre: any;
  totalQuantity: any;

  ageGroup?: AgeGroupResponse;
  productionModel?: ProductionModelResponse;
  productionCode?: ProductionCodeResponse;
  operation?: OperationResponse;

  userOperation: UserOperationResponse;
  userOperations?: Array<UserOperationResponse>;
  productionTrackingFabrics?: Array<ProductionTrackingFabricResponse>;
  productionTrackingHistories?: Array<ProductionTrackingHistoryResponse>;
}
