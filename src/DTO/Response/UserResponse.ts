import RoleResponse from './RoleResponse';

interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: String;
  roles: Array<RoleResponse>;
}
export default UserResponse;
