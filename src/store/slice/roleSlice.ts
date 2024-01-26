import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import RoleResponse from '../../dto/Response/RoleResponse';
import CreateRoleRequest from '../../dto/Request/CreateRoleRequest';
import {getRoles} from '../../services/RoleService';
import UpdateRoleRequest from '../../dto/Request/UpdateRoleRequest';

export interface RoleState {
  roles: RoleResponse[];
  createRoleDto: CreateRoleRequest;
  updateRoleDto: UpdateRoleRequest;
  selectedRole: RoleResponse;
  pageLoading: boolean;
  buttonLoading: boolean;
}
const INITIAL_STATE: RoleState = {
  roles: [],
  createRoleDto: {
    name: '',
    operationId: 0,
  } as CreateRoleRequest,
  updateRoleDto: {
    id: 0,
    name: '',
    operationId: 0,
  } as UpdateRoleRequest,
  selectedRole: {} as RoleResponse,
  pageLoading: false,
  buttonLoading: false,
};

export const fetchRoles = createAsyncThunk('role/fetchRoles', async () => {
  const response = await getRoles();
  return response.data.list;
});

const roleSlice = createSlice({
  name: 'role',
  initialState: INITIAL_STATE,
  reducers: {
    setCreateRoleDto: (state, action) => {
      state.createRoleDto = action.payload;
    },
    setUpdateRoleDto: (state, action) => {
      state.updateRoleDto = action.payload;
    },
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
    addRole: (state, action) => {
      state.roles.push(action.payload);
      state.createRoleDto = {} as CreateRoleRequest;
    },
    updateRole: (state, action) => {
      state.roles = state.roles.map(role =>
        role.id === action.payload.id ? action.payload : role,
      );
      state.updateRoleDto = {} as UpdateRoleRequest;
    },
    setButtonLoading: (state, action) => {
      state.buttonLoading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchRoles.pending, state => {
      state.pageLoading = true;
    });
    builder.addCase(fetchRoles.fulfilled, (state, action) => {
      state.pageLoading = false;
      state.roles = action.payload;
    });
    builder.addCase(fetchRoles.rejected, state => {
      state.pageLoading = false;
    });
  },
});
const RoleReducer = roleSlice.reducer;
export const RoleActions = roleSlice.actions;
export default RoleReducer;
