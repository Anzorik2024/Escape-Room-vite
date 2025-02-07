import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoutes } from '../../const/api-routes';
import { UserData, AuthData } from '../../types/state/state';
import { saveToken } from '../../services/token';
import { Dispatch, State } from '../../types/state/state';
import { dropToken } from '../../services/token';

export const loginUser = createAsyncThunk<UserData, AuthData, { extra: AxiosInstance }>('auth/login', async (body, { extra: api }) => {
  const response = await api.post<UserData>(ApiRoutes.Login, body);
  saveToken(response.data.token);
  return response.data;
});


export const checkAuthorization = createAsyncThunk<UserData, undefined, {dispatch: Dispatch; state: State; extra: AxiosInstance}>('checkAuthorization', async (_arg, {extra: api}) => {
  const { data } = await api.get<UserData>(ApiRoutes.Login);
  return data;
});

// export const logoutAction = createAsyncThunk<
//     void,
//     undefined,
//   {
//     dispatch: AppDispatch;
//     state: State;
//     extra: AxiosInstance;
//   }
//   >('user/logout',
//     async (_arg, { extra: api}) => {
//       await api.delete(ApiRoutes.Logout);
//       dropToken();
//     }
//   );

export const logout = createAsyncThunk<unknown, undefined, { extra: AxiosInstance }>
('user/logout', async (_, { extra: api }) => {
  await api.delete(ApiRoutes.Logout);
  dropToken();
});
