import RoleResponse from './RoleResponse';

interface LoginResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  status: string;
  roles: Array<RoleResponse>;
}
export default LoginResponse;
