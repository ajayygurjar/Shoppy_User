
import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  token: localStorage.getItem('token') || null,
  email: localStorage.getItem('email') || null,
  isLoggedIn: !!localStorage.getItem('token'),
  isLogin: true,
  isLoading: false,
  error: null,
  isLoginModalOpen: false,
  isProfileModalOpen: false, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('email', action.payload.email);
    },
    logout(state) {
      state.token = null;
      state.email = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    },
    toggleMode(state) {
      state.isLogin = !state.isLogin;
      state.error = null;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    openLoginModal(state) {
      state.isLoginModalOpen = true;
    },
    closeLoginModal(state) {
      state.isLoginModalOpen = false;
    },
    openProfileModal(state) {
      state.isProfileModalOpen = true;
    },
    closeProfileModal(state) {
      state.isProfileModalOpen = false;
    },
  },
});


export const authActions = authSlice.actions;
export default authSlice.reducer;
