import { store } from '../../store';

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

