import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State} from '../../types/state/state';



//import { ApiRoute } from '../../const';



export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
  >(Action.UserLogIn,
    async ({ email, password }, { extra: api}) => {
      const { data } = await api.post<UserData>(ApiRoutes.Login, { email, password});
      saveToken(data.token);

      return data;
    }
  );
