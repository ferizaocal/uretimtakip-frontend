import CreateRoleRequest from '../dto/Request/CreateRoleRequest';
import UpdateRoleRequest from '../dto/Request/UpdateRoleRequest';
import RoleResponse from '../dto/Response/RoleResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import api from './Api';

export const createRole = async (entity: CreateRoleRequest) => {
  return await api().post<ServiceResponse<RoleResponse>>('/role', entity);
};
export const getRoles = async () => {
  return await api().get<ServiceResponse<RoleResponse>>('/roles');
};
export const updateRole = async (entity: UpdateRoleRequest) => {
  return await api().put<ServiceResponse<RoleResponse>>('/role', entity);
};
