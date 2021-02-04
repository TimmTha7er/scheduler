import React, { useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin, setError } from '../redux/actions';
import { RootState } from '../redux/store';
import { Message } from '../components';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);
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
    dispatch(signin({ email, password }, () => setLoading(false)));
  };

  return (
    <div className='sing-in'>
      <h2 className='sing-in__title'>Войдите, чтобы продолжить</h2>
      <form className='sing-in__form' onSubmit={submitHandler}>
        {error && <Message type='danger' msg={error} />}

        <div className='sing-in__field'>
          <label className='sing-in__label label' htmlFor='email'>
            Email адрес
          </label>
          <input
            className='sing-in__input input'
            type='email'
            name='email'
            value={email}
            placeholder='Email address'
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className='sing-in__field'>
          <label className='sing-in__label label' htmlFor='password'>
            Пароль
          </label>
          <input
            className='sing-in__input input'
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.currentTarget.value)}
						autoComplete='off'
          />
        </div>

        <Link to='/forgot-password' className='sing-in__forgot-password link'>
          Забыли параль?
        </Link>
        <button className='sing-in__btn form-button' disabled={loading}>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
