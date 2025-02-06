import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QUEST_BY_LEVEL_DEFAULT, QuestLevelRaw } from '../../const/quest-level';
import { QUEST_BY_TYPE_DEFAULT, QuestType } from '../../const/quest-type';

const initialState = {
  typeOption: QUEST_BY_TYPE_DEFAULT as QuestType,
  levelOption: QUEST_BY_LEVEL_DEFAULT
};

export const filterProcess = createSlice({
  name: 'Filter',
  initialState,
  reducers: {
    changeType: (state, action: PayloadAction<QuestType>) => {
      state.typeOption = action.payload;
    },
    changeLevel: (state, action: PayloadAction<QuestLevelRaw>) => {
      state.levelOption = action.payload;
    }
  }
});

const filterProcessReducer = filterProcess.reducer;

export const {changeLevel, changeType} = filterProcess.actions;
export {filterProcessReducer};


