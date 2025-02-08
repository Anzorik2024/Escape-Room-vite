import { ChangeEvent, FormEvent, useState, memo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { fetchReservationsAction, sendBookingInfoAction } from '../../store/thunks/resrvation-process';
import { getSelectedLocation } from '../../store/selectors';
import { QuestInfo } from '../../types/quest/quest-types';
import { BookingInfo } from '../../types/reservation/reservation-types';
import { DateRaw } from '../../const/date';
import { AppRoute } from '../../const/app-route';
import { WarningMessage } from '../../const/warning-message';
import { toast } from 'react-toastify';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, ValidationMessage } from '../../const/validation-message';


type bookingFormProps = {
  quest: QuestInfo;
  peopleMinMax: [number,number];
}

const initialBookingInfoState: BookingInfo = {
  date: DateRaw.TODAY,
  time: '',
  contactPerson: '',
  phone: '',
  withChildren: false,
  peopleCount: 0,
  locationId: 0,
  questId: 0
};

const PHONE_REGEX = /^((\+7)[ ])(\(\d{3}\)[ ])\d{3}[-]\d{2}[-]\d{2}$/;
const USER_NAME_REGEX = /^[А-Яа-яЁёA-Za-z]{1,}$/;

function BookingForm({quest, peopleMinMax}: bookingFormProps):JSX.Element {
  const { slots, id } = quest;
  const { today, tomorrow } = slots;
  const [peopleMin, peopleMax] = peopleMinMax;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedLocation = useAppSelector(getSelectedLocation);

  const {
    register,
    formState: {errors, isValid},
    reset
  } = useForm({
    mode: 'onBlur'
  });

  const [formData, setFormData] = useState<BookingInfo>(initialBookingInfoState);

  const handleTodayDatePickerOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      time: event.target.value,
      date: DateRaw.TODAY
    });
  };

  const handleTommorowDatePickerOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      time: event.target.value,
      date: DateRaw.TOMORROW
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(sendBookingInfoAction({
      ...formData,
      peopleCount: +formData.peopleCount,
      locationId: selectedLocation.id,
      questId: id
    })).unwrap().then(
      () => {
        reset();

        navigate(AppRoute.MyQuests);

        dispatch(fetchReservationsAction());
      }
      // () =>  сделать catch и показать ошибку () => dispatch(displayError(WarningMessage.SendError))
    ).catch(() => {
      toast.error(WarningMessage.SendError);
    });
  };

  return (
    <form
      className="booking-form"
      action=""
      method="post"
      onSubmit={handleFormSubmit}
    >
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Выбор даты и времени</legend>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Сегодня</legend>
          <div
            className="booking-form__date-inner-wrapper"
            onChange={handleTodayDatePickerOptionChange}
          >
            {today.map(({time, isAvailable}) => (
              <label className="custom-radio booking-form__date" key={`${DateRaw.TODAY}-${time}`}>
                <input
                  type="radio"
                  id={DateRaw.TODAY.concat(time)}
                  value={time}
                  disabled={!isAvailable}
                  {...register('date',{ required: true})}
                />
                <span className="custom-radio__label">{time}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Завтра</legend>
          <div
            className="booking-form__date-inner-wrapper"
            onChange={handleTommorowDatePickerOptionChange}
          >
            {tomorrow.map(({time, isAvailable}) => (
              <label className="custom-radio booking-form__date" key={`${DateRaw.TOMORROW}-${time}`}>
                <input
                  type="radio"
                  id={DateRaw.TOMORROW.concat(time)}
                  value={time}
                  disabled={!isAvailable}
                  {...register('date',{ required: true})}
                />
                <span className="custom-radio__label">{time}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </fieldset>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="name">
                Ваше имя
          </label>
          <input
            type="text"
            id="name"
            placeholder="Имя"
            value={formData.contactPerson}
            {...register('contactPerson', {
              required: ValidationMessage.RequiredDate,
              pattern: {
                value: USER_NAME_REGEX,
                message: ValidationMessage.ValidateUserName
              },
              validate: {
                value: (value: string) => value.trim().length >= NAME_MIN_LENGTH && value.trim().length <= NAME_MAX_LENGTH
              },
              onChange: handleInputChange
            })}
          />
          {errors.contactPerson && <><br/><span role="alert">{errors.contactPerson?.message?.toString() || ValidationMessage.ValidateUserNameLength}</span></>}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="tel">
                Контактный телефон
          </label>
          <input
            type="tel"
            id="tel"
            placeholder="Телефон"
            value={formData.phone}

            {...register('phone', {
              required: ValidationMessage.RequiredField,
              pattern: {
                value: PHONE_REGEX,
                message: ValidationMessage.ValidatePhone
              },
              onChange: handleInputChange
            })}
          />
          {errors.phone && <><br/><span role="alert">{errors.phone.message?.toString()}</span></>}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="person">
                Количество участников
          </label>
          <input
            type="number"
            id="person"
            placeholder="Количество участников"
            value={formData.peopleCount}

            {...register('peopleCount', {
              required: ValidationMessage.RequiredField,
              min: {
                value: peopleMin,
                message: ValidationMessage.ValidateParticipantsMin
              },
              max: {
                value: peopleMax,
                message: ValidationMessage.ValidateParticipantsMax
              },
              onChange: handleInputChange
            })}
          />
          {errors.peopleCount && <><br/><span role="alert">{errors.peopleCount.message?.toString()}</span></>}
        </div>
        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input
            type="checkbox"
            id="children"
            name="withChildren"
            onChange={handleInputChange}
          />
          <span className="custom-checkbox__icon">
            <svg width={20} height={17} aria-hidden="true">
              <use xlinkHref="#icon-tick" />
            </svg>
          </span>
          <span className="custom-checkbox__label">
                Со&nbsp;мной будут дети
          </span>
        </label>
      </fieldset>
      <button
        className="btn btn--accent btn--cta booking-form__submit"
        type="submit"
        disabled={ !isValid }
      >
            Забронировать
      </button>
      <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
        <input
          type="checkbox"
          id="id-order-agreement"
          {...register('user-agreement',{ required: true})}
        />
        <span className="custom-checkbox__icon">
          <svg width={20} height={17} aria-hidden="true">
            <use xlinkHref="#icon-tick" />
          </svg>
        </span>
        <span className="custom-checkbox__label">
              Я&nbsp;согласен с
          <a className="link link--active-silver link--underlined" href="/">
                правилами обработки персональных данных
          </a>
              &nbsp;и пользовательским соглашением
        </span>
      </label>
    </form>
  );
}

export default memo(BookingForm);
