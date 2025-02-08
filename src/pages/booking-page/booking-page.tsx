import { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';
import { selectQuestOne } from '../../store/selectors';
import { QuestInfo} from '../../types/quest/quest-types';
import { useActionCreators } from '../../hooks/use-action-creators';
import { questsActions } from '../../store/quests-process/quests-process';
import { toast } from 'react-toastify';
import Spiner from '../../components/spiner/spiner';
import Header from '../../components/header/header';
import BackgroundPictureEmpty from '../../components/background-picture-empty/background-picture-empty';
import BookingMap from '../../components/booking-map/booking-map';
import BookingForm from '../../components/booking-form/booking-form';


function BookingPage():JSX.Element {

  const questOne = useAppSelector(selectQuestOne);
  const [bookedQuest, setBookedQuest] = useState<QuestInfo|null>(null);


  const {fetchQuestByIdAction} = useActionCreators(questsActions);

  const { id } = useParams<{ id: string }>();
  const questId = Number(id);

  useEffect(() => {
    fetchQuestByIdAction(questId)
      .unwrap().then(
        (quest) => {
          setBookedQuest(quest);
        },
      )
      .catch(() => {
        toast.error('Придумать сообщение');
      });

  }, [ questId,fetchQuestByIdAction]);

  if (!bookedQuest) {
    return <Spiner />;
  }

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content decorated-page">
        <BackgroundPictureEmpty/>
        <div className="container container--size-s">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle subtitle--size-l page-content__subtitle">
            Бронирование квеста
            </h1>
            <p className="title title--size-m title--uppercase page-content__title">
              {questOne ? questOne.title : ''}
            </p>
          </div>
          <BookingMap quest={bookedQuest}/>
          {questOne ? <BookingForm quest={bookedQuest} peopleMinMax={questOne.peopleMinMax} /> : ''}
        </div>

      </main>
    </div>
  );

}

export default BookingPage;
