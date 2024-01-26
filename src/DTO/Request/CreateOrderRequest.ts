import CreateOrderItemRequest from '../Request/CreateOrderItemRequest';

export default interface CreateOrderRequest {
  customerId: number;
  productionCodeId: number;
  orderItems: Array<CreateOrderItemRequest>;
}
