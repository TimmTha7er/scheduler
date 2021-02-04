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
    <div className='sing-up'>
      <h2 className='sing-up__title'>Регистрация</h2>
      <form className='sing-up__form' onSubmit={submitHandler}>
        {error && <Message type='danger' msg={error} />}

        <div className='sing-up__field'>
          <label className='sing-up__label label' htmlFor='first-name'>
            Имя
          </label>
          <input
            className='sing-up__input input'
            type='input'
            name='first-name'
            value={firstName}
            placeholder='First name'
            onChange={(e) => setFirstName(e.currentTarget.value)}
						autoComplete='off'
          />
        </div>
        <div className='sing-up__field'>
          <label className='sing-up__label label' htmlFor='email'>
            Email адрес
          </label>
          <input
            className='sing-up__input input'
            type='email'
            name='email'
            value={email}
            placeholder='Email address'
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className='sing-up__field'>
          <label className='sing-up__label label' htmlFor='password'>
            Пароль
          </label>
          <input
            className='sing-up__input input'
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.currentTarget.value)}
						autoComplete='off'
          />
        </div>

        <button className='sing-up__btn form-button' disabled={loading}>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
