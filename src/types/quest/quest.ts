import { QuestType } from '../../const/quest-type';
import { QuestLevelRaw } from '../../const/quest-level';

export enum LevelQuest {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard'
}

export enum TypeQuest {
  Adventures = 'adventures',
  Horror = 'horror',
  Mystic = 'mystic',
  Detective = 'detective',
  SciFi = 'sci-fi',
}

export type LevelTypeSample = {
  easy: string;
  hard: string;
  medium: string;
}

export type typeQuestSample = {
  adventures: string;
  horror: string;
  mystic: string;
  detective: string;
  sciFi: string;
}

export type QuestSample = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: LevelQuest;
  type: TypeQuest;
  peopleMinMax: [number,number];
};


export type QuestAllSample = QuestSample & {
   description: string;
   coverImg: string;
   coverImgWebp: string;
  };

export type typeQuestMainSample = typeQuestSample & {
    all: string;
  }

export type Quest = {
  id: number;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: QuestLevelRaw;
  type: QuestType;
  peopleMinMax: [number, number];
  description: string;
  coverImg: string;
  coverImgWebp: string;
  }

export type QuestPreview = Pick<Quest, 'id'|'title'|'previewImg'|'previewImgWebp'|'level'|'peopleMinMax'|'type'>;

export type Coordinates = [number, number];

export type QuestInfo = {
  id: number;
  locations: Location[];
  slots: {
    today: TimeSlot[];
    tomorrow: TimeSlot[];
  };
}

type TimeSlot = {
  time: string;
  isAvailable: boolean;
}


export type Location = {
  id: number;
  address: string;
  coords: Coordinates;
}


//export type {QuestSample,QuestAllSample,LevelTypeSample,typeQuestSample, typeQuestMainSample, };

