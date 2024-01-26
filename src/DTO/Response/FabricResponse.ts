import FabricHistoryResponse from './FabricHistoryResponse';

export default interface FabricResponse {
  id: number;
  brandName: string;
  fabricModel: string;
  totalQuantity: any;
  fabricHistory: Array<FabricHistoryResponse>;
}
