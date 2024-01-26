import FabricModelResponse from './FabricModelResponse';

export default interface FabricBrandWithModelResponse {
  id: number;
  name: string;
  fabricModels: Array<FabricModelResponse>;
}
