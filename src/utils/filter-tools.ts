import { QuestPreview } from '../types/quest/quest-types';
import { QuestLevelRaw, QUEST_BY_LEVEL_DEFAULT } from '../const/quest-level';
import { QuestType, QUEST_BY_TYPE_DEFAULT } from '../const/quest-type';

export const filterQuestByType = (quest: QuestPreview, selectedType: QuestType) => {
  if(selectedType !== QUEST_BY_TYPE_DEFAULT) {
    return quest.type === selectedType;
  }
  return true;
};

export const filterQuestByLevel = (quest: QuestPreview, selectedLevel: QuestLevelRaw) => {
  if(selectedLevel !== QUEST_BY_LEVEL_DEFAULT) {
    return quest.level === selectedLevel;
  }
  return true;
};
