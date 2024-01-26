import CreateProductionFabricRequest from './CreateProductionFabricRequest';

export default interface CreateProductionTrackingRequest {
  productionCodeId: number;
  ageGroupId: number;
  userId: number;
  partyNumber: string;
  description: string;
  fabrics: CreateProductionFabricRequest[];
}
