import { store } from '../../store';
import { AuthorizationStatus } from '../../const/authorization-status';

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;


export type UserData = {
  email: string;
  token: string;
}

export type AuthData = {
  email: string;
  password: string;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData;
  isLoginLoading: boolean;
};
