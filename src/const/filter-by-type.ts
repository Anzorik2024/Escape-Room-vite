import { QuestType } from './quest-type';

export const FILTER_BY_TYPE = [
  {type: QuestType.All, title: 'Все квесты', pictureHref:'#icon-all-quests'},
  {type: QuestType.Adventures, title: 'Приключения', pictureHref:'#icon-adventure'},
  {type: QuestType.Horror, title: 'Ужасы', pictureHref:'#icon-horror'},
  {type: QuestType.Mystic, title: 'Мистика', pictureHref:'#icon-mystic'},
  {type: QuestType.Detective, title: 'Детективы', pictureHref:'#icon-detective'},
  {type: QuestType.SciFi, title: 'Sci-fi', pictureHref:'#icon-sci-fi'}
];
