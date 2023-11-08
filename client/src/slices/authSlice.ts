import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  userInfo: {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
  } | null;
}

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.userInfo = action.payload;
    },
    logout(state) {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
