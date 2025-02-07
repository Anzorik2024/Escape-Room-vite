import { store } from '../../store';
import { AuthorizationStatus } from '../../const/authorization-status';
import { QuestPreview, Quest } from '../quest/quest-types';

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

export type QuestsProcess = {
  quests: QuestPreview[];
  selectedQuest: Quest;
  isQuestsLoading: boolean;
};
