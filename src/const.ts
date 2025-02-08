import { LevelTypeSample,typeQuestSample, typeQuestMainSample } from './types/quest/quest';

const levelType : LevelTypeSample = {
  easy: 'легкий',
  hard: 'сложный',
  medium: 'средний'
};


const typeQuest : typeQuestSample = {
  adventures: 'приключения',
  horror:'ужасы',
  mystic: 'мистика',
  detective: 'детектив',
  sciFi: 'sci-fi',
};

const typeQuestMain : typeQuestMainSample = {
  all: 'Все квесты',
  adventures: 'Приключения',
  horror:'Ужасы',
  mystic: 'Мистика',
  detective: 'Детектив',
  sciFi: 'Sci-fi',
};

const typeQuestMainImage : typeQuestMainSample = {
  all: '#icon-all-quests',
  adventures:'#icon-adventure',
  horror:'#icon-horror',
  mystic: '#icon-mystic',
  detective: '#icon-detective',
  sciFi: '#icon-sci-fi',
};

const enum RequestStatus { Idle, Loading, Success, Failed }

const valueTypeQuest = ['all', 'adventures','horror', 'mystic', 'detective','sciFi'] as const;

export { levelType,RequestStatus, typeQuest, typeQuestMain, typeQuestMainImage,valueTypeQuest};
