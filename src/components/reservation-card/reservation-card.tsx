import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

import { deleteReservationAction, fetchReservationsAction } from '../../store/thunks/resrvation-process';
import { Reservation } from '../../types/reservation/reservation-types';
import { AppRoute } from '../../const/app-route';

import { capitalizeFirstLetter, translateLevel, translateDate } from '../../utils/format';
import { toast } from 'react-toastify';
import { WarningMessage } from '../../const/warning-message';


type ReservationCardProps = {
  reservation: Reservation;
}

function ReservationCard({reservation}: ReservationCardProps): JSX.Element {
  const {id, location, quest, peopleCount, date, time} = reservation;
  const { address } = location;

  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    dispatch(deleteReservationAction(id)).unwrap().then(
      () => {
        dispatch(fetchReservationsAction());
      },)
      .catch(() => {
        toast.error(WarningMessage.SendError);
      });
  };

  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${quest.previewImgWebp}, ${quest.previewImgWebp} 2x`}
          />
          <img
            src={quest.previewImg}
            srcSet={`${quest.previewImg} 2x`}
            width={344}
            height={232}
            alt={quest.title}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={`${AppRoute.Quest}/${quest.id}`}>
            {capitalizeFirstLetter(quest.title)}
          </Link>
          <span className="quest-card__info">
                  [{`${translateDate(date)},${' '}${time}. ${address}`}]
          </span>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person" />
            </svg>
            {peopleCount}&nbsp;чел
          </li>
          <li className="tags__item">
            <svg width={14} height={14} aria-hidden="true">
              <use xlinkHref="#icon-level" />
            </svg>
            {translateLevel(quest.level)}
          </li>
        </ul>
        <button
          className="btn btn--accent btn--secondary quest-card__btn"
          type="button"
          onClick={handleButtonClick}
        >
                Отменить
        </button>
      </div>
    </div>
  );
}

export default ReservationCard;
