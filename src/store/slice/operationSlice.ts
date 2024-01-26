import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import CreateOperationRequest from '../../dto/Request/CreateOperationRequest';
import {
  getOperations,
  getOperationsByActive,
} from '../../services/OperationService';
import OperationResponse from '../../dto/Response/OperationResponse';
import UpdateOperationRequest from '../../dto/Request/UpdateOperationRequest';

export interface OperationState {
  operations: OperationResponse[];
  createOperationDto: CreateOperationRequest;
  updateOperationDto: UpdateOperationRequest;
  selectedOperation: OperationResponse;
  buttonLoading: boolean;
  pageLoading: boolean;
}
const INITIAL_STATE: OperationState = {
  operations: [],
  createOperationDto: {} as CreateOperationRequest,
  updateOperationDto: {} as UpdateOperationRequest,
  selectedOperation: {} as OperationResponse,
  buttonLoading: false,
  pageLoading: true,
};
export const fetchOperationsByActive = createAsyncThunk(
  'operation/fetchOperationsByActive',
  async () => {
    var response = await getOperationsByActive();
    return response.data.list;
  },
);
export const fetchOperations = createAsyncThunk(
  'operation/fetchOperations',
  async () => {
    var response = await getOperations();
    return response.data.list;
  },
);

const operationSlice = createSlice({
  name: 'operation',
  initialState: INITIAL_STATE,
  reducers: {
    setCreateOperationDto: (state, action) => {
      state.createOperationDto = action.payload;
    },
    addOperation: (state, action) => {
      state.operations.push(action.payload);
      state.createOperationDto = {} as CreateOperationRequest;
    },
    updateOperation: (state, action) => {
      state.operations = state.operations.map(operation =>
        operation.id === action.payload.id ? action.payload : operation,
      );
    },
    setButtonLoading: (state, action) => {
      state.buttonLoading = action.payload;
    },
    setUpdateOperationDto: (state, action) => {
      state.updateOperationDto = action.payload;
    },
    setSelectedOperation: (state, action) => {
      state.selectedOperation = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchOperations.pending, (state, action) => {
      state.pageLoading = true;
      state.selectedOperation = {} as OperationResponse;
    });
    builder.addCase(fetchOperations.fulfilled, (state, action) => {
      state.pageLoading = false;
      state.operations = action.payload;
    });
    builder.addCase(fetchOperations.rejected, (state, action) => {
      state.pageLoading = false;
    });
    builder.addCase(fetchOperationsByActive.pending, (state, action) => {
      state.pageLoading = true;
    });
    builder.addCase(fetchOperationsByActive.fulfilled, (state, action) => {
      state.pageLoading = false;
      state.operations = action.payload;
    });
    builder.addCase(fetchOperationsByActive.rejected, (state, action) => {
      state.pageLoading = false;
    });
  },
});
const OperationReducer = operationSlice.reducer;
export default OperationReducer;
export const OperationActions = operationSlice.actions;
