import { createSlice } from '@reduxjs/toolkit';
import { QuestInfo } from '../../types/quest/quest-types';
import { QuestsProcess } from '../../types/state/state';
import { fetchQuestByIdAction, fetchQuestPreviewsAction } from '../thunks/quests-process';

const initialState: QuestsProcess = {
  quests: [],
  selectedQuest: {} as QuestInfo,
  isQuestsLoading: false
};

export const questsProcess = createSlice({
  name: 'QuestsProcess',
  initialState,
  reducers: {},
  extraReducers(builder){
    builder
      .addCase(fetchQuestPreviewsAction.fulfilled, (state, action) => {
        state.quests = action.payload;
        state.isQuestsLoading = false;
      })
      .addCase(fetchQuestPreviewsAction.pending, (state) => {
        state.isQuestsLoading = true;
      })
      .addCase(fetchQuestPreviewsAction.rejected, (state) => {
        state.isQuestsLoading = false;
      })
      .addCase(fetchQuestByIdAction.fulfilled, (state, action) =>{
        state.selectedQuest = action.payload;
      });
  }
});


const questsReducer = questsProcess.reducer;

const questsActions = {
  fetchQuestByIdAction,
  fetchQuestPreviewsAction
};

export {
  questsReducer,
  questsActions
};

