import { FormEvent, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { userActions } from '../../store/user-process/user-process';
import { useActionCreators } from '../../hooks/use-action-creators';

import { useAppSelector } from '../../hooks/use-app-selector';
import { getIsLoginLoading } from '../../store/selectors';
import { ValidationMessage } from '../../const/validation-message';
import { LoginButtonText } from '../../const/login-button-text';


const passwordRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{3,}$/;
const loginRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


function LoginForm(): JSX.Element {

  const {loginUser} = useActionCreators(userActions);

  const {
    register,
    formState: {errors},
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

  const isLoginLoading = useAppSelector(getIsLoginLoading);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(emailRef.current && passwordRef.current) {
      loginUser({
        email: `${emailRef.current.value}`,
        password: `${ passwordRef.current.value}`
      }).unwrap()
        .catch(() => {
          toast.error('Не удалось завершить зарегистрацию');
        });
    }
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
            disabled={isLoginLoading}
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
