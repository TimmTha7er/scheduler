import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sendPasswordResetEmail, setError, setSuccess } from '../redux/actions';
import { RootState } from '../redux/store';
import { Message } from '../components';

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error, success } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''));
      }
      if (success) {
        dispatch(setSuccess(''));
      }
    };
  }, [error, dispatch, success]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (success) {
      dispatch(setSuccess(''));
    }
    if (error) {
      dispatch(setError(''));
    }
    setLoading(true);
    await dispatch(
      sendPasswordResetEmail(
        email,
        'Письмо для сброса пароля отправлено на указанный email!'
      )
    );
    setLoading(false);
  };

  return (
    <div className='forgot-password'>
      <h2 className='forgot-password__title'>Сбросить пароль</h2>
      <form className='forgot-password__form' onSubmit={submitHandler}>
        {error && <Message type='danger' msg={error} />}
        {success && <Message type='success' msg={success} />}

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
            placeholder='Email address'
            autoComplete='off'
          />
        </div>

        <button className='forgot-password__btn form-button' disabled={loading}>
          {loading ? 'Loading...' : 'Send password reset email'}
          {/* Отправить письмо для сброса пароля */}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
