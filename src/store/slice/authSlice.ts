import {createSlice} from '@reduxjs/toolkit';

import LoginResponse from '../../dto/Response/LoginResponse';
export interface AuthState {
  firebaseToken: string | null;
  user: LoginResponse | null;
}

const INITIAL_STATE: AuthState = {
  user: {} as LoginResponse,
  firebaseToken: null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFirebaseToken: (state, action) => {
      state.firebaseToken = action.payload;
    },
  },
});
const AuthReducer = authSlice.reducer;
export default AuthReducer;
export const AuthActions = authSlice.actions;
