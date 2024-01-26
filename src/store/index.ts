import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore} from 'redux-persist';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import AppReducer, {AppSettingsState} from './slice/appSlice';
import persistReducer from 'redux-persist/es/persistReducer';
import AuthReducer, {AuthState} from './slice/authSlice';

import ProductionModelReducer, {
  ProductionModelState,
} from './slice/productionModelSlice';
import OperationReducer, {OperationState} from './slice/operationSlice';
import RoleReducer, {RoleState} from './slice/roleSlice';
import ProductionTrackingReducer, {
  ProductionTrackingState,
} from './slice/productionTracking';
import HomeReducer, {HomeState} from './slice/homeSlice';

export interface AppState {
  app: AppSettingsState;
  auth: AuthState;
  productionModel: ProductionModelState;
  operation: OperationState;
  role: RoleState;
  productionTracking: ProductionTrackingState;
  home: HomeState;
}
export const Config = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['user', 'language', 'listType', 'production'],
};

const rootReducer = combineReducers<AppState>({
  app: persistReducer(Config, AppReducer),
  auth: persistReducer(Config, AuthReducer),
  productionModel: ProductionModelReducer,
  operation: OperationReducer,
  role: RoleReducer,
  productionTracking: ProductionTrackingReducer,
  home: HomeReducer,
} as any);
export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
export default rootReducer;
export type AppDispatch = typeof store.dispatch;
