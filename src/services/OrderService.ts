import CreateOrderRequest from '../dto/Request/CreateOrderRequest';
import {OrderResponse} from '../dto/Response/OrderResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import api from './Api';

export const addOrder = async (order: CreateOrderRequest) => {
  return await api().post<ServiceResponse<OrderResponse>>('/order', order);
};
export const getOrders = async () => {
  return await api().get<ServiceResponse<OrderResponse>>('/orders');
};
export const deleteOrderById = async (id: number) => {
  return await api().delete<ServiceResponse<OrderResponse>>(`/order/${id}`);
};
