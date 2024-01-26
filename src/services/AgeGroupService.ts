import AgeGroupResponse from '../dto/Response/AgeGroupResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import api from './Api';

export const getAllAgeGroups = async () => {
  return await api().get<ServiceResponse<AgeGroupResponse>>('/age-groups');
};
export const addAgeGroup = async (name: string) => {
  return await api().post<ServiceResponse<AgeGroupResponse>>(`/age-group`, {
    age: name,
  });
};
export const deleteAgeGroup = async (id: number) => {
  return await api().delete<ServiceResponse<AgeGroupResponse>>(
    `/age-group/${id}`,
  );
};
export const updateAgeGroup = async (id: number, name: string) => {
  return await api().put<ServiceResponse<AgeGroupResponse>>(
    `/age-group/${id}`,
    {age: name},
  );
};
