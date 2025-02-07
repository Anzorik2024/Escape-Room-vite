import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const/authorization-status';
import { UserProcess,UserData } from '../../types/state/state';
import { loginUser, checkAuthorization } from '../thunks/user-process';

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
      .addCase(checkAuthorization.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthorization.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
        state.isLoginLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(loginUser.rejected, (state) => {
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
  loginUser,
  checkAuthorization
};

export {
  userReducer,
  userActions
};

