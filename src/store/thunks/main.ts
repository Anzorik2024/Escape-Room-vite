import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State, Dispatch } from '../../types/state/state';
import { ApiRoute } from '../../const';
import { QuestAllSample } from '../../types/quest/quest';
import { QuestPreview } from '../../types/quest/quest-types';


const questOffers = createAsyncThunk<QuestPreview[], undefined, {dispatch: Dispatch; state: State; extra: AxiosInstance}>('data/uploadOffers', async (_arg, { extra: api}) => {
  const { data } = await api.get<QuestPreview[]>(ApiRoute.Quest);
  return data;
});


const fetchQuest = createAsyncThunk<QuestAllSample, string, {extra: AxiosInstance}>('fetchQuest/one', async (questID, {extra: api}) => {
  const response = await api.get<QuestAllSample>(`${ApiRoute.Quest}/${questID}`);
  return response.data;
});

export {questOffers,fetchQuest};

