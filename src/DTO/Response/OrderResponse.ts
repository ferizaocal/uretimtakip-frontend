import OrderItemResponse from './OrderItemResponse';

export interface OrderResponse {
  id: number;
  customerFirstName: string;
  customerLastName: string;
  productionCode: string;
  status: string;
  orderItems: Array<OrderItemResponse>;
}
