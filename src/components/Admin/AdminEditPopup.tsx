import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEditPopupVisible,
  setSelectedUser,
  editUser,
} from '../../redux/actions';
import { RootState } from '../../redux/store';
import closeBtnImg from '../../img/close.svg';
import { useFocus, useInput } from '../supports/hooks';

const AdminEditPopup: React.FC = () => {
  const dispatch = useDispatch();
  const {
    admin: { selectedUser },
  } = useSelector((state: RootState) => state);
  const { value: inputValue, onChange: inputOnChange } = useInput(
    selectedUser?.firstName || ''
  );
  const inputRef = useFocus();

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    inputOnChange(event.currentTarget.value);
  };

  const onCancelClick = () => {
    dispatch(setSelectedUser(null));
    dispatch(setEditPopupVisible(false));
  };

  const onSubmitClick = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (selectedUser) {
      dispatch(editUser({ ...selectedUser, firstName: inputValue }));
    }

    dispatch(setEditPopupVisible(false));
  };

  return (
    <div className='create-popup'>
      <div className='create-popup__header'>
        <h2 className='create-popup__title'>{selectedUser?.firstName}</h2>
        <div
          onClick={onCancelClick}
          // className='create-popup__close icon icon-cancel-1'
          className='create-popup__close'
        >
          <img className='create-popup__btn-img' src={closeBtnImg} alt='X' />
        </div>
      </div>
      <form onSubmit={onSubmitClick} className='form'>
        <div className='create-popup__content'>
          <div className='form__field'>
            <label className='form__label' htmlFor=''>
              Имя
            </label>
            <input
              value={inputValue}
              onChange={onInputChange}
              className='form__input'
              type='text'
              autoComplete='off'
              maxLength={120}
              ref={inputRef}
            />
          </div>
        </div>
        <div className='create-popup__footer'>
          <button className='form__btn'>
            <span>Редактировать</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditPopup;
