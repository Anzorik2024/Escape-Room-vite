import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoutes } from '../../const/api-routes';
import { UserData, AuthData } from '../../types/state/state';
import { saveToken } from '../../services/token';


export const loginUser = createAsyncThunk<UserData, AuthData, { extra: AxiosInstance }>('auth/login', async (body, { extra: api }) => {
  const response = await api.post<UserData>(ApiRoutes.Login, body);
  saveToken(response.data.token);
  return response.data;
});

