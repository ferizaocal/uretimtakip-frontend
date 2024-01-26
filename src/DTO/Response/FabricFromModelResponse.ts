import FabricResponse from './FabricResponse';

export default interface FabricFromModelResponse {
  id: number;
  brandName: string;
  modelName: string;
  fabrics: Array<FabricResponse>;
}
