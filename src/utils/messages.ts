interface IMessages {
  [error: string]: string;
}

const messages: IMessages = {
  'There is no user record corresponding to this identifier. The user may have been deleted.':
    'Пользователя с таким email не существует.',
  'The password is invalid or the user does not have a password.':
    'Неверный пароль.',
  'The email address is badly formatted.':
    'Неверный формат адреса электронной почты.',
  'The password must be 6 characters long or more.':
    'Пароль должен состоять из 6 или более символов.',
  'The email address is already in use by another account.':
    'Адрес электронной почты уже используется другой учетной записью.',
  'Please verify your email address.':
    'Пожалуйста, подтвердите свой адрес электронной почты.',
  'Password should be at least 6 characters':
    'Пароль должен состоять минимум из 6 символов.',
  'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
    'Доступ к этой учетной записи был временно отключен из-за множества неудачных попыток входа в систему. Вы можете немедленно восстановить его, сбросив пароль, или можете повторить попытку позже.',
};

export default messages;
