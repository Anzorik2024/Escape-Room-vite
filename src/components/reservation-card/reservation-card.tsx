import { Link } from 'react-router-dom';
import { memo } from 'react';

import { useAppDispatch } from '../../hooks';
import { displayError } from '../../store/actions';
import { deleteReservationAction, fetchReservationsAction } from '../../store/api-actions';

import { Reservation } from '../../@types/reservation-types';

import { AppRoute } from '../../const/app-route';
import { WarningMessage } from '../../const/warning-message';
import { capitalizeFirstLetter, translateDate, translateLevel } from '../../utiles/format';

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
      },
      () => {
        dispatch(displayError(WarningMessage.SendError));
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

export default memo(ReservationCard);
