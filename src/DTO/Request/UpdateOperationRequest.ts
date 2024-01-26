interface UpdateOperationRequest {
  id: number;
  operationName: string;
  operationNumber: number;
  status: 'ACTIVE' | 'INACTIVE';
}
export default UpdateOperationRequest;
