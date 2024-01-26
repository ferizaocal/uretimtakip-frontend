import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {OrderResponse} from '../../dto/Response/OrderResponse';
import {getOrders} from '../../services/OrderService';
import {ProductionTrackingResponse} from '../../dto/Response/ProductionTrackingResponse';
import {getProductionTrackings} from '../../services/ProductionTrackingService';

export interface HomeState {
  orders: Array<OrderResponse>;
  productionTrackings: Array<ProductionTrackingResponse>;
}

const INITIAL_STATE: HomeState = {
  orders: [],
  productionTrackings: [],
};

export const fetchOrders = createAsyncThunk('home/fetchOrders', async () => {
  const response = await getOrders();

  return response.data.list;
});
export const fetchProductionTrackings = createAsyncThunk(
  'home/fetchProductionTrackings',
  async () => {
    const response = await getProductionTrackings();
    return response.data.list;
  },
);

const homeSlice = createSlice({
  name: 'home',
  initialState: INITIAL_STATE,
  reducers: {
    setOrders: (state, action: PayloadAction<Array<OrderResponse>>) => {
      state.orders = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchOrders.pending, (state, action) => {
      state.orders = [];
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });

    builder.addCase(
      fetchProductionTrackings.fulfilled,
      (state, action: PayloadAction<Array<ProductionTrackingResponse>>) => {
        state.productionTrackings = action.payload;
      },
    );
  },
});

export const OrderActions = homeSlice.actions;
const HomeReducer = homeSlice.reducer;
export default HomeReducer;
