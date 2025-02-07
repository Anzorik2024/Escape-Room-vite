import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State} from '../../types/state/state';
import { ApiRoutes } from '../../const/api-routes';
import { Dispatch } from '../../types/state/state';
import { UserData, AuthData } from '../../types/state/state';
import { saveToken } from '../../services/token';


export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: Dispatch;
    state: State;
    extra: AxiosInstance;
  }
  >('user/login',
    async ({ email, password }, { extra: api}) => {
      const { data } = await api.post<UserData>(ApiRoutes.Login, { email, password});
      saveToken(data.token);

      return data;
    }
  );

export const loginUser = createAsyncThunk<UserData, AuthData, { extra: AxiosInstance }>('auth/login', async (body, { extra: api }) => {
  const response = await api.post<UserData>(ApiRoutes.Login, body);
  saveToken(response.data.token);
  return response.data;
});


  
