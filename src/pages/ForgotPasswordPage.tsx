import React, { useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sendPasswordResetEmail, setError, setSuccess } from '../redux/actions';
import { RootState } from '../redux/store';
import { Message } from '../components';

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (error) {
      dispatch(setError(''));
    }
    if (success) {
      dispatch(setSuccess(''));
    }
  }, []);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      sendPasswordResetEmail(
        email,
        'Письмо для сброса пароля отправлено на указанный email!'
      )
    );
  };

  return (
    <div className='forgot-password'>
      <h2 className='forgot-password__title'>Сбросить пароль</h2>
      <form className='forgot-password__form' onSubmit={submitHandler}>
        {error && (
          <Message
            className='forgot-password__message'
            type='danger'
            msg={error}
          />
        )}
        {success && (
          <Message
            className='forgot-password__message'
            type='success'
            msg={success}
          />
        )}

        <div className='forgot-password__field'>
          <label className='forgot-password__label label' htmlFor='email'>
            Email адрес
          </label>
          <input
            className='forgot-password__input input'
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            // placeholder='Email address'
            autoComplete='off'
          />
        </div>

        <button className='forgot-password__btn form-button' disabled={loading}>
          {loading ? 'Loading...' : 'Отправить письмо для сброса пароля'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
