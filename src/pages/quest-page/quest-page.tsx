import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { questAction } from '../../store/main-slice/main-slice';
import { useActionCreators } from '../../hooks/use-action-creators';
import { useAppSelector } from '../../hooks/use-app-selector';
import { selectQuestStatus, selectQuestOne } from '../../store/selectors';
import { RequestStatus } from '../../const';
import Spiner from '../../components/spiner/spiner';
import Page404 from '../page404/page404';
import Header from '../../components/header/header';
import { translateType, translateLevel } from '../../utils/format';
import { AppRoute } from '../../const/app-route';

function QuestPage():JSX.Element {
  const {fetchQuest} = useActionCreators(questAction);
  const status = useAppSelector(selectQuestStatus);
  const questOne = useAppSelector(selectQuestOne);

  const { id } = useParams<{ id: string }>();


  useEffect(() => {
    fetchQuest(id as string)
      .unwrap()
      .catch(() => {
        // toast.error(ToastifyErrorMessage.UploadOffer);
      });

  }, [id,fetchQuest]);

  if (status === RequestStatus.Loading) {
    return (
      <Spiner />
    );
  }
  if (status === RequestStatus.Failed || !questOne) {
    return <Page404 />;
  }

  const {
    title,
    level,
    type,
    peopleMinMax,
    description,
    coverImg,
    coverImgWebp
  } = questOne;

  const titleTypeQuest = translateType(type);
  const peopleMin = peopleMinMax[0];
  const peopleMax = peopleMinMax[1];
  const levelQuest = translateLevel(level);


  return(
    <>
      <Header/>
      <main className="decorated-page quest-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet={ `${coverImgWebp}, ${coverImgWebp} 2x`}
            />
            <img
              src={coverImg}
              srcSet={`${coverImg} 2x`}
              width={1366}
              height={768}
              alt=""
            />
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="quest-page__content">
            <h1 className="title title--size-l title--uppercase quest-page__title">
              {title}
            </h1>
            <p className="subtitle quest-page__subtitle">
              <span className="visually-hidden">Жанр:</span>{titleTypeQuest}
            </p>
            <ul className="tags tags--size-l quest-page__tags">
              <li className="tags__item">
                <svg width="11" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-person"></use>
                </svg>{peopleMin}&ndash;{peopleMax}&nbsp;чел
              </li>
              <li className="tags__item">
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-level"></use>
                </svg>{levelQuest}
              </li>
            </ul>
            <p className="quest-page__description">{description}</p>
            {id ?
              <Link
                className="btn btn--accent btn--cta quest-page__btn"
                to={`${AppRoute.Quest}/${id}/booking`}
              >
            Забронировать
              </Link> : null }
          </div>
        </div>
      </main>
    </>
  );
}

export default QuestPage;

