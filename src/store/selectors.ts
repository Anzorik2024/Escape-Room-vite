import { State } from '../types/state/state';


const selectMainQuest = (state: State) => state.main.quest;
const selectQuestOne = (state: State) => state.main.questOne;
const selectQuestStatus = (state: State) => state.main.status;
const getFilterOptionByType = (state: State) => state.filterProcess.typeOption;
const getFilterOptionByLevel = (state: State) => state.filterProcess.levelOption;
const getIsLoginLoading = (state: State) => state.userProcess.isLoginLoading;

export {
  selectMainQuest,
  selectQuestOne,
  selectQuestStatus,
  getFilterOptionByType,
  getFilterOptionByLevel,
  getIsLoginLoading
};

