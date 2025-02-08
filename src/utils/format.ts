import { QuestLevel, QuestLevelRaw } from '../const/quest-level';
import { QuestType, QuestTypeTranslate } from '../const/quest-type';
import { DateRaw, Date } from '../const/date';

export const capitalizeFirstLetter = (value: string) => value.charAt(0).toUpperCase().concat(value.slice(1));

export const translateLevel = (level: string) => {
  switch(level) {
    case QuestLevelRaw.Easy:
      return QuestLevel.Easy;
    case QuestLevelRaw.Medium:
      return QuestLevel.Medium;
    case QuestLevelRaw.Hard:
      return QuestLevel.Hard;

    default:
      return QuestLevel.Any;
  }
};

export const translateType = (type: string) => {
  switch(type) {
    case QuestType.Adventures:
      return QuestTypeTranslate.Adventures;
    case QuestType.Horror:
      return QuestTypeTranslate.Horror;
    case QuestType.Mystic:
      return QuestTypeTranslate.Mystic;
    case QuestType.Detective:
      return QuestTypeTranslate.Detective;
    case QuestType.SciFi:
      return QuestTypeTranslate.SciFi;
    default:
      return QuestTypeTranslate.All;
  }
};


export const translateDate = (date: DateRaw) => {
  if (date === DateRaw.TODAY) {
    return Date.TODAY;
  }

  return Date.TOMORROW;
};
