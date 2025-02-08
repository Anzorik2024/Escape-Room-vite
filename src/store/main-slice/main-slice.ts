import { createSlice } from '@reduxjs/toolkit';
import { questOffers, fetchQuest } from '../thunks/main';
import { RequestStatus } from '../../const/request-status';
import { QuestPreview } from '../../types/quest/quest';
import { QuestAllSample } from '../../types/quest/quest';

type QuestsProcess = {
  quest: QuestPreview[];
  isLoading: boolean;
  questOne: null | QuestAllSample ;
  status: RequestStatus;
}

const initialState : QuestsProcess = {
  quest: [],
  isLoading: false,
  questOne: null,
  status: RequestStatus.Idle
};

const mainSlice = createSlice({
  name: 'Main',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(questOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(questOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quest = action.payload;
      })
      .addCase(questOffers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchQuest.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchQuest.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.questOne = action.payload;
      })
      .addCase(fetchQuest.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

const mainReducer = mainSlice.reducer;

const questAction = {
  questOffers,
  fetchQuest
};

export {
  mainReducer,
  questAction
};
