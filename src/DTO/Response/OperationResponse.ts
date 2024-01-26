interface OperationResponse {
  id: number;
  operationName: string;
  operationNumber: number;
  status: 'ACTIVE' | 'INACTIVE';
  isDeleted: boolean;
  createdDate: Date;
}
export default OperationResponse;
