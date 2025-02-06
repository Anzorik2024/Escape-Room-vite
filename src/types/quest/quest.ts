enum LevelQuest {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard'
}

enum TypeQuest {
  Adventures = 'adventures',
  Horror = 'horror',
  Mystic = 'mystic',
  Detective = 'detective',
  SciFi = 'sci-fi',
}

type LevelTypeSample = {
  easy: string;
  hard: string;
  medium: string;
}

type typeQuestSample = {
  adventures: string;
  horror: string;
  mystic: string;
  detective: string;
  sciFi: string;
}

type QuestSample = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: LevelQuest;
  type: TypeQuest;
  peopleMinMax: [number,number];
};


 type QuestAllSample = QuestSample & {
   description: string;
   coverImg: string;
   coverImgWebp: string;
  };

  type typeQuestMainSample = typeQuestSample & {
    all: string;
  }

export type {QuestSample,QuestAllSample,LevelTypeSample,typeQuestSample, typeQuestMainSample};

