import CreateProductionTrackingRequest from '../dto/Request/CreateProductionTrackingRequest';
import {ProductionTrackingResponse} from '../dto/Response/ProductionTrackingResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import api from './Api';

export const addProductionTracking = async (
  entity: CreateProductionTrackingRequest,
  image?: any,
) => {
  // const jsonFormBlob = new Blob([
  //   JSON.stringify(entity),
  //   {
  //     type: 'application/json',
  //   },
  // ] as any);
  // var formData = new FormData();
  // formData.append('production', jsonFormBlob);
  // if (image) {
  //   formData.append('image', image);
  // }
  return await api().post<ServiceResponse<Boolean>>(
    '/productionTracking',
    entity,
  );
};
export const getAllProductionTrackings = (operationId: number) => {
  return api().get<ServiceResponse<ProductionTrackingResponse>>(
    '/productionTrackings/' + operationId,
  );
};
export const getProductionTrackings = () => {
  return api().get<ServiceResponse<ProductionTrackingResponse>>(
    '/productionTrackings',
  );
};
