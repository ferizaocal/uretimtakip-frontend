import CreateCustomerRequest from '../dto/Request/CreateCustomerRequest';
import UpdateCustomerRequest from '../dto/Request/UpdateCustomerRequest';
import CustomerResponse from '../dto/Response/CustomerResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import api from './Api';

export const getAllCustomers = async () => {
  return await api().get<ServiceResponse<CustomerResponse>>('/customers');
};
export const addCustomer = async (entity: CreateCustomerRequest) => {
  return await api().post<ServiceResponse<CustomerResponse>>(
    '/customer',
    entity,
  );
};

export const updateCustomer = async (entity: UpdateCustomerRequest) => {
  return await api().put<ServiceResponse<CustomerResponse>>(
    '/customer',
    entity,
  );
};
