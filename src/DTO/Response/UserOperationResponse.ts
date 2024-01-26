import {Dayjs} from 'dayjs';
import OperationResponse from './OperationResponse';

export interface UserOperationResponse {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  operation: OperationResponse;
  isCompleted: boolean;
  createdDate: Dayjs;
}
