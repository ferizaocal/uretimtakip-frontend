import AgeGroupResponse from '../Response/AgeGroupResponse';

export default interface CreateOrderItemRequest {
  ageGroupId: number;
  quantity: number;
  description: string;
  age?: AgeGroupResponse;
}
