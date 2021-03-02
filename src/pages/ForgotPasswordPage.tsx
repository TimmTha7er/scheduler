import React, { useState, FormEvent, useEffect } from 'react';
import { Message } from '../components';
import { useActions, useTypedSelector } from '../components/supports/Hooks';

const ForgotPassword: React.FC = () => {
  const { sendPasswordResetEmail, setError, setSuccess } = useActions();
  const { error, success, loading } = useTypedSelector((state) => state.auth);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (error) {
      setError('');
    }
    if (success) {
      setSuccess('');
    }
  }, []);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    sendPasswordResetEmail(
      email,
      'Письмо для сброса пароля отправлено на указанный email!'
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
