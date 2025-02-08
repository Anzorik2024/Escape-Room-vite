import { QuestInfo, QuestPreview } from '../../types/quest/quest';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Dispatch, State } from '../../types/state/state';
import { ApiRoutes } from '../../const/api-routes';


export const fetchQuestByIdAction = createAsyncThunk<
QuestInfo,
number,
{
  dispatch: Dispatch;
  state: State;
  extra: AxiosInstance;
}
>('booking/fetchQuestBookingInfoById',
  async (id, { extra: api}) => {
    const { data } = await api.get<QuestInfo>(`${ApiRoutes.Quests}/${id}/booking`);

    return data;
  }
);

export const fetchQuestPreviewsAction = createAsyncThunk<
  QuestPreview[],
  undefined,
  {
    dispatch: Dispatch;
    state: State;
    extra: AxiosInstance;
  }
>('quest/fetchQuestsPreview',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<QuestPreview[]>(ApiRoutes.Quests);

    return data;
  }
);

