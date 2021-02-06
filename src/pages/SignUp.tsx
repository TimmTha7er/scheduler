import React, { useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { signup, setError } from '../redux/actions';
import { Message } from '../components';

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''));
      }
    };
  }, [error, dispatch]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (error) {
      dispatch(setError(''));
    }

    setLoading(true);
    dispatch(signup({ email, password, firstName }, () => setLoading(false)));
  };

  return (
    <div className='sign-up'>
      <h2 className='sign-up__title'>Регистрация</h2>
      <form className='sign-up__form' onSubmit={submitHandler}>
        {error && (
          <Message className='sign-up__message' type='danger' msg={error} />
        )}

        <div className='sign-up__field'>
          <label className='sign-up__label label' htmlFor='first-name'>
            Имя
          </label>
          <input
            className='sign-up__input input'
            type='input'
            name='first-name'
            value={firstName}
            // placeholder='ваше имя'
            onChange={(e) => setFirstName(e.currentTarget.value)}
            autoComplete='off'
          />
        </div>
        <div className='sign-up__field'>
          <label className='sign-up__label label' htmlFor='email'>
            Email адрес
          </label>
          <input
            className='sign-up__input input'
            type='email'
            name='email'
            value={email}
            // placeholder='адрес электронной почты'
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className='sign-up__field'>
          <label className='sign-up__label label' htmlFor='password'>
            Пароль
          </label>
          <input
            className='sign-up__input input'
            type='password'
            name='password'
            value={password}
            // placeholder='не менее 7 символов'
            onChange={(e) => setPassword(e.currentTarget.value)}
            autoComplete='off'
          />
        </div>

        <button className='sign-up__btn form-button' disabled={loading}>
          {loading ? 'Loading...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
