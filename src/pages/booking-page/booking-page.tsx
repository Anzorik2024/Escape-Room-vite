import { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getSelectedQuest } from '../../store/selectors';
import { Quest } from '../../types/quest/quest-types';
import { useActionCreators } from '../../hooks/use-action-creators';
import { questsActions } from '../../store/quests-process/quests-process';
import { toast } from 'react-toastify';
import Spiner from '../../components/spiner/spiner';


function BookingPage():JSX.Element {

  const selectedQuest = useAppSelector(getSelectedQuest);
  const {peopleMinMax} = selectedQuest;
  const [bookedQuest, setBookedQuest] = useState<Quest|null>(null);

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

  //console.log(bookedQuest);
  if (!bookedQuest) {
    return <Spiner />;
  }

  return (
    <div></div>
  );

}

export default BookingPage;
