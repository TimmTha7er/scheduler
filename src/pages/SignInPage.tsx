import React, { useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { signin, setError } from '../redux/actions';
import { RootState } from '../redux/store';
import { Message } from '../components';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (error) {
      dispatch(setError(''));
    }
  }, []);

  const onSubmitClick = (e: FormEvent) => {
    e.preventDefault();
    dispatch(signin({ email, password }));
  };

  const onSingUpBtnClick = () => {
    history.push('/sign-up');
  };

  return (
    <div className='sign-in'>
      <h2 className='sign-in__title'>Войдите, чтобы продолжить</h2>
      <form className='sign-in__form' onSubmit={onSubmitClick}>
        {error && (
          <Message className='sign-in__message' type='danger' msg={error} />
        )}

        <div className='sign-in__field'>
          <label className='sign-in__label label' htmlFor='email'>
            Email адрес
          </label>
          <input
            className='sign-in__input input'
            type='email'
            name='email'
            value={email}
            // placeholder='адрес электронной почты'
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className='sign-in__field'>
          <label className='sign-in__label label' htmlFor='password'>
            Пароль
          </label>
          <input
            className='sign-in__input input'
            type='password'
            name='password'
            value={password}
            // placeholder='ваш пароль'
            onChange={(e) => setPassword(e.currentTarget.value)}
            autoComplete='off'
          />
        </div>

        <Link to='/forgot-password' className='sign-in__forgot-password link'>
          Забыли пароль?
        </Link>
        <button className='sign-in__btn form-button' disabled={loading}>
          {loading ? 'Loading...' : 'Вход'}
        </button>

        <button
          onClick={onSingUpBtnClick}
          className='sign-in__sign-up-btn form-button'
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default SignIn;
