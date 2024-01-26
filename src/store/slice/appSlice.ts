import {createSlice} from '@reduxjs/toolkit';
import ProductionModelResponse from '../../dto/Response/ProductionModelResponse';

export interface AppSettingsState {
  language: string;
  production: ProductionModelResponse;
  listType: 'grid' | 'list';
}

export const INITIAL_STATE: AppSettingsState = {
  language: 'en',
  production: {} as ProductionModelResponse,
  listType: 'grid',
};
export const appSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setProduction: (state, action) => {
      state.production = action.payload;
    },
    setListType: (state, action) => {
      state.listType = action.payload;
    },
  },
});

const AppReducer = appSlice.reducer;
export default AppReducer;
export const AppActions = appSlice.actions;
