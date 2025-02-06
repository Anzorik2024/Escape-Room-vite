export enum QuestType {
  Adventures = 'adventures',
  Horror = 'horror',
  Mystic ='mystic',
  Detective = 'detective',
  SciFi = 'sci-fi',
  All = 'all'
}

export enum QuestTypeTranslate {
  Adventures = 'Приключения',
  Horror = 'Ужасы',
  Mystic = 'Мистика',
  Detective = 'Детективы',
  SciFi = 'Sci-fi',
  All = 'Все квесты'
}

export const QUEST_BY_TYPE_DEFAULT = QuestType.All;
