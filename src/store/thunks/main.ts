import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State, Dispatch } from '../../types/state/state';
import { ApiRoutes } from '../../const/api-routes';

import { QuestAllSample } from '../../types/quest/quest';
import { QuestPreview } from '../../types/quest/quest';


const questOffers = createAsyncThunk<QuestPreview[], undefined, {dispatch: Dispatch; state: State; extra: AxiosInstance}>('data/uploadOffers', async (_arg, { extra: api}) => {
  const { data } = await api.get<QuestPreview[]>(ApiRoutes.Quests);
  return data;
});


const fetchQuest = createAsyncThunk<QuestAllSample, string, {extra: AxiosInstance}>('fetchQuest/one', async (questID, {extra: api}) => {
  const response = await api.get<QuestAllSample>(`${ApiRoutes.Quests}/${questID}`);
  return response.data;
});

export {questOffers,fetchQuest};

