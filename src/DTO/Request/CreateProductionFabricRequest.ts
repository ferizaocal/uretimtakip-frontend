import FabricResponse from '../Response/FabricResponse';

export default interface CreateProductionFabricRequest {
  fabricId: number;
  quantity: number;
  metre: number;
  fabric: FabricResponse;
}
