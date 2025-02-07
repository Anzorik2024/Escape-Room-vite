import { FormEvent, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { loginAction, loginUser } from '../../store/thunks/user-process';
import { useEffect } from 'react';
//import { userActions } from '../../store/user-process/user-process';
//import { useActionCreators } from '../../hooks/use-action-creators';

//import { useAppDispatch, useAppSelector } from '../../hooks';
//import { fetchReservationsAction, loginAction } from '../../store/api-actions';
//import { getIsLoginLoading } from '../../store/user-process/user-process-selectors';
//import { displayError } from '../../store/actions';

import { AppRoute } from '../../const/app-route';
//import { LoginButtonText } from '../../const/login-button-text';
//import { WarningMessage } from '../../const/warning-message';
//import { ValidationMessage } from '../../const/validation-messages';

export enum LoginButtonText {
  Default = 'Войти',
  Clicked = 'Вход...'
}


export enum ValidationMessage {
  RequiredDate = 'Выберите дату.',
  RequiredField = 'Данные обязательные для заполнения.',
  ValidateUserName = 'Ввeдите корректное имя пользователя.',
  ValidateUserNameLength = 'Введите имя пользователя, состоящее не менее, чем из 1 символа и не более, чем из 15.',
  ValidatePhone = 'Ввeдите номер телефона в формате +7 (000) 000-00-00.',
  ValidateParticipantsMin = 'Количество участников меньше допустимого количества для даного квеста.',
  ValidateParticipantsMax = 'Количество участников больше допустимого количества для даного квеста.',
  ValidateEmail = 'Ввeдите корректный email.',
  ValidatePassword = 'Ввeдите пароль, состоящий из букв и цифр не короче 3 символов.', //в ТЗ неправильные данные, сервер требует 3 символа
  }

const passwordRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{3,}$/;
const loginRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

type LocationState = {
  from: {
    pathname: string;
  };
}


const postData = async (url = '', data = {}) => {
  // Формируем запрос
  const response = await fetch(url, {
    // Метод, если не указывать, будет использоваться GET
    method: 'POST',
   // Заголовок запроса
    headers: {
      'Content-Type': 'application/json'
    },
    // Данные
    body: JSON.stringify(data)
  });
  return response.json();
}

function LoginForm(): JSX.Element {
  // useEffect(() => {
  //   postData('https://grading.design.htmlacademy.pro/v0/escape-room/login', { email: "Oliver@mail.com",password: "password" }).then((data) => {
  //     console.log(data);
  //   });
  // }, []);

  const dispatch = useAppDispatch();

//const {loginAction} = useActionCreators(userActions);

  const {
    register,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onBlur'
  });

  const emailRef = useRef<HTMLInputElement | null>(null);
  const { ref: emailRefCallback, ...registerEmailRest } = register('email', {
    required: ValidationMessage.RequiredField,
    pattern: {
      value: loginRegex,
      message: ValidationMessage.ValidateEmail
    },
  });

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { ref: passwordRefCallback, ...registerPasswordRest } = register('password', {
    required: ValidationMessage.RequiredField,
    pattern: {
      value: passwordRegex,
      message: ValidationMessage.ValidatePassword
    },
  });

  //const isLoginLoading = useAppSelector(getIsLoginLoading);
  const isLoginLoading = true;

  const navigate = useNavigate();
  const location = useLocation();
 // const dispatch = useAppDispatch();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(emailRef.current && passwordRef.current) {
      dispatch(loginUser({
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      }));
    }


    // if(emailRef.current && passwordRef.current) {
    //   dispatch(loginAction({
    //     email: emailRef.current?.value,
    //     password: passwordRef.current?.value
    //   }))
    //     .unwrap().then(
    //       () => {
    //         if((location.state as LocationState)?.from) {
    //           const { pathname } = (location.state as LocationState).from;

    //           navigate(pathname);

    //           //dispatch(fetchReservationsAction());
    //         } else {

    //           navigate(AppRoute.MainPage);
    //         }
    //       },
    //       () => {
    //         //dispatch(displayError(WarningMessage.SendError));
    //       }
    //     );
  };

  return(
    <div className="login__form">
      <form
        className="login-form"
        action=""
        method="post"
        onSubmit={handleFormSubmit}
      >
        <div className="login-form__inner-wrapper">
          <h1 className="title title--size-s login-form__title">Вход</h1>
          <div className="login-form__inputs">
            <div className="custom-input login-form__input">
              <label className="custom-input__label" htmlFor="email">
                    E&nbsp;–&nbsp;mail
              </label>
              <input
                type="email"
                id="email"
                placeholder="Адрес электронной почты"
                ref={((e) => {
                  emailRefCallback(e);
                  emailRef.current = e;
                })}
                {...registerEmailRest}
              />
              {errors.email && <><br/><span role="alert">{errors.email?.message?.toString()}</span></>}
            </div>
            <div className="custom-input login-form__input">
              <label className="custom-input__label" htmlFor="password">
                    Пароль
              </label>
              <input
                type="password"
                id="password"
                placeholder="Пароль"
                ref={(e) => {
                  passwordRefCallback(e);
                  passwordRef.current = e;
                }}
                {...registerPasswordRest}
              />
              {errors.password && <><br/><span role="alert">{errors.password?.message?.toString()}</span></>}
            </div>
          </div>
          <button
            className="btn btn--accent btn--general login-form__submit"
            type="submit"
            disabled={isValid}
          >
            {isLoginLoading ? LoginButtonText.Clicked : LoginButtonText.Default}
          </button>
        </div>
        <label className="custom-checkbox login-form__checkbox">
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
            &nbsp;правилами обработки персональных данных
            </a>
                &nbsp;и пользовательским соглашением
          </span>
        </label>
      </form>
    </div>
  );
}

export default LoginForm;
