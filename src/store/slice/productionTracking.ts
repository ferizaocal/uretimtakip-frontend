import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ProductionTrackingResponse} from '../../dto/Response/ProductionTrackingResponse';
import {getAllProductionTrackings} from '../../services/ProductionTrackingService';

export interface ProductionTrackingState {
  productionTrackings: Array<ProductionTrackingResponse>;
  loading: boolean;
}

const INITIAL_STATE: ProductionTrackingState = {
  productionTrackings: [],
  loading: true,
};

export const fetchProductionTrackings = createAsyncThunk(
  'productionTracking/fetchProductionTrackings',
  async (operationId: number) => {
    const response = await getAllProductionTrackings(operationId);

    return response.data.list;
  },
);

const productionTrackingSlice = createSlice({
  name: 'productionTracking',
  initialState: INITIAL_STATE,
  reducers: {
    setProductionTracking(state, action) {
      state.productionTrackings = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProductionTrackings.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProductionTrackings.fulfilled, (state, action) => {
      state.productionTrackings = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProductionTrackings.rejected, state => {
      state.loading = false;
    });
  },
});
const ProductionTrackingReducer = productionTrackingSlice.reducer;
export default ProductionTrackingReducer;
export const ProductionTrackingActions = productionTrackingSlice.actions;
