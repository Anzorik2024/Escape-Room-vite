export enum ValidationMessage {
  RequiredDate = 'Выберите дату.',
  RequiredField = 'Данные обязательные для заполнения.',
  ValidateUserName = 'Ввeдите корректное имя пользователя.',
  ValidateUserNameLength = 'Введите имя пользователя, состоящее не менее, чем из 1 символа и не более, чем из 15.',
  ValidatePhone = 'Ввeдите номер телефона в формате +7 (000) 000-00-00.',
  ValidateParticipantsMin = 'Количество участников меньше допустимого количества для даного квеста.',
  ValidateParticipantsMax = 'Количество участников больше допустимого количества для даного квеста.',
  ValidateEmail = 'Ввeдите корректный email.',
  ValidatePassword = 'Ввeдите пароль, состоящий из цифр и латинскиx букв, не короче 3 символов длиннее 15 символов.',
  }

export const NAME_MIN_LENGTH = 1;
export const NAME_MAX_LENGTH = 15;
