import CreateUserRequest from '../dto/Request/CreateUserRequest';
import LoginResponse from '../dto/Response/LoginResponse';
import ProductionModelResponse from '../dto/Response/ProductionModelResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import UserModelResponse from '../dto/Response/UserModelResponse';
import UserResponse from '../dto/Response/UserResponse';
import api from './Api';

export const postLogin = async (email: string, password: string) => {
  return await api().post<ServiceResponse<LoginResponse>>('/auth/login', {
    email,
    password,
  });
};

export const updateActiveProductionModelToUser = async (id: number) => {
  return await api().put<ServiceResponse<ProductionModelResponse>>(
    '/user/active-productionmodel/' + id,
  );
};

export const createUser = async (entity: CreateUserRequest) => {
  return await api().post<ServiceResponse<UserResponse>>('/user', entity);
};

export const getUserByRole = async (id: number) => {
  return await api().get<ServiceResponse<UserResponse>>('/user/role/' + id);
};
export const getUserByOperationNumber = async (operationNumber: number) => {
  return await api().get<ServiceResponse<UserModelResponse>>(
    '/user/operation-number/' + operationNumber,
  );
};
export const getFindAllByUserOperationNumberAndProductionModelId = async (
  operationNumber: number,
  productionModelId: number,
) => {
  return await api().get<ServiceResponse<UserModelResponse>>(
    '/user/operation-number/' +
      operationNumber +
      '/production-model/' +
      productionModelId,
  );
};
export const deleteUserById = async (id: number) => {
  return await api().delete<ServiceResponse<UserResponse>>('/user/' + id);
};
export const updateUserById = async (data: {
  id: number;
  firstName: string;
  lastName: string;
}) => {
  return await api().put<ServiceResponse<UserResponse>>('/user', data);
};
export const getUser = async () => {
  return await api().get<ServiceResponse<UserResponse>>('/user/me');
};
