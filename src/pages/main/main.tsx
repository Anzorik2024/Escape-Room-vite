import { useAppSelector } from '../../hooks/use-app-selector';
import { selectMainQuest } from '../../store/selectors';
import Footer from '../../components/footer/footer';
import PageTitle from '../../components/page-title/page-title';
import FormFilter from '../../components/form-filter/form-filter';
import { filterQuestByType, filterQuestByLevel } from '../../utils/filter-tools';
import { getFilterOptionByType, getFilterOptionByLevel} from '../../store/selectors';
import EmptyPlug from '../../components/empty-plug/empty-plug';
import { EmptyPlugText } from '../../const/empty-plug-text';
import QuestCard from '../../components/quest-card/quest-card';
import Header from '../../components/header/header';

function Main() : JSX.Element {
  const mainQuests = useAppSelector(selectMainQuest);

  const selectedType = useAppSelector(getFilterOptionByType);
  const selectedLevel = useAppSelector(getFilterOptionByLevel);


  const filteredQuests = mainQuests
    .filter((quest) => filterQuestByType(quest, selectedType))
    .filter((quest) => filterQuestByLevel(quest, selectedLevel));


  return (
    <div className='wrapper'>
      <Header/>
      <main className="page-content">
        <div className="container">
          <PageTitle/>
          <div className="page-content__item">
            <FormFilter/>
          </div>
          <h2 className="title visually-hidden">Выберите квест</h2>
          <div className="cards-grid">
            { filteredQuests.length ?
              filteredQuests?.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                />
              ))
              : <EmptyPlug text={EmptyPlugText.NoQuestsByFilter}/>}
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Main;
