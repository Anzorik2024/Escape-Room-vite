import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const/authorization-status';
import { UserProcess,UserData } from '../../types/state/state';
import { loginAction } from '../thunks/user-process';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: {} as UserData,
  isLoginLoading: false
};

export const userProcess = createSlice({
  name: 'UserProcess',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // .addCase(checkAuthorizationStatusAction.fulfilled, (state, action) => {
      //   state.authorizationStatus = AuthorizationStatus.Auth;
      //   state.user = action.payload;
      // })
      // .addCase(checkAuthorizationStatusAction.rejected, (state) => {
      //   state.authorizationStatus = AuthorizationStatus.NoAuth;
      // })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
        state.isLoginLoading = false;
      })
      .addCase(loginAction.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoginLoading = false;
      });
    // .addCase(logoutAction.fulfilled, (state) => {
    //   state.authorizationStatus = AuthorizationStatus.NoAuth;
    // });
  }
});

const userReducer = userProcess.reducer;
const userActions = {
  loginAction
};

export {
  userReducer,
  userActions
};

