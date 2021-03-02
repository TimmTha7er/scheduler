import React from 'react';
import {
  useActions,
  useFocus,
  useInput,
  useTypedSelector,
} from '../supports/Hooks';
import closeBtnImg from '../../img/close.svg';

const AdminEditPopup: React.FC = () => {
  const { setEditPopupVisible, setSelectedUser, editUser } = useActions();
  const {
    admin: { selectedUser },
  } = useTypedSelector((state) => state);
  const inputRef = useFocus();
  const { value: inputValue, onChange: inputOnChange } = useInput(
    selectedUser?.firstName || ''
  );

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    inputOnChange(event.currentTarget.value);
  };

  const onCancelClick = () => {
    setSelectedUser(null);
    setEditPopupVisible(false);
  };

  const onSubmitClick = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (selectedUser) {
      editUser({ ...selectedUser, firstName: inputValue });
    }

    setEditPopupVisible(false);
  };

  return (
    <div className='create-popup'>
      <div className='create-popup__header'>
        <h2 className='create-popup__title'>{selectedUser?.firstName}</h2>
        <div onClick={onCancelClick} className='create-popup__close'>
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
